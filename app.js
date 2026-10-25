// app.js controls what happens when someone picks a career.
// The career facts are kept in career-data.js so they are easy to find and edit.

const data = window.PathFinderData;
const jobPicker = document.querySelector("#job-picker");
const results = document.querySelector("#results");

// Add all 100 career names to the drop-down menu.
data.occupationCatalog.forEach(function (career, index) {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = career.title + " - " + career.category;
  jobPicker.appendChild(option);
});

// These three careers also have sample pros, cons, and map locations.
function findSampleCareer(title) {
  return data.jobs.find(function (career) {
    return career.title === title;
  });
}

// Turn a number like 34.6 into +34.6%.
function showGrowth(number) {
  if (number > 0) {
    return "+" + number.toFixed(1) + "%";
  }
  return number.toFixed(1) + "%";
}

// Put plain text items into one of the lists on the page.
function fillList(listId, items) {
  const list = document.querySelector("#" + listId);
  list.innerHTML = "";

  items.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

// Show one career's information on the page.
function showCareer(career) {
  const sample = findSampleCareer(career.title);
  const stats = data.laborStats[career.title];

  document.querySelector("#job-title").textContent = career.title;
  document.querySelector("#job-category").textContent = career.category;

  // Some broad job titles do not have a direct BLS occupation match.
  if (stats) {
    document.querySelector("#job-growth").textContent = showGrowth(stats.growthRate);
    if (stats.medianWage === null) {
      document.querySelector("#job-wage").textContent = "Not published by BLS";
    } else {
      document.querySelector("#job-wage").textContent = "$" + stats.medianWage.toLocaleString() + " per year";
    }
    document.querySelector("#job-education").textContent = stats.education;
    document.querySelector("#data-note").textContent =
      "BLS match: " + stats.blsTitle + " (SOC " + stats.soc + "). " +
      (stats.matchNote || "This is a direct occupation match.");
  } else {
    document.querySelector("#job-growth").textContent = "Not available";
    document.querySelector("#job-wage").textContent = "Not available";
    document.querySelector("#job-education").textContent = "Not available";
    document.querySelector("#data-note").textContent = "No direct BLS match is listed for this job title.";
  }

  // Show the extra sample details only when the selected job has them.
  document.querySelector("#sample-details").hidden = !sample;
  if (sample) {
    fillList("job-pros", sample.pros);
    fillList("job-cons", sample.cons);
    fillList("job-states", sample.topStates);
  }

  // Every career has three suggested classes based on its category.
  fillList("job-electives", data.categoryIdeas[career.category]);

  // Draw a simple two-bar chart using regular HTML and CSS.
  const chart = document.querySelector("#chart-block");
  const jobBar = document.querySelector("#job-bar");
  const baselineBar = document.querySelector("#baseline-bar");
  if (stats) {
    chart.hidden = false;
    document.querySelector("#job-bar-label").textContent = career.title + " (" + showGrowth(stats.growthRate) + ")";
    document.querySelector("#baseline-label").textContent = "Reference (" + data.baselineGrowth + "%)";

    // The scale ends at 50%. Negative growth uses a red bar.
    jobBar.style.width = Math.min(Math.abs(stats.growthRate) * 2, 100) + "%";
    jobBar.className = stats.growthRate < 0 ? "bar-fill negative" : "bar-fill";
    baselineBar.style.width = data.baselineGrowth * 2 + "%";
  } else {
    chart.hidden = true;
  }

  results.hidden = false;

  // Show the results first so the map has a real size when it is drawn.
  document.querySelector("#map-block").hidden = !sample;
  if (sample) {
    requestAnimationFrame(function () {
      showMap(sample);
    });
  }
}

// Start the map only when it is needed. This avoids loading map tiles at page start.
let map;
let mapMarkers;
const mapBox = document.querySelector("#career-map");

function startMap() {
  if (map) return true;

  if (!window.L) {
    mapBox.textContent = "The map needs an internet connection. Career data still works.";
    return false;
  }

  // Turn off extra animations to keep the map feeling responsive.
  map = L.map("career-map", {
    scrollWheelZoom: false,
    zoomAnimation: false,
    fadeAnimation: false,
    markerZoomAnimation: false
  }).setView([39.5, -98.35], 4);

  // Use the standard OpenStreetMap tile address and show its required credit.
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  mapMarkers = L.layerGroup().addTo(map);
  return true;
}

function showMap(career) {
  if (!startMap()) return;

  // Refresh the map after it becomes visible, then add only this career's markers.
  map.invalidateSize({ pan: false });
  mapMarkers.clearLayers();
  career.locations.forEach(function (place) {
    L.marker([place.lat, place.lon])
      .addTo(mapMarkers)
      .bindPopup(place.city + ", " + place.state);
  });
  map.fitBounds(L.latLngBounds(career.locations.map(function (place) {
    return [place.lat, place.lon];
  })).pad(0.35), { maxZoom: 5, animate: false });
}

// When the drop-down changes, find the matching career and show its facts.
jobPicker.addEventListener("change", function () {
  if (jobPicker.value === "") {
    results.hidden = true;
    return;
  }

  const selectedCareer = data.occupationCatalog[Number(jobPicker.value)];
  showCareer(selectedCareer);
});
