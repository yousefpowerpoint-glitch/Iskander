/*
  Publication records for Dr. Iskander Hasson A. Sattar.

  To add a paper, copy one block and fill in what you know. Leave a field
  as "" (or null for year) if it is unknown — the pages skip empty fields.

  area must be one of the keys in AREAS below.
*/

var PROFILE = {
  name: "Dr. Iskander Hasson A. Sattar",
  nameAr: "د. إسكندر حسن عبدالستار",
  shortName: "Dr. Iskander A. Sattar",
  title: "Associate Professor of Business Administration",
  section: "Business Administration Section",
  faculty: "Faculty of Administrative Sciences",
  university: "University of Science and Technology",
  city: "Aden, Yemen",
  variants: ["Iskander A. Sattar", "Iskander H. A. Sattar", "Iskander Hasson A. Sattar", "Iskander Hasan Abdulsattar"],
  links: [
    { label: "ResearchGate", url: "https://www.researchgate.net/profile/Iskander-A-Sattar-2" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=QQ9TbuIAAAAJ" }
  ]
};

var AREAS = {
  strategy:  { name: "Strategy & Leadership",        blurb: "Strategic planning, agility, vigilance and the leadership styles that carry organisations through crisis." },
  hr:        { name: "Human Resource Management",    blurb: "Performance appraisal, productivity, retention and the behaviour of employees inside Yemeni organisations." },
  marketing: { name: "Marketing & Consumer Behaviour", blurb: "How buyers in Aden choose, from mobile handsets to e-commerce platforms and digital marketing." },
  finance:   { name: "Governance & Finance",         blurb: "Corporate governance, Islamic financing and the financial decisions of investors." },
  projects:  { name: "Projects & Entrepreneurship",  blurb: "Project monitoring and evaluation, construction performance and women-led enterprise." }
};

var PAPERS = [
  {
    id: "ecommerce-bazarry",
    title: "The Impact of Determinants of Customer Buying Behavior on the Market Performance of E-Commerce Platform: A Case Study on BAZARRY E-Commerce Company, Aden, Yemen",
    authors: ["Iskander H. A. Sattar", "Walaa Adel Seragi"], etal: true,
    year: 2026, date: "31 August 2026",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "2", issue: "8", pages: "323–338", doi: "",
    url: "https://ukrpublisher.com/the-impact-of-determinants-of-customer-buying-behavior-on-the-market-performance-of-e-commerce-platform-a-case-stud-on-bazarry-e-commerce-company-aden-yemen/",
    type: "Journal article", area: "marketing", setting: "BAZARRY e-commerce company, Aden",
    note: "Examines which drivers of customer buying behaviour translate into market performance for a local e-commerce platform."
  },
  {
    id: "strategic-planning-universities",
    title: "Impact of Strategic Planning on the Performance of the Universities: A Field Study of Private and Public Universities in Aden",
    authors: ["Iskander Hasson A. Sattar"], etal: true,
    year: 2026, date: "10 May 2026",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "2", issue: "5", pages: "", doi: "",
    url: "https://ukrpublisher.com/wp-content/uploads/2026/05/Impact-of-Strategic-Planning-on-the-Performance-of-the-Universities.pdf",
    type: "Journal article", area: "strategy", setting: "Private and public universities, Aden",
    note: "Field study built on the attitudes of administrative staff toward strategic planning and institutional performance."
  },
  {
    id: "appraisal-it",
    title: "Impact of Performance Appraisal Systems on Employee Performance: A Field Study of Information Technology (IT) Organizations in Aden, Yemen",
    authors: ["Iskander H. A. Sattar"], etal: true,
    year: 2026, date: "May 2026",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "2", issue: "5", pages: "", doi: "",
    url: "https://ukrpublisher.com/ukrjebm-volume-2-issue-5-may-2026/",
    type: "Journal article", area: "hr", setting: "IT organisations, Aden",
    note: "Looks at how the design of appraisal systems relates to the performance of employees in the IT sector."
  },
  {
    id: "job-readiness",
    title: "Influence of Job-Readiness Competencies on Career Adaptability: Evidence from Food Trading Companies in Aden",
    authors: ["Iskander H. A. Sattar", "Jamal Anes Taleb", "Amira Elshareef Mohammed"], etal: false,
    year: 2026, date: "February 2026",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "2", issue: "2", pages: "", doi: "",
    url: "https://ukrpublisher.com/wp-content/uploads/2026/02/UKRJEBM-1021-2026.pdf",
    type: "Journal article", area: "hr", setting: "Food trading companies, Aden",
    note: "Connects the competencies employees bring to a job with their ability to adapt as careers change."
  },
  {
    id: "mobile-market",
    title: "Impact of Changing Trends in the Mobile Phone Market on Consumers' Revealed Preference in Aden City, Yemen",
    authors: ["Iskander H. A. Sattar", "Mahmood Abdo Thabet", "Jamal Anes Taleb"], etal: false,
    year: 2026, date: "27 January 2026",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "2", issue: "1", pages: "167–186", doi: "10.5281/zenodo.18391729",
    url: "https://ukrpublisher.com/wp-content/uploads/2026/01/UKRJEBM-1009-2026.pdf",
    type: "Journal article", area: "marketing", setting: "Mobile phone consumers, Aden",
    note: "Reads consumer choice through revealed preference as the handset market in Aden shifts."
  },
  {
    id: "silent-resignation",
    title: "Impact of Internal Control on Employee Silent Resignation",
    authors: ["Iskander H. A. Sattar", "Jamal Anes Taleb", "Mahmood Abdo Thabet"], etal: false,
    year: 2026, date: "January 2026",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "2", issue: "1", pages: "", doi: "",
    url: "https://ukrpublisher.com/wp-content/uploads/2026/01/UKRJEBM-1013-2026.pdf",
    type: "Journal article", area: "hr", setting: "Yemeni organisations",
    note: "Studies whether internal control systems shape \"quiet quitting\" — employees who stay but disengage."
  },
  {
    id: "cac-bank",
    title: "Impact of Performance Management on Employee Productivity: Case Study in CAC Bank, Yemen",
    authors: ["Iskander A. Sattar"], etal: true,
    year: 2026, date: "",
    venue: "Academic International Journal of Social Sciences and Humanities (AIJSSH)",
    volume: "4", issue: "1", pages: "", doi: "",
    url: "https://aijssh.aipublishers.org/index.php/aijssh/en/article/view/S412",
    type: "Journal article", area: "hr", setting: "CAC Bank, Yemen",
    note: "Traces the effect of the performance management process on the productivity of bank employees."
  },
  {
    id: "women-entrepreneurs",
    title: "The Relationship between Perceived Gender-based Labor Market Exclusion and Post-entrepreneurial Precarity: Evidence from Women Entrepreneurs in Yemen",
    authors: ["Jameel Saif", "Iskander A. Sattar"], etal: false,
    year: 2026, date: "",
    venue: "SSRN Working Paper",
    volume: "", issue: "", pages: "", doi: "",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7535800",
    type: "Working paper", area: "projects", setting: "108 women entrepreneurs, Yemen",
    note: "Survey-based study of women who turned to entrepreneurship after exclusion from the labour market, and the insecurity that follows."
  },
  {
    id: "governance-tawasul",
    title: "The Impact of Governance on Organizational Performance: A Field Study at Al-Tawasul Foundation for Humanitarian Development, Yemen",
    authors: ["Iskander H. A. Sattar", "Amal Thabet Saeed Mohsen Al-Antary"], etal: false,
    year: 2025, date: "",
    venue: "Journal of Social Studies (JSS)",
    volume: "31", issue: "12", pages: "", doi: "10.20428/jss.v31i12.3450",
    url: "https://journals.ust.edu/index.php/JSS/article/download/3450/2775/21639",
    type: "Journal article", area: "finance", setting: "Al-Tawasul Foundation, Yemen",
    note: "Applies governance principles to a humanitarian non-profit and measures the link with organisational performance."
  },
  {
    id: "unskilled-labor",
    title: "The Impact of Unskilled Labor on Project Performance: An Empirical Study on Construction Companies in Yemen",
    authors: ["Iskander A. Sattar", "Fatima Iqbal Khudabakhsh Wazir"], etal: false,
    year: 2025, date: "",
    venue: "Journal of Social Studies (JSS)",
    volume: "31", issue: "10", pages: "", doi: "",
    url: "https://journals.ust.edu/index.php/JSS/issue/current",
    type: "Journal article", area: "projects", setting: "Construction companies, Yemen",
    note: "Measures how reliance on unskilled labour affects time, cost and quality outcomes of construction projects."
  },
  {
    id: "corporate-governance-ust",
    title: "The Impact of Corporate Governance on Employee Performance: A Case Study of the University of Science and Technology",
    authors: ["Iskander Hasson A. Sattar"], etal: true,
    year: 2025, date: "",
    venue: "Al-Qantar Journal — Economic and Entrepreneurship Studies Series",
    volume: "5", issue: "7", pages: "46–63", doi: "",
    url: "https://www.qjhas.com/wp-content/uploads/2025/05/The-Impact-of-Corporate-Governance-on-Employee-Performance_-complete-document-Modified.pdf",
    type: "Journal article", area: "finance", setting: "University of Science and Technology, Aden (50 employees)",
    note: "Case study inside the university itself, surveying staff on governance practice and their own performance."
  },
  {
    id: "strategic-leadership-ministry",
    title: "The Impact of Strategic Leadership on Crisis Management: A Field Study at the Ministry of Higher Education, Scientific Research, Technical Education and Vocational Training, Yemen",
    authors: ["Iskander H. A. Sattar", "Abdullah Anwer Ahmed Borgi"], etal: false,
    year: 2025, date: "",
    venue: "Journal of Scientific Development for Studies and Research (JSD)",
    volume: "6", issue: "23", pages: "348–371", doi: "",
    url: "https://jsd.sdasmart.org/index.php/jsd/en/issue/view/31",
    type: "Journal article", area: "strategy", setting: "Ministry of Higher Education, Yemen",
    lang: "Arabic",
    note: "Asks how strategic leadership inside a government ministry shapes its handling of crises."
  },
  {
    id: "innovative-leadership",
    title: "Impact of Innovative Leadership on Employees' Performance",
    authors: ["Iskander A. Sattar", "Rokia Abdullah Mohammed Alsomaid", "Hend Ahmed Ali Musallam Bagnaf", "Rana Muneer Noman Ghalib"], etal: false,
    year: 2025, date: "",
    venue: "Journal of Social Studies (JSS)",
    volume: "31", issue: "2", pages: "", doi: "",
    url: "https://journals.ust.edu/index.php/JSS",
    type: "Journal article", area: "strategy", setting: "Yemen",
    note: "Relates innovative leadership behaviour to the measured performance of employees."
  },
  {
    id: "islamic-financing",
    title: "The Impact of Islamic Financing on the Economic Development of Aden Governorate: A Field Study at Saba, Al-Kuraimi and Tadhamon Banks",
    authors: ["Iskander A. Sattar", "Ammar Saleh", "Omar Hubaishan"], etal: false,
    year: 2025, date: "28 January 2025",
    venue: "Journal of Social Studies (JSS)",
    volume: "31", issue: "1", pages: "", doi: "10.20428/jss.v31i1.2690",
    url: "https://journals.ust.edu/index.php/JSS/article/view/2690",
    type: "Journal article", area: "finance", setting: "Saba, Al-Kuraimi and Tadhamon banks, Aden",
    note: "Field study of three Islamic banks and the contribution of their financing to development in Aden."
  },
  {
    id: "teleyemen-retention",
    title: "Impact of Working Environment Strategy on Employee Retention: A Case Study of TeleYemen",
    authors: ["Iskander H. A. Sattar"], etal: true,
    year: 2025, date: "",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "1", issue: "8", pages: "", doi: "",
    url: "https://ukrpublisher.com/wp-content/uploads/2025/10/UKRJEBM-76-2025.pdf",
    type: "Journal article", area: "hr", setting: "TeleYemen",
    note: "Looks at the working environment as a deliberate strategy for keeping staff in the telecom sector."
  },
  {
    id: "strategic-vigilance-sports",
    title: "The Impact of Strategic Vigilance on Crisis Management in Yemeni Sports Clubs: A Field Study in Sports Clubs in Aden Governorate",
    authors: ["Iskander Hassan Abdul-Sattar", "Abeer Abdullah Ali Hassan"], etal: false,
    year: 2024, date: "",
    venue: "Journal of Social Studies (JSS)",
    volume: "30", issue: "3", pages: "", doi: "10.20428/jss.v30i3.2550",
    url: "https://journals.ust.edu/index.php/JSS/article/view/2550",
    type: "Journal article", area: "strategy", setting: "Sports clubs, Aden (54 respondents)",
    lang: "Arabic",
    note: "Finds a significant relationship between strategic vigilance, across its dimensions, and the effectiveness of crisis management in the clubs."
  },
  {
    id: "supportive-leadership",
    title: "The Impact of Supportive Leadership on Employee Empowerment",
    authors: ["Iskander A. Sattar", "Ridhwan Ahmed Abdullah Al-Hanshi"], etal: false,
    year: 2024, date: "",
    venue: "Journal of Social Studies (JSS)",
    volume: "", issue: "", pages: "", doi: "",
    url: "https://journals.ust.edu/index.php/JSS",
    type: "Journal article", area: "strategy", setting: "Yemen",
    note: "Examines how a supportive leadership style widens the room employees have to act and decide."
  },
  {
    id: "monitoring-evaluation",
    title: "Impact of Monitoring and Evaluation on the Project Implementation Results",
    titleAr: "أثر المراقبة والتقييم على نتائج تنفيذ المشاريع",
    authors: ["Iskander Hasan Abdulsattar"], etal: false,
    year: 2022, date: "30 June 2022",
    venue: "Electronic Journal of University of Aden for Humanity and Social Sciences (EJUA-HS)",
    volume: "3", issue: "2", pages: "67–74", doi: "10.47372/ejua-hs.2022.2.161",
    url: "https://ejua.net/index.php/EJUA-HS/article/view/161",
    type: "Journal article", area: "projects", setting: "Development projects, Yemen",
    lang: "Arabic",
    note: "Studies monitoring and evaluation as a driver of what projects actually deliver."
  },
  {
    id: "strategic-agility-flour",
    title: "The Role of Strategic Agility in Organizational Resilience: Case Study of Yemen Company for Flour Mills and Silos, Aden",
    authors: ["Iskander A. Sattar"], etal: true,
    year: null, date: "",
    venue: "",
    volume: "", issue: "", pages: "", doi: "",
    url: "",
    type: "Journal article", area: "strategy", setting: "Yemen Company for Flour Mills and Silos, Aden",
    note: "Case study of how a strategically agile company absorbs shocks and recovers."
  },
  {
    id: "women-investors",
    title: "The Impact of Investment Behavior on Financial Planning Processes Among Women Investors: A Case Study on Women Investors in Aden Governorate",
    authors: ["Iskander H. A. Sattar"], etal: true,
    year: null, date: "",
    venue: "UKR Journal of Economics, Business and Management (UKRJEBM)",
    volume: "", issue: "", pages: "", doi: "",
    url: "https://ukrpublisher.com/the-impact-of-investment-behavior-on-financial-planning-processes-among-women-investors-a-case-study-on-women-investors-in-aden-governorate/",
    type: "Journal article", area: "finance", setting: "Women investors, Aden",
    note: "Links how women investors behave to the way they plan their finances."
  },
  {
    id: "emarketing-ust",
    title: "The Impact of Electronic Marketing on Enhancing Competitive Advantage: Field Study at University of Science and Technology, Main Campus, Aden",
    authors: ["Iskander A. Sattar"], etal: true,
    year: null, date: "",
    venue: "Journal of Scientific Development for Studies and Research (JSD)",
    volume: "", issue: "", pages: "", doi: "",
    url: "https://jsd.sdasmart.org/index.php/jsd/en/article/view/453",
    type: "Journal article", area: "marketing", setting: "University of Science and Technology, Aden",
    note: "Asks whether digital marketing gives a private university an edge over its competitors."
  }
];
