// Data for the 100 careers. Wages are yearly dollars; growth is a percent.
// Source for job growth, median pay, and typical education:
// BLS Occupational Projections and Worker Characteristics, Table 1.2:
// https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.Htm
// Each laborStats record includes the BLS occupation title and SOC code used.
// Class ideas, pros/cons, and sample map places are project examples, not
// official BLS recommendations or state rankings.
const baselineGrowth = 4;

// Three sample profiles add pros, cons, and example map locations.
// Wage and growth values come from the same BLS table as the 100-job data below.
const jobs = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    growthRate: 34.6,
    medianWage: 120230,
    education: "Bachelor’s degree",
    category: "Technology",
    color: 0x5965d8,
    pros: ["Solve interesting problems with data", "Strong demand across many industries"],
    cons: ["Requires ongoing learning", "Some projects mean long hours at a computer"],
    topStates: ["California", "Washington"],
    locations: [
      { city: "Sacramento", state: "California", lat: 38.5816, lon: -121.4944 },
      { city: "Seattle", state: "Washington", lat: 47.6062, lon: -122.3321 }
    ]
  },
  {
    id: "registered-nurse",
    title: "Registered Nurse",
    growthRate: 5.6,
    medianWage: 97550,
    education: "Bachelor's degree",
    category: "Healthcare",
    color: 0x39a88c,
    pros: ["Make a direct difference in people’s lives", "Many specialties and work settings"],
    cons: ["Shift work can include nights and weekends", "The work can be physically and emotionally demanding"],
    topStates: ["California", "Texas"],
    locations: [
      { city: "Sacramento", state: "California", lat: 38.5816, lon: -121.4944 },
      { city: "Austin", state: "Texas", lat: 30.2672, lon: -97.7431 }
    ]
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    growthRate: -1.7,
    medianWage: 62960,
    education: "Bachelor's degree",
    category: "Creative Arts",
    color: 0xe39a56,
    pros: ["Turn ideas into visual stories", "Work in many industries or freelance"],
    cons: ["Deadlines may be tight", "Building a portfolio takes time and practice"],
    topStates: ["New York", "California"],
    locations: [
      { city: "New York City", state: "New York", lat: 40.7128, lon: -74.0060 },
      { city: "San Francisco", state: "California", lat: 37.7749, lon: -122.4194 }
    ]
  }
];

// A searchable list of 100 occupations. The three detailed examples above
// are also in this list; category labels make the other 97 easy to explore.
const occupationGroups = {
  "Technology and math": [
    "Data Scientist", "Software Developer", "Cybersecurity Analyst", "Web Developer",
    "Computer Systems Analyst", "Database Administrator", "Network Administrator",
    "UX Designer", "IT Support Specialist", "AI Engineer", "Statistician", "Actuary",
    "Mathematician", "Financial Analyst", "Market Research Analyst",
    "Operations Research Analyst", "Data Engineer", "Cloud Engineer", "QA Tester", "Game Developer"
  ],
  "Healthcare": [
    "Registered Nurse", "Physician", "Surgeon", "Nurse Practitioner", "Physician Assistant",
    "Pharmacist", "Dentist", "Dental Hygienist", "Physical Therapist", "Occupational Therapist",
    "Medical Assistant", "Paramedic", "Radiologic Technologist", "Respiratory Therapist",
    "Medical Laboratory Scientist", "Psychologist", "Mental Health Counselor", "Veterinarian",
    "Dietitian", "Public Health Specialist"
  ],
  "Business and management": [
    "Accountant", "Auditor", "Human Resources Specialist", "Project Manager",
    "Sales Representative", "Marketing Manager", "Social Media Manager",
    "Management Consultant", "Business Analyst", "Entrepreneur", "Insurance Underwriter",
    "Real Estate Agent", "Logistics Manager", "Supply Chain Analyst", "Customer Service Manager"
  ],
  "Creative arts and media": [
    "Graphic Designer", "Illustrator", "Photographer", "Animator", "Art Director",
    "Copywriter", "Journalist", "Editor", "Video Editor", "Film Director", "Actor",
    "Musician", "Interior Designer", "Fashion Designer", "Industrial Designer"
  ],
  "Education and public service": [
    "Elementary School Teacher", "High School Teacher", "Special Education Teacher",
    "School Counselor", "Librarian", "Professor", "Police Officer", "Firefighter",
    "Lawyer", "Paralegal", "Judge", "Social Worker", "Urban Planner", "Civil Servant", "Diplomat"
  ],
  "Trades, engineering, and transport": [
    "Electrician", "Plumber", "Carpenter", "Welder", "Automotive Mechanic", "HVAC Technician",
    "Civil Engineer", "Mechanical Engineer", "Architect", "Construction Manager", "Chef",
    "Baker", "Hotel Manager", "Farmer", "Truck Driver"
  ]
};

// Make one simple list of titles from the category lists above.
const occupationCatalog = [];
Object.keys(occupationGroups).forEach(function (category) {
  occupationGroups[category].forEach(function (title) {
    occupationCatalog.push({ title: title, category: category });
  });
});

// Latest U.S. figures available in the BLS 2025-35 projections table.
// Each record stores growth (%), 2025 median wage, entry education, and
// the exact BLS occupation used. A note marks close matches for broad titles.
const laborStats = {
  "Data Scientist": { growthRate: 34.6, medianWage: 120230, education: "Bachelor's degree", blsTitle: "Data scientists", soc: "15-2051" },
  "Software Developer": { growthRate: 10.2, medianWage: 135980, education: "Bachelor's degree", blsTitle: "Software developers", soc: "15-1252" },
  "Cybersecurity Analyst": { growthRate: 21.0, medianWage: 129180, education: "Bachelor's degree", blsTitle: "Information security analysts", soc: "15-1212" },
  "Web Developer": { growthRate: 3.8, medianWage: 92650, education: "Bachelor's degree", blsTitle: "Web developers", soc: "15-1254" },
  "Computer Systems Analyst": { growthRate: 7.9, medianWage: 105850, education: "Bachelor's degree", blsTitle: "Computer systems analysts", soc: "15-1211" },
  "Database Administrator": { growthRate: -0.1, medianWage: 104620, education: "Bachelor's degree", blsTitle: "Database administrators", soc: "15-1242" },
  "Network Administrator": { growthRate: -4.1, medianWage: 99130, education: "Bachelor's degree", blsTitle: "Network and computer systems administrators", soc: "15-1244" },
  "UX Designer": { growthRate: 6.0, medianWage: 104000, education: "Bachelor's degree", blsTitle: "Web and digital interface designers", soc: "15-1255", matchNote: "Related BLS category" },
  "IT Support Specialist": { growthRate: -3.5, medianWage: 61860, education: "Some college, no degree", blsTitle: "Computer user support specialists", soc: "15-1232", matchNote: "Related BLS category" },
  "AI Engineer": { growthRate: 21.8, medianWage: 140300, education: "Master's degree", blsTitle: "Computer and information research scientists", soc: "15-1221", matchNote: "Related BLS category" },
  "Statistician": { growthRate: 11.0, medianWage: 105650, education: "Master's degree", blsTitle: "Statisticians", soc: "15-2041" },
  "Actuary": { growthRate: 9.2, medianWage: 130000, education: "Bachelor's degree", blsTitle: "Actuaries", soc: "15-2011" },
  "Mathematician": { growthRate: 0.6, medianWage: 126710, education: "Master's degree", blsTitle: "Mathematicians", soc: "15-2021" },
  "Financial Analyst": { growthRate: 7.2, medianWage: 102740, education: "Bachelor's degree", blsTitle: "Financial and investment analysts", soc: "13-2051" },
  "Market Research Analyst": { growthRate: 7.0, medianWage: 78760, education: "Bachelor's degree", blsTitle: "Market research analysts and marketing specialists", soc: "13-1161" },
  "Operations Research Analyst": { growthRate: 11.9, medianWage: 88940, education: "Bachelor's degree", blsTitle: "Operations research analysts", soc: "15-2031" },
  "Data Engineer": { growthRate: 9.4, medianWage: 139500, education: "Bachelor's degree; related experience often expected", blsTitle: "Database architects", soc: "15-1243", matchNote: "Related BLS category" },
  "Cloud Engineer": { growthRate: 7.7, medianWage: 134050, education: "Bachelor's degree; related experience often expected", blsTitle: "Computer network architects", soc: "15-1241", matchNote: "Related BLS category" },
  "QA Tester": { growthRate: 5.7, medianWage: 104300, education: "Bachelor's degree", blsTitle: "Software quality assurance analysts and testers", soc: "15-1253" },
  "Game Developer": { growthRate: 10.2, medianWage: 135980, education: "Bachelor's degree", blsTitle: "Software developers", soc: "15-1252", matchNote: "Related BLS category" },
  "Registered Nurse": { growthRate: 5.6, medianWage: 97550, education: "Bachelor's degree", blsTitle: "Registered nurses", soc: "29-1141" },
  "Physician": { growthRate: 3.6, medianWage: 271090, education: "Not reported for BLS aggregate category", blsTitle: "Physicians (aggregate)", soc: "29-1210", matchNote: "Aggregate BLS category" },
  "Surgeon": { growthRate: 4.0, medianWage: 414010, education: "Doctoral or professional degree", blsTitle: "Surgeons, all other", soc: "29-1249", matchNote: "Related BLS category" },
  "Nurse Practitioner": { growthRate: 41.0, medianWage: 132300, education: "Master's degree", blsTitle: "Nurse practitioners", soc: "29-1171" },
  "Physician Assistant": { growthRate: 21.1, medianWage: 135880, education: "Master's degree", blsTitle: "Physician assistants", soc: "29-1071" },
  "Pharmacist": { growthRate: 5.2, medianWage: 140910, education: "Doctoral or professional degree", blsTitle: "Pharmacists", soc: "29-1051" },
  "Dentist": { growthRate: 5.7, medianWage: 170950, education: "Doctoral or professional degree", blsTitle: "Dentists, general", soc: "29-1021", matchNote: "General dentist category" },
  "Dental Hygienist": { growthRate: 8.0, medianWage: 98100, education: "Associate's degree", blsTitle: "Dental hygienists", soc: "29-1292" },
  "Physical Therapist": { growthRate: 11.9, medianWage: 102760, education: "Doctoral or professional degree", blsTitle: "Physical therapists", soc: "29-1123" },
  "Occupational Therapist": { growthRate: 14.8, medianWage: 100330, education: "Master's degree", blsTitle: "Occupational therapists", soc: "29-1122" },
  "Medical Assistant": { growthRate: 12.9, medianWage: 45690, education: "Postsecondary nondegree award", blsTitle: "Medical assistants", soc: "31-9092" },
  "Paramedic": { growthRate: 5.7, medianWage: 60600, education: "Postsecondary nondegree award", blsTitle: "Paramedics", soc: "29-2043" },
  "Radiologic Technologist": { growthRate: 5.0, medianWage: 80110, education: "Associate's degree", blsTitle: "Radiologic technologists and technicians", soc: "29-2034" },
  "Respiratory Therapist": { growthRate: 8.5, medianWage: 82280, education: "Associate's degree", blsTitle: "Respiratory therapists", soc: "29-1126" },
  "Medical Laboratory Scientist": { growthRate: 2.7, medianWage: 62930, education: "Bachelor's degree", blsTitle: "Clinical laboratory technologists and technicians", soc: "29-2010", matchNote: "Related BLS category" },
  "Psychologist": { growthRate: 2.3, medianWage: 110840, education: "Master's degree", blsTitle: "Psychologists, all other", soc: "19-3039", matchNote: "Related BLS category" },
  "Mental Health Counselor": { growthRate: 18.4, medianWage: 59350, education: "Master's degree", blsTitle: "Substance abuse, behavioral disorder, and mental health counselors", soc: "21-1018" },
  "Veterinarian": { growthRate: 9.4, medianWage: 130100, education: "Doctoral or professional degree", blsTitle: "Veterinarians", soc: "29-1131" },
  "Dietitian": { growthRate: 7.7, medianWage: 76400, education: "Bachelor's degree", blsTitle: "Dietitians and nutritionists", soc: "29-1031" },
  "Public Health Specialist": { growthRate: 5.6, medianWage: 64070, education: "Bachelor's degree", blsTitle: "Health education specialists", soc: "21-1091", matchNote: "Related BLS category" },
  "Accountant": { growthRate: 5.0, medianWage: 83680, education: "Bachelor's degree", blsTitle: "Accountants and auditors", soc: "13-2011" },
  "Auditor": { growthRate: 5.0, medianWage: 83680, education: "Bachelor's degree", blsTitle: "Accountants and auditors", soc: "13-2011" },
  "Human Resources Specialist": { growthRate: 6.4, medianWage: 75940, education: "Bachelor's degree", blsTitle: "Human resources specialists", soc: "13-1071" },
  "Project Manager": { growthRate: 6.7, medianWage: 102320, education: "Bachelor's degree", blsTitle: "Project management specialists", soc: "13-1082", matchNote: "Related BLS category" },
  "Sales Representative": { growthRate: 2.7, medianWage: 69990, education: "High school diploma or equivalent", blsTitle: "Sales representatives of services", soc: "41-3091", matchNote: "Related BLS category" },
  "Marketing Manager": { growthRate: 6.9, medianWage: 166790, education: "Bachelor's degree; related experience often expected", blsTitle: "Marketing managers", soc: "11-2021" },
  "Social Media Manager": { growthRate: 1.8, medianWage: 74750, education: "Bachelor's degree", blsTitle: "Public relations specialists", soc: "27-3031", matchNote: "Related BLS category" },
  "Management Consultant": { growthRate: 10.1, medianWage: 101860, education: "Bachelor's degree; related experience often expected", blsTitle: "Management analysts", soc: "13-1111", matchNote: "Related BLS category" },
  "Business Analyst": { growthRate: 10.1, medianWage: 101860, education: "Bachelor's degree; related experience often expected", blsTitle: "Management analysts", soc: "13-1111", matchNote: "Related BLS category" },
  "Entrepreneur": null,
  "Insurance Underwriter": { growthRate: -3.8, medianWage: 81370, education: "Bachelor's degree", blsTitle: "Insurance underwriters", soc: "13-2053" },
  "Real Estate Agent": { growthRate: 1.7, medianWage: 52830, education: "High school diploma or equivalent", blsTitle: "Real estate sales agents", soc: "41-9022" },
  "Logistics Manager": { growthRate: 17.6, medianWage: 82320, education: "Bachelor's degree", blsTitle: "Logisticians", soc: "13-1081", matchNote: "Related BLS category" },
  "Supply Chain Analyst": { growthRate: 17.6, medianWage: 82320, education: "Bachelor's degree", blsTitle: "Logisticians", soc: "13-1081", matchNote: "Related BLS category" },
  "Customer Service Manager": { growthRate: 0.1, medianWage: 69500, education: "High school diploma or equivalent; related experience often expected", blsTitle: "First-line supervisors of office and administrative support workers", soc: "43-1011", matchNote: "Related BLS category" },
  "Graphic Designer": { growthRate: -1.7, medianWage: 62960, education: "Bachelor's degree", blsTitle: "Graphic designers", soc: "27-1024" },
  "Illustrator": { growthRate: -2.9, medianWage: 55490, education: "Bachelor's degree", blsTitle: "Fine artists, including painters, sculptors, and illustrators", soc: "27-1013", matchNote: "Related BLS category" },
  "Photographer": { growthRate: -0.7, medianWage: 44660, education: "High school diploma or equivalent", blsTitle: "Photographers", soc: "27-4021" },
  "Animator": { growthRate: -0.3, medianWage: 102030, education: "Bachelor's degree", blsTitle: "Special effects artists and animators", soc: "27-1014", matchNote: "Related BLS category" },
  "Art Director": { growthRate: 4.2, medianWage: 114850, education: "Bachelor's degree; related experience often expected", blsTitle: "Art directors", soc: "27-1011" },
  "Copywriter": { growthRate: -0.3, medianWage: 76910, education: "Bachelor's degree", blsTitle: "Writers and authors", soc: "27-3043", matchNote: "Related BLS category" },
  "Journalist": { growthRate: -5.9, medianWage: 62200, education: "Bachelor's degree", blsTitle: "News analysts, reporters, and journalists", soc: "27-3023" },
  "Editor": { growthRate: -1.1, medianWage: 77920, education: "Bachelor's degree", blsTitle: "Editors", soc: "27-3041" },
  "Video Editor": { growthRate: 3.7, medianWage: 75420, education: "Bachelor's degree", blsTitle: "Film and video editors", soc: "27-4032" },
  "Film Director": { growthRate: 4.0, medianWage: 90360, education: "Bachelor's degree; related experience often expected", blsTitle: "Producers and directors", soc: "27-2012", matchNote: "Related BLS category" },
  "Actor": { growthRate: 0.0, medianWage: null, education: "Some college, no degree", blsTitle: "Actors", soc: "27-2011", matchNote: "BLS does not publish a median wage for this category" },
  "Musician": { growthRate: 0.3, medianWage: null, education: "No formal educational credential", blsTitle: "Musicians and singers", soc: "27-2042", matchNote: "BLS does not publish a median wage for this category" },
  "Interior Designer": { growthRate: 2.7, medianWage: 67190, education: "Bachelor's degree", blsTitle: "Interior designers", soc: "27-1025" },
  "Fashion Designer": { growthRate: 0.1, medianWage: 80960, education: "Bachelor's degree", blsTitle: "Fashion designers", soc: "27-1022" },
  "Industrial Designer": { growthRate: 2.4, medianWage: 83910, education: "Bachelor's degree", blsTitle: "Commercial and industrial designers", soc: "27-1021", matchNote: "Related BLS category" },
  "Elementary School Teacher": { growthRate: -0.4, medianWage: 63970, education: "Bachelor's degree", blsTitle: "Elementary school teachers, except special education", soc: "25-2021" },
  "High School Teacher": { growthRate: -0.2, medianWage: 72040, education: "Bachelor's degree", blsTitle: "Secondary school teachers, except special and career/technical education", soc: "25-2031" },
  "Special Education Teacher": { growthRate: -0.4, medianWage: 65120, education: "Bachelor's degree", blsTitle: "Special education teachers, kindergarten and elementary school", soc: "25-2052", matchNote: "Related BLS category" },
  "School Counselor": { growthRate: 2.9, medianWage: 64330, education: "Master's degree", blsTitle: "Educational, guidance, and career counselors and advisors", soc: "21-1012", matchNote: "Related BLS category" },
  "Librarian": { growthRate: 2.6, medianWage: 68270, education: "Master's degree", blsTitle: "Librarians and media collections specialists", soc: "25-4022" },
  "Professor": { growthRate: 2.0, medianWage: 77640, education: "Doctoral or professional degree", blsTitle: "Postsecondary teachers, all other", soc: "25-1199", matchNote: "Related BLS category" },
  "Police Officer": { growthRate: 3.5, medianWage: 76210, education: "High school diploma or equivalent", blsTitle: "Police and sheriff's patrol officers", soc: "33-3051" },
  "Firefighter": { growthRate: 3.7, medianWage: 59280, education: "Postsecondary nondegree award", blsTitle: "Firefighters", soc: "33-2011" },
  "Lawyer": { growthRate: 4.7, medianWage: 159670, education: "Doctoral or professional degree", blsTitle: "Lawyers", soc: "23-1011" },
  "Paralegal": { growthRate: -0.3, medianWage: 62890, education: "Associate's degree", blsTitle: "Paralegals and legal assistants", soc: "23-2011" },
  "Judge": { growthRate: 2.8, medianWage: 153990, education: "Doctoral or professional degree; related experience often expected", blsTitle: "Judges, magistrate judges, and magistrates", soc: "23-1023" },
  "Social Worker": { growthRate: 2.3, medianWage: 71900, education: "Bachelor's degree", blsTitle: "Social workers, all other", soc: "21-1029", matchNote: "Related BLS category" },
  "Urban Planner": { growthRate: 3.9, medianWage: 89320, education: "Master's degree", blsTitle: "Urban and regional planners", soc: "19-3051" },
  "Civil Servant": null,
  "Diplomat": null,
  "Electrician": { growthRate: 9.2, medianWage: 63190, education: "High school diploma or equivalent; apprenticeship", blsTitle: "Electricians", soc: "47-2111" },
  "Plumber": { growthRate: 6.8, medianWage: 63800, education: "High school diploma or equivalent; apprenticeship", blsTitle: "Plumbers, pipefitters, and steamfitters", soc: "47-2152", matchNote: "Related BLS category" },
  "Carpenter": { growthRate: 3.9, medianWage: 60580, education: "High school diploma or equivalent; apprenticeship", blsTitle: "Carpenters", soc: "47-2031" },
  "Welder": { growthRate: 2.4, medianWage: 53750, education: "High school diploma or equivalent", blsTitle: "Welders, cutters, solderers, and brazers", soc: "51-4121" },
  "Automotive Mechanic": { growthRate: 5.0, medianWage: 50620, education: "Postsecondary nondegree award", blsTitle: "Automotive service technicians and mechanics", soc: "49-3023" },
  "HVAC Technician": { growthRate: 10.9, medianWage: 61010, education: "Postsecondary nondegree award", blsTitle: "Heating, air conditioning, and refrigeration mechanics and installers", soc: "49-9021" },
  "Civil Engineer": { growthRate: 6.4, medianWage: 100840, education: "Bachelor's degree", blsTitle: "Civil engineers", soc: "17-2051" },
  "Mechanical Engineer": { growthRate: 11.2, medianWage: 104110, education: "Bachelor's degree", blsTitle: "Mechanical engineers", soc: "17-2141" },
  "Architect": { growthRate: 4.3, medianWage: 99280, education: "Bachelor's degree", blsTitle: "Architects, except landscape and naval", soc: "17-1011" },
  "Construction Manager": { growthRate: 9.1, medianWage: 114990, education: "Bachelor's degree", blsTitle: "Construction managers", soc: "11-9021" },
  "Chef": { growthRate: 6.6, medianWage: 62470, education: "High school diploma or equivalent; experience commonly expected", blsTitle: "Chefs and head cooks", soc: "35-1011" },
  "Baker": { growthRate: 5.5, medianWage: 37160, education: "No formal educational credential", blsTitle: "Bakers", soc: "51-3011" },
  "Hotel Manager": { growthRate: 3.8, medianWage: 69250, education: "High school diploma or equivalent; related experience often expected", blsTitle: "Lodging managers", soc: "11-9081", matchNote: "Related BLS category" },
  "Farmer": { growthRate: -3.4, medianWage: 89900, education: "High school diploma or equivalent; related experience often expected", blsTitle: "Farmers, ranchers, and other agricultural managers", soc: "11-9013", matchNote: "Related BLS category" },
  "Truck Driver": { growthRate: 3.8, medianWage: 58640, education: "Postsecondary nondegree award", blsTitle: "Heavy and tractor-trailer truck drivers", soc: "53-3032", matchNote: "Related BLS category" }
};

// Most occupations have a BLS match; preserve the three missing records as unknown.
const categoryIdeas = {
  "Technology and math": ["Statistics", "Computer Science", "Economics"],
  "Healthcare": ["Biology", "Anatomy and Physiology", "Chemistry"],
  "Business and management": ["Business", "Economics", "Statistics"],
  "Creative arts and media": ["Graphic Design", "Digital Media", "Photography"],
  "Education and public service": ["Psychology", "Government", "Communication"],
  "Trades, engineering, and transport": ["Physics", "Engineering and Technology", "Algebra"]
};


window.PathFinderData = { baselineGrowth, jobs, occupationCatalog, laborStats, categoryIdeas };



