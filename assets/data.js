/*
  Publication records for Dr. Iskander Hasson A. Sattar.

  Full abstracts live in abstracts.js, copied verbatim from each journal's
  article page (its "src" field). Titles, author names and abstract excerpts here
  are copied as they appear on the
  sources listed in each record's `sources` — nothing is reworded.

  To add a paper, copy one block and fill in what you know. Leave a field as ""
  (or null) if it is unknown — the pages skip empty fields.
  `area` must be one of the keys in AREAS. Set `ar: true` for an Arabic title.
*/

var RG = "https://www.researchgate.net/profile/Iskander-A-Sattar-2";
var RG_SRC = { label: "ResearchGate — Iskander Hasson A. Sattar, Publications", url: RG };
var JSS = "Journal of Social Studies (JSS)";
var JSD = "Journal of Scientific Development for Studies and Research (JSD)";
var UKR = "UKR Journal of Economics, Business and Management (UKRJEBM)";

var PROFILE = {
  name: "Dr. Iskander Hasson A. Sattar",
  nameAr: "د. إسكندر حسن عبدالستار",
  shortName: "Dr. Iskander A. Sattar",
  variants: ["Iskander Hasson A. Sattar", "Iskander H. A. Sattar", "Iskander A. Sattar", "Iskander Hasan Abdulsattar", "د. إسكندر حسن عبد الستار"],
  rgCount: 43
};

var AREAS = {
  strategy:  { name: "Strategy & Leadership",          blurb: "Strategic planning, intelligence, agility and vigilance, and the leadership styles organisations rely on in crisis." },
  hr:        { name: "Human Resource Management",      blurb: "Performance appraisal and management, retention, quality of work life and workforce diversity." },
  digital:   { name: "Digital Transformation & AI",    blurb: "Artificial intelligence, management information systems and digitalisation in Yemeni organisations." },
  marketing: { name: "Marketing & Consumer Behaviour", blurb: "Consumer choice, e-commerce, social media and electronic marketing." },
  finance:   { name: "Governance & Finance",           blurb: "Governance, Islamic financing, risk management and the financial decisions of investors." },
  projects:  { name: "Projects, Operations & Society", blurb: "Monitoring and evaluation, project performance, procurement, entrepreneurship and youth in the labour market." }
};

var PAPERS = [
  /* ---------------- 2026 ---------------- */
  {
    id: "jss-ai-decision-ar",
    title: "اثر تطبيق الذكاء الاصطناعي في جودة اتخاذ القرار", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, type: "Article", area: "digital", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "jss-governance-ar",
    title: "اثر الحوكمة على الاداء التنظيمي", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, type: "Article", area: "finance", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "jss-supportive-ar",
    title: "اثر القيادة الداعمة على تمكين العاملين", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, type: "Article", area: "strategy", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "jss-vigilance-ar",
    title: "اثر اليقظة الاستراتيجية في ادارة ازمات الاندية الرياضية اليمنية", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, type: "Article", area: "strategy", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "jss-social-media-ar",
    title: "اثر ابعاد وسائل التواصل الاجتماعي في تسويق الخدمات", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, type: "Article", area: "marketing", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "women-entrepreneurs",
    title: "Perceived Gender-Based Labor Market Exclusion and Post-Entrepreneurial Precarity: Evidence from Women Entrepreneurs in Yemen",
    authors: ["Jameel E Saif", "Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: "", type: "Article", area: "projects",
    abstract: "This study examined the relationship between perceived gender-based employment discrimination and survivalist entrepreneurship conditions among women entrepreneurs in Yemen, thereby testing a central proposition of Disadvantaged Labor Theory. Using a cross-sectional survey of 108 women entrepreneurs, the study measured employment discrimination thr…",
    sources: [RG_SRC, { label: "SSRN — paper 7535800", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7535800" }]
  },
  {
    id: "strategic-intelligence-lahj",
    title: "أثر الذكاء الاستراتيجي في إدارة الأزمات (دراسة ميدانية في المكاتب التنفيذية بمحافظة لحج، اليمن)", ar: true,
    titleEn: "The Impact of Strategic Intelligence on Crisis Management: (A Field Study in the Executive Offices of Lahj Governorate)",
    authors: ["Khaloon Alwan Saif", "Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9, date: "Published 01/09/2026 (received 23/07/2026, accepted 20/08/2026)",
    venue: JSD, volume: "7", type: "Article", area: "strategy", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "strategic-intelligence-telecom",
    title: "أثر الذكاء الاستراتيجي في رأس المال البشري (دراسة ميدانية في المؤسسة العامة للاتصالات اليمنية - صنعاء)", ar: true,
    authors: ["Iskander Hasson A. Sattar", "أمل عبدالرحمن شمسان سعيد"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSD, volume: "7", type: "Article", area: "strategy", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "strategic-leadership-ministry-en",
    title: "The Impact of Strategic Leadership on Crisis Management ) A Field Study at the Ministry of Higher Education, Scientific Research, Technical Education, and Vocational Training – Yemen)",
    authors: ["Iskander Hasson A. Sattar", "Abdullah Anwer Ahmed Borgi"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSD, volume: "6", issue: "23", pages: "348–371", type: "Article", area: "strategy",
    sources: [RG_SRC, { label: "JSD — Vol. 6 No. 23 (2025)", url: "https://jsd.sdasmart.org/index.php/jsd/en/issue/view/31" }]
  },
  {
    id: "quality-work-life-en",
    title: "The impact of quality of work life on achieving managerial creativity ( A field study of the National Biscuit and Confectionery Company in the Kingdom of Saudi Arabia )",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSD, volume: "7", issue: "26", pages: "30–57", type: "Article", area: "hr",
    sources: [RG_SRC]
  },
  {
    id: "women-investors",
    title: "The Impact of Investment Behavior on Financial Planning Processes Among Women Investors (A case study on women investors in Aden governorate)",
    authors: ["Iskander Hasson A. Sattar", "Shaima"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: UKR, type: "Article", area: "finance",
    abstract: "Women are role models in several societies which have been changing beautifully for the few decades because of higher education, more jobs and income. Consequently women have been playing an increasingly critical role in household financial decision-making and investment practices. We also have gro…",
    sources: [RG_SRC, { label: "UKR Publisher — article page", url: "https://ukrpublisher.com/the-impact-of-investment-behavior-on-financial-planning-processes-among-women-investors-a-case-study-on-women-investors-in-aden-governorate/" }]
  },
  {
    id: "digital-entrepreneurship-ar",
    title: "اثر ريادة الاعمال الرقمية في تنمية المشروعات الصغيرة و المتوسطة في ظل التحول نحو الاقتصاد الرقمي", ar: true,
    authors: ["Iskander Hasson A. Sattar", "Mahmood Abdo Thabet"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: "Bouhouth", issue: "64", type: "Article", area: "digital", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "jss-mis-ar",
    title: "اثر نظم المعلومات الادارية في الاداء المؤسسي", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, type: "Article", area: "digital", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "me-fmf",
    title: "The Impact of Monitoring and Evaluation Practices on Project Success (An Empirical Study on Development Projects Implemented by Field Medical Foundation (FMF) -Yemen)",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: UKR, type: "Article", area: "projects",
    abstract: "The study investigated how Monitoring and Evaluation (M&E) practices affect the success of Field Medical Foundation (FMF) development projects in Yemen's challenging humanitarian context. It treated M&E as a six-part system (planning, human capacity, resources, stakeholder participation, data quali…",
    sources: [RG_SRC]
  },
  {
    id: "strategic-leadership-ministry-ar",
    title: "أثر القيادة الإستراتيجية في إدارة الأزمات (دراسة ميدانية في وزارة التعليم العالي والبحث العلمي والتعليم الفني والتدريب المهني - اليمن)", ar: true,
    authors: ["Iskander Hasson A. Sattar", "عبدالله أنور احمد بورجي"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSD, volume: "6", type: "Article", area: "strategy", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "innovative-leadership-qutaibi",
    title: "The Impact of Innovative Leadership on Employees Performance (Case Study of Al-Qutaibi Islamic Bank -Aden)",
    authors: ["Iskander Hasson A. Sattar", "Rokia A M Alsomaid", "Hend A A M Bagnaf", "Rana M N Ghalib"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: "", type: "Article", area: "strategy",
    sources: [RG_SRC]
  },
  {
    id: "unskilled-labor",
    title: "The Impact of Unskilled Labor on Project Performance (An Empirical Study on Construction Companies in Yemen)",
    authors: ["Iskander H. A. Sattar", "Fatima Iqbal Khudabakhsh Wazir"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSS, volume: "31", issue: "10", type: "Article", area: "projects",
    sources: [RG_SRC, { label: "Journal of Social Studies — Vol. 31 No. 10 (2025)", url: "https://journals.ust.edu/index.php/JSS/issue/current" }]
  },
  {
    id: "quality-work-life-ar",
    title: "أثر جودة الحياة الوظيفية في تحقيق الإبداع الإداري (دراسة ميدانية للشركة الوطنية لصناعه البسكويت والحلويات بالمملكة العربية السعودية)", ar: true,
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSD, volume: "7", issue: "26", pages: "30–57", type: "Article", area: "hr", lang: "Arabic",
    sources: [RG_SRC]
  },
  {
    id: "economic-anxiety-jsd",
    title: "Economic Anxiety, Employment Exclusion, and Future Expectations among Youth in Yemen",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Sep 2026", year: 2026, month: 9,
    venue: JSD, type: "Article", area: "projects",
    sources: [RG_SRC]
  },
  {
    id: "ecommerce-bazarry",
    title: "The Impact of Determinants of Customer Buying Behavior on the Market Performance of E-Commerce Platform. (A case stud on BAZARRY e-commerce company Aden, Yemen)",
    authors: ["Jamal Anes Taleb", "Iskander Hasson A. Sattar", "Walaa", "Gabali Khattab"], etal: true,
    rgDate: "Aug 2026", year: 2026, month: 8, date: "31 August 2026",
    venue: UKR, volume: "2", issue: "8", pages: "323–338", type: "Article", area: "marketing",
    abstract: "This study examined how determinants of customer buying behavior influence the market performance of an e-commerce platform, using Bazzarry in Aden, Yemen as a case study. Specifically, the research investigated the effects of customer trust, price consciousness, and perceived ease of use as dimensions of customer buying behavior on market performa…",
    sources: [RG_SRC, { label: "UKR Publisher — article page", url: "https://ukrpublisher.com/the-impact-of-determinants-of-customer-buying-behavior-on-the-market-performance-of-e-commerce-platform-a-case-stud-on-bazarry-e-commerce-company-aden-yemen/" }]
  },
  {
    id: "ai-crisis-banks",
    title: "The Impact of Artificial Intelligence on Crisis Management in Private Banks in Yemen",
    authors: ["Akram Mohammed Alarshani", "Mohammed Fadl", "Ali Jaber", "Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Aug 2026", year: 2026, month: 8,
    venue: UKR, type: "Article", area: "digital",
    abstract: "This paper aimed to identify the impact of artificial intelligence AI (User-Systems-Devices) on crisis management CM (Signal detection-Preparation/prevention-Containment/Damage limitation-Recovery-Learning) in private banks in Yemen. To achieve the objectives of the study, the quantitative approach…",
    sources: [RG_SRC]
  },
  {
    id: "digitalization-emdad",
    title: "The Impact of Digitalization on the Growth of Small Businesses in Aden (Field Study: In the Emdad Company, Aden)",
    authors: ["Iskander Hasson A. Sattar", "Faiza Ahmed Alyafay", "Saleh Abdullah", "Yahya Shaker Abdualbaseet"], etal: false,
    rgDate: "Aug 2026", year: 2026, month: 8,
    venue: UKR, type: "Article", area: "digital",
    abstract: "This study investigates the impact of digitalization-digital infrastructure, skills, and tools-on small-business growth at Emdad Company in Aden, Yemen. Using 60 valid questionnaires were analyzed with SPSS 26, the findings show a significant positive impact of digitalization on customer satisfacti…",
    rgNote: "Listed twice on ResearchGate.",
    sources: [RG_SRC]
  },
  {
    id: "procurement-risk-flour",
    title: "The Role of Procurement Risk Management in Enhancing Supply Continuity (A Field Study at Yemen Company for Flour Mills & Grain Silos, Aden)",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Aug 2026", year: 2026, month: 8,
    venue: UKR, type: "Article", area: "projects",
    sources: [RG_SRC]
  },
  {
    id: "strategic-agility-flour",
    title: "The Role of Strategic Agility in Organizational Resilience (Case Study of Yemen Company for Flour Mills and Silos) Aden",
    authors: ["Iskander Hasson A. Sattar", "Abdo Mahmoud Thabet", "Ali Abdulhakim"], etal: true,
    rgDate: "Aug 2026", year: 2026, month: 8,
    venue: UKR, type: "Article", area: "strategy",
    sources: [RG_SRC]
  },
  {
    id: "performance-review-it",
    title: "The Contribution of Performance Review Mechanisms to Organizational Excellence. (A Field Study in Information Technology Organizations in Aden, Yemen.)",
    authors: ["H A Sattar", "Akram Mohammed Alarshani", "Shaima", "Ali Abdulqader Abdo"], etal: true,
    rgDate: "Jul 2026", year: 2026, month: 7,
    venue: UKR, type: "Article", area: "hr",
    sources: [RG_SRC]
  },
  {
    id: "cac-bank",
    title: "Impact of Performance Management on Employee Productivity (Case Study in Cac Bank- Yemen)",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "May 2026", year: 2026, month: 5,
    venue: "Academic International Journal of Social Sciences and Humanities (AIJSSH)", volume: "4", issue: "1", type: "Article", area: "hr",
    abstract: "الهدف الرئيسي للدراسة هو بحث أثر عملية إدارة الأداء على إنتاجية الموظفين. وتضمنت أهدافها الفرعية تقييم أثر إدارة الأداء على إنتاجية الموظفين في بنك CAC - اليمن، واستكشاف أثر تقييم الأداء، والمكافآت، والتدريب والتطوير، والتغذية الراجعة على إنتاجية الموظفين. ومن خلال مراجعة شاملة للأدبيات وتحليل مفصل للبيانات التي جُمعت من بنك CAC - اليمن، استهدف الب…",
    abstractAr: true,
    sources: [RG_SRC, { label: "AIJSSH — article S412", url: "https://aijssh.aipublishers.org/index.php/aijssh/en/article/view/S412" }]
  },
  {
    id: "appraisal-it",
    title: "Impact of Performance Appraisal Systems on Employee Performance (A Field Study of Information Technology (IT) Organizations in Aden, Yemen",
    authors: ["Iskander Hasson A. Sattar", "Mahmood Abdo Thabet", "Mohammed Fadhl Abdullah", "Ali Jaber"], etal: true,
    rgDate: "May 2026", year: 2026, month: 5,
    venue: UKR, volume: "2", issue: "5", type: "Article", area: "hr",
    abstract: "A well-functioning Human Resource Management Performance Appraisal System (PAS) will function in the open while being beneficial to employees and the entire organisation. Effectiveness of appraisal can be increased if we get feedback from the appraisers & appraisees on the current state of PAS in t…",
    sources: [RG_SRC, { label: "UKRJEBM — Volume 2, Issue 5 (May 2026)", url: "https://ukrpublisher.com/ukrjebm-volume-2-issue-5-may-2026/" }]
  },
  {
    id: "strategic-planning-universities",
    title: "Impact of Strategic Planning on the Performance of the Universities (A Field Study in a Number of Private and Public Universities Operating in Aden)",
    authors: ["Jamal Anes Taleb", "Hasan Taleb", "Iskander Hasson A. Sattar", "Aiuob Ali Abdo"], etal: true,
    rgDate: "May 2026", year: 2026, month: 5, date: "10 May 2026",
    venue: UKR, volume: "2", issue: "5", type: "Article", area: "strategy",
    sources: [RG_SRC, { label: "UKR Publisher — full text (PDF)", url: "https://ukrpublisher.com/wp-content/uploads/2026/05/Impact-of-Strategic-Planning-on-the-Performance-of-the-Universities.pdf" }]
  },
  {
    id: "risk-management-cac",
    title: "The Impact of Risk Management Practices on the Financial Performance (Field study in Cooperative and Agricultural Credit Bank -CAC in Aden)",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Feb 2026", year: 2026, month: 2,
    venue: UKR, type: "Article", area: "finance",
    sources: [RG_SRC]
  },
  {
    id: "job-readiness",
    title: "Influence of Job-Readiness Competencies on Career Adaptability (A Study of the Performance of Food Trading Companies in Aden)",
    authors: ["Iskander Hasson A. Sattar", "Jamal Anes Taleb", "Amira Elshareef Mohammed"], etal: false,
    rgDate: "Feb 2026", year: 2026, month: 2,
    venue: UKR, type: "Article", area: "hr",
    abstract: "This study investigates the impact of job-readiness skills on career adaptability in the context of a rapidly changing labor market. Job-readiness skills, including communication, problem-solving, teamwork, self-management, and digital competence, are examined as key factors supporting successful c…",
    sources: [RG_SRC, { label: "UKR Publisher — full text (PDF)", url: "https://ukrpublisher.com/wp-content/uploads/2026/02/UKRJEBM-1021-2026.pdf" }]
  },
  {
    id: "silent-resignation",
    title: "Impact Of Internal Control on Employee Silent Resignation",
    authors: ["Iskander Hasson A. Sattar", "Jamal Anes Taleb", "Mahmood Abdo Thabet"], etal: false,
    rgDate: "Jan 2026", year: 2026, month: 1,
    venue: UKR, type: "Article", area: "hr",
    sources: [RG_SRC, { label: "UKR Publisher — full text (PDF)", url: "https://ukrpublisher.com/wp-content/uploads/2026/01/UKRJEBM-1013-2026.pdf" }]
  },
  {
    id: "mobile-market",
    title: "Impact of Changing Trends in the mobile Phone Market on Consumers' Revealed Preference in Aden City -Yemen",
    authors: ["Iskander Hasson A. Sattar", "Mahmood Abdo Thabet", "Jamal Anes Taleb"], etal: false,
    rgDate: "Jan 2026", year: 2026, month: 1, date: "27 January 2026",
    venue: UKR, volume: "2", issue: "1", pages: "167–186", doi: "10.5281/zenodo.18391729", type: "Article", area: "marketing",
    abstract: "In today's world, mobile phones have become an essential part of everyday life. When people decide to purchase a phone, they usually consider several factors such as the technology, design, features, and price. Because the mobile phone market is highly dynamic and new models are released frequently…",
    sources: [RG_SRC,
      { label: "ResearchGate — publication 413780046", url: "https://www.researchgate.net/publication/413780046_UKR_Journal_of_Economics_Business_and_Management_UKRJEBM_Impact_of_Changing_Trends_in_the_mobile_Phone_Market_on_Consumers'_Revealed_Preference_in_Aden_City_-Yemen" },
      { label: "UKR Publisher — full text (PDF)", url: "https://ukrpublisher.com/wp-content/uploads/2026/01/UKRJEBM-1009-2026.pdf" }]
  },
  {
    id: "youth-economic-anxiety",
    title: "Determinants of Economic Anxiety and Labor Market Exclusion: An Analysis of Yemeni Youth's Perceptions of the Future",
    authors: ["Naif Kamal", "Faiza Ahmed", "Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Jan 2026", year: 2026, month: 1,
    venue: "", type: "Article", area: "projects",
    abstract: "This study examines how economic anxiety, employment exclusion and future expectations intersect among young people in Yemen. Drawing on a national survey of 990 youth respondents aged 16 to 30, the paper analyzes subjective economic status, family economic change, access to money, work participation, job structure, perceived macroeconomic threats,…",
    sources: [RG_SRC]
  },

  /* ---------------- 2025 ---------------- */
  {
    id: "cultural-diversity-hospitals",
    title: "The Impact Of Cultural Diversity On Organizational Performance: (A Field Study On Hospitals In Yemen)",
    authors: ["Iskander Hasson A. Sattar", "Basma Omer Hashem Mohammed"], etal: false,
    rgDate: "Dec 2025", year: 2025, month: 12,
    venue: JSS, type: "Article", area: "hr",
    abstract: "Diversity is one of the biggest challenges for many organizations. However, the majority of people believe that cultural diversity is fundamental to performance. This study examined the relationship between cultural diversity and organizational performance in hospitals in Yemen, focusing particularly on hospitals in Aden. This research is motivated…",
    sources: [RG_SRC]
  },
  {
    id: "teleyemen-retention",
    title: "Impact of Working Environment Strategy on Employee Retention (Case Study on TeleYemen Company in Yemen)",
    authors: ["Iskander Hasson A. Sattar"], etal: false,
    rgDate: "Oct 2025", year: 2025, month: 10,
    venue: UKR, volume: "1", issue: "8", type: "Article", area: "hr",
    sources: [RG_SRC, { label: "UKR Publisher — full text (PDF)", url: "https://ukrpublisher.com/wp-content/uploads/2025/10/UKRJEBM-76-2025.pdf" }]
  },
  {
    id: "ai-leadership-sabafon",
    title: "The Impact of Artificial Intelligence-Based Leadership on Quality of Decision-Making. (Field study at the Yemen Telecommunications SabaFon Company – Aden).",
    authors: ["Iskander Hasson A. Sattar", "Sameer Mohammed Jazem"], etal: false,
    rgDate: "Jul 2025", year: 2025, month: 7,
    venue: JSS, type: "Article", area: "digital",
    abstract: "The study aimed to measure the impact of artificial intelligence on the quality of decision-making within the Yemeni Telecommunications Company \"SabaFon\" - Aden branch. The study relied on the descriptive analytical approach, and included a sample of (133) employees from various administrative levels, who were selected using a comprehensive survey…",
    sources: [RG_SRC]
  },
  {
    id: "mis-central-bank",
    title: "The Impact of Management Information Systems on Institutional Performance in the Central Bank of Yemen – Main Branch, Aden",
    authors: ["Moatasem Yasser Ali", "Iskander Hasson A. Sattar"], etal: false,
    rgDate: "May 2025", year: 2025, month: 5,
    venue: JSS, type: "Article", area: "digital",
    abstract: "هدفت هذه الدراسة إلى تحليل أثر نظم المعلومات الإدارية بأبعادها المختلفة (الموارد البشرية، والموارد المادية، والبرمجيات، والشبكات، والأمن السيبراني) في الأداء المؤسسي بأبعاده (العمليات الداخلية، والأداء المالي، والعملاء، والتعلم والنمو) في البنك المركزي اليمني – المركز الرئيس عدن. اعتمدت الدراسة على المنهج الوصفي التحليلي لتحديد العلاقة بين نظم المع…",
    abstractAr: true,
    sources: [RG_SRC]
  },
  {
    id: "innovative-leadership",
    title: "Impact of Innovative Leadership on Employees Performance",
    authors: ["Iskander Hasson A. Sattar", "Rokia Abdullah Mohammed Alsomaid", "Hend Ahmed Ali Musallam Bagnaf", "Rana Muneer Noman Ghalib"], etal: false,
    rgDate: "Feb 2025", year: 2025, month: 2,
    venue: JSS, volume: "31", issue: "2", type: "Article", area: "strategy",
    abstract: "The main objective of this study is to identify the relationship between innovative leadership and employee performance within a banking institution in Aden- Yemen which is ( Al-Qutaibi Islamic Bank )Where the problem statement was represented to answer the following question : What is the impact of innovative leadership with it’s dimensions on emp…",
    sources: [RG_SRC, { label: "Journal of Social Studies — journal site", url: "https://journals.ust.edu/index.php/JSS" }]
  },
  {
    id: "governance-tawasul",
    title: "The Impact of Governance on Organizational Performance (A Field Study at Al-Tawasul Foundation for Humanitarian Development – Yemen)",
    authors: ["Iskander Hasson A. Sattar", "Amal Thabet Saeed Mohsen Al-Antary"], etal: false,
    rgDate: "Jan 2025", year: 2025, month: 1,
    venue: JSS, volume: "31", issue: "12", doi: "10.20428/jss.v31i12.3450", type: "Article", area: "finance",
    abstract: "The study examines the impact of governance and its dimensions—rule of law, transparency and disclosure, participation, accountability, and responsibility— on organizational performance at the Tawasul Foundation for Humanitarian Development in Yemen. Organizational performance was assessed through four dimensions: beneficiary satisfaction, financia…",
    sources: [RG_SRC, { label: "Journal of Social Studies — full text (PDF)", url: "https://journals.ust.edu/index.php/JSS/article/download/3450/2775/21639" }]
  },
  {
    id: "islamic-financing",
    title: "The The Impact of Islamic Financing on the Economic Development of Aden governorate (A Field Study at Saba, Al-kurimi and Tadhamon banks)",
    authors: ["Iskander Hasson A. Sattar", "Ammar Saleh", "Omar Hubaishan"], etal: false,
    rgDate: "Jan 2025", year: 2025, month: 1, date: "28 January 2025",
    venue: JSS, volume: "31", issue: "1", doi: "10.20428/jss.v31i1.2690", type: "Article", area: "finance",
    abstract: "This study looked at the impact of Islamic finance on Yemeni economic development, with an emphasis on the role of Islamic banks in the Aden Governorate. Using a qualitative methodology, including a (50) individual sample survey. A questionnaire is used for data collection, which was analyzed with SPSS program. The methodology of this study is de…",
    sources: [RG_SRC, { label: "Journal of Social Studies — article 2690", url: "https://journals.ust.edu/index.php/JSS/article/view/2690" }]
  },
  {
    id: "corporate-governance-ust",
    title: "The Impact of Corporate Governance on Employee Performance (A case study of University of Science and Technology)",
    authors: ["Iskander Hasson A. Sattar"], etal: true,
    rgDate: "", year: 2025, month: 5,
    venue: "Al-Qantar Journal — Economic and Entrepreneurship Studies Series", volume: "5", issue: "7", pages: "46–63", type: "Article", area: "finance",
    notOnRG: true,
    sources: [{ label: "Al-Qantar Journal — full text (PDF)", url: "https://www.qjhas.com/wp-content/uploads/2025/05/The-Impact-of-Corporate-Governance-on-Employee-Performance_-complete-document-Modified.pdf" }]
  },

  /* ---------------- 2024 ---------------- */
  {
    id: "supportive-leadership",
    title: "The Impact of Supportive Leadership on Employee Empowerment: A Field Study in the Association for the Care and Rehabilitation of the Blind in Aden Governorate",
    authors: ["Iskander Hasson A. Sattar", "Ridhwan Ahmed Abdullah Al-Hanshi"], etal: false,
    rgDate: "Dec 2024", year: 2024, month: 12,
    venue: JSS, type: "Article", area: "strategy",
    abstract: "The study aimed to identify the impact of supportive leadership on empowering workers. A field study in the Society for the Care and Rehabilitation of the Blind in Aden Governorate. The study followed the descriptive analytical approach. The study sample consisted of (34) individuals from the Society for the Care and Rehabilitation of the Blind in…",
    sources: [RG_SRC]
  },
  {
    id: "strategic-vigilance-sports",
    title: "The Impact of Strategic Vigilance on Crisis Management in Yemeni Sports Clubs",
    authors: ["Iskander Hasson A. Sattar", "Abeer Abdullah Ali Hassan"], etal: false,
    rgDate: "Nov 2024", year: 2024, month: 11,
    venue: JSS, volume: "30", issue: "3", doi: "10.20428/jss.v30i3.2550", type: "Article", area: "strategy",
    abstract: "This study investigated the impact of strategic alertness and its dimensions (social, legal, informational, technological, competitive, economic, and environmental) on crisis management in Yemeni sports clubs. Using descriptive and analytical methods, data were gathered through a questionnaire distributed to a purposive sample of 60 participants, w…",
    sources: [RG_SRC, { label: "Journal of Social Studies — article 2550", url: "https://journals.ust.edu/index.php/JSS/article/view/2550" }]
  },

  /* ---------------- 2022 ---------------- */
  {
    id: "monitoring-evaluation-2022",
    title: "Impact of Monitoring and Evaluation on the Project Implementation Results",
    titleAr: "أثر المراقبة و التقييم على نتائج تنفيذ المشاريع",
    authors: ["Iskander Hasan Abdulsattar"], etal: false,
    rgDate: "", year: 2022, month: 6, date: "30 June 2022",
    venue: "Electronic Journal of University of Aden for Humanity and Social Sciences (EJUA-HS)", volume: "3", issue: "2", pages: "67–74", doi: "10.47372/ejua-hs.2022.2.161",
    type: "Article", area: "projects", lang: "Arabic",
    notOnRG: true,
    sources: [{ label: "EJUA-HS — article 161", url: "https://ejua.net/index.php/EJUA-HS/article/view/161" },
      { label: "ResearchGate — publication 361667136", url: "https://www.researchgate.net/publication/361667136_athr_almraqbt_w_altqyym_ly_ntayj_tnfydh_almshary" }]
  }
];
