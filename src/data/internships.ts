export interface Internship {
  id: string;
  company: string;
  location: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  skills: string[];
  duration: string;
  startDate: string;
  type: string;
  industry: string;
  focus: string;
  applicationUrl?: string;
}

export const internships: Internship[] = [
  {
    id: "sap-genai-001",
    company: "SAP",
    location: "Walldorf, Germany",
    title: "Generative AI Intern - Joule Development",
    department: "AI & Machine Learning",
    description: "Join our team developing Joule, SAP's AI copilot. Work on LLM integration, RAG systems, and enterprise AI applications.",
    requirements: [
      "Enrolled in Master's program in Computer Science, AI, or related field",
      "Experience with Python and ML frameworks (PyTorch, TensorFlow)",
      "Knowledge of LLMs, transformers, and prompt engineering",
      "Familiarity with LangChain, Hugging Face, or similar",
      "Understanding of RAG architectures and vector databases",
      "Strong problem-solving skills and English proficiency"
    ],
    skills: ["Python", "PyTorch", "LLMs", "RAG", "LangChain", "Hugging Face", "Vector Databases", "NLP", "Transformers"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Mandatory Internship",
    industry: "Enterprise Software",
    focus: "Generative AI",
    applicationUrl: "https://careers.sap.com/job/search"
  },
  {
    id: "siemens-ai-002",
    company: "Siemens",
    location: "Munich, Germany",
    title: "AI/ML Intern - Industrial Automation",
    department: "Digital Industries",
    description: "Develop AI solutions for industrial automation. Work on predictive maintenance, anomaly detection, and computer vision for manufacturing.",
    requirements: [
      "Master's student in Computer Science, Engineering, or AI",
      "Strong Python skills with scikit-learn, pandas, NumPy",
      "Experience with deep learning (PyTorch or TensorFlow)",
      "Knowledge of computer vision or time series analysis",
      "Familiarity with Docker and cloud platforms (AWS/Azure)",
      "Interest in Industry 4.0 and manufacturing AI"
    ],
    skills: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "Time Series", "Docker", "AWS", "Azure", "Scikit-learn", "Pandas"],
    duration: "4-6 months",
    startDate: "ASAP",
    type: "Internship",
    industry: "Industrial Technology",
    focus: "Industrial AI",
    applicationUrl: "https://www.siemens.com/careers"
  },
  {
    id: "bosch-ml-003",
    company: "Bosch",
    location: "Stuttgart, Germany",
    title: "Machine Learning Intern - Autonomous Systems",
    department: "Research & Advanced Engineering",
    description: "Research and develop ML models for autonomous driving and ADAS systems. Focus on sensor fusion, object detection, and embedded AI.",
    requirements: [
      "PhD or Master's student in Computer Science, Robotics, or AI",
      "Strong background in deep learning and computer vision",
      "Experience with PyTorch and model optimization",
      "Knowledge of sensor fusion, SLAM, or 3D perception",
      "Familiarity with C++ and embedded systems is a plus",
      "Publication record is advantageous"
    ],
    skills: ["PyTorch", "Computer Vision", "Deep Learning", "Sensor Fusion", "C++", "Embedded AI", "Object Detection", "3D Perception"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Research Internship",
    industry: "Automotive & Technology",
    focus: "Autonomous Systems",
    applicationUrl: "https://www.bosch.com/careers"
  },
  {
    id: "bmw-ai-004",
    company: "BMW Group",
    location: "Munich, Germany",
    title: "AI Intern - Connected Car & Data Analytics",
    department: "Data & AI Services",
    description: "Build AI-powered features for connected vehicles. Work on driver behavior analysis, predictive maintenance, and personalized experiences.",
    requirements: [
      "Master's student in Computer Science, Data Science, or AI",
      "Proficiency in Python and data analysis libraries",
      "Experience with machine learning and statistical modeling",
      "Knowledge of SQL and big data technologies",
      "Familiarity with cloud platforms and MLOps",
      "Interest in automotive industry"
    ],
    skills: ["Python", "Machine Learning", "SQL", "Big Data", "Statistical Modeling", "Cloud", "MLOps", "Data Analytics", "Pandas"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Mandatory Internship",
    industry: "Automotive",
    focus: "Connected Car AI",
    applicationUrl: "https://www.bmwgroup.jobs"
  },
  {
    id: "zalando-nlp-005",
    company: "Zalando",
    location: "Berlin, Germany",
    title: "NLP & GenAI Intern - Fashion Technology",
    department: "AI Platform",
    description: "Develop NLP and GenAI solutions for fashion e-commerce. Work on product recommendations, search optimization, and AI-powered styling assistants.",
    requirements: [
      "Master's student in Computer Science, NLP, or AI",
      "Strong Python skills and ML framework experience",
      "Knowledge of NLP, transformers, and language models",
      "Experience with recommendation systems",
      "Familiarity with A/B testing and experimentation",
      "Understanding of e-commerce and fashion domain is a plus"
    ],
    skills: ["Python", "NLP", "Transformers", "LLMs", "Recommendation Systems", "PyTorch", "A/B Testing", "Search", "Hugging Face"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Internship",
    industry: "E-commerce & Fashion",
    focus: "NLP & GenAI",
    applicationUrl: "https://jobs.zalando.com"
  },
  {
    id: "n26-ai-006",
    company: "N26",
    location: "Berlin, Germany",
    title: "AI/ML Intern - Fraud Detection & Risk",
    department: "Risk & Fraud",
    description: "Build ML models for fraud detection and risk assessment. Work on anomaly detection, real-time scoring systems, and explainable AI.",
    requirements: [
      "Master's student in Computer Science, Statistics, or AI",
      "Strong foundation in machine learning and statistics",
      "Experience with Python, scikit-learn, and data analysis",
      "Knowledge of anomaly detection and classification",
      "Familiarity with SQL and big data processing",
      "Interest in fintech and financial crime prevention"
    ],
    skills: ["Python", "Machine Learning", "Statistics", "Anomaly Detection", "SQL", "Scikit-learn", "Classification", "Risk Modeling", "Big Data"],
    duration: "6 months",
    startDate: "ASAP",
    type: "Internship",
    industry: "Fintech",
    focus: "Fraud Detection",
    applicationUrl: "https://n26.com/careers"
  },
  {
    id: "telekom-ai-007",
    company: "Deutsche Telekom",
    location: "Bonn/Berlin, Germany",
    title: "GenAI Intern - Customer Experience",
    department: "AI & Automation",
    description: "Develop GenAI-powered chatbots and virtual assistants for customer service. Work on conversational AI, intent recognition, and knowledge bases.",
    requirements: [
      "Master's student in Computer Science, AI, or NLP",
      "Experience with Python and NLP libraries",
      "Knowledge of LLMs, prompt engineering, and RAG",
      "Familiarity with LangChain, LlamaIndex, or similar",
      "Understanding of conversational AI and chatbots",
      "German language skills are a plus"
    ],
    skills: ["Python", "NLP", "LLMs", "RAG", "LangChain", "Chatbots", "Prompt Engineering", "Conversational AI", "LlamaIndex"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Mandatory Internship",
    industry: "Telecommunications",
    focus: "Conversational AI",
    applicationUrl: "https://jobs.deutschetelekom.de"
  },
  {
    id: "allianz-ai-008",
    company: "Allianz",
    location: "Munich, Germany",
    title: "AI Intern - Insurance Technology",
    department: "AI Center of Excellence",
    description: "Apply AI to insurance processes: claims automation, document processing, risk assessment, and customer analytics.",
    requirements: [
      "Master's student in Computer Science, Data Science, or AI",
      "Strong Python and machine learning skills",
      "Experience with NLP and document understanding",
      "Knowledge of computer vision for document processing",
      "Familiarity with cloud platforms (Azure preferred)",
      "Interest in insurance and financial services"
    ],
    skills: ["Python", "NLP", "Computer Vision", "Document Processing", "Machine Learning", "Azure", "OCR", "Classification", "Data Science"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Internship",
    industry: "Insurance & Financial Services",
    focus: "Document AI",
    applicationUrl: "https://www.allianz.com/careers"
  },
  {
    id: "deepl-ai-009",
    company: "DeepL",
    location: "Cologne, Germany",
    title: "Machine Learning Intern - Translation AI",
    department: "Machine Translation",
    description: "Work on state-of-the-art neural machine translation. Research and develop transformer models for multilingual translation.",
    requirements: [
      "Master's or PhD student in Computer Science, NLP, or AI",
      "Deep knowledge of deep learning and transformers",
      "Experience with PyTorch and large-scale training",
      "Strong background in NLP and sequence modeling",
      "Understanding of attention mechanisms and language models",
      "Publication experience is a plus"
    ],
    skills: ["PyTorch", "NLP", "Transformers", "Deep Learning", "Machine Translation", "Sequence Modeling", "Attention", "Language Models"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Research Internship",
    industry: "AI & Language Technology",
    focus: "Machine Translation",
    applicationUrl: "https://www.deepl.com/careers"
  },
  {
    id: "biontech-ai-010",
    company: "BioNTech",
    location: "Mainz, Germany",
    title: "AI/ML Intern - Biomedical Research",
    department: "Computational Biology",
    description: "Apply AI to drug discovery and biomedical research. Work on protein structure prediction, genomics, and clinical data analysis.",
    requirements: [
      "Master's or PhD student in Bioinformatics, Computer Science, or AI",
      "Strong Python and machine learning skills",
      "Knowledge of deep learning for biological data",
      "Experience with PyTorch or TensorFlow",
      "Understanding of bioinformatics and genomics",
      "Interest in healthcare and drug discovery"
    ],
    skills: ["Python", "PyTorch", "Deep Learning", "Bioinformatics", "Genomics", "Data Science", "Scientific Computing", "Biomedical AI"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Research Internship",
    industry: "Biotechnology & Pharma",
    focus: "Biomedical AI",
    applicationUrl: "https://www.biontech.de/careers"
  },
  {
    id: "celonis-ai-011",
    company: "Celonis",
    location: "Munich, Germany",
    title: "AI Intern - Process Mining & Automation",
    department: "AI & Data Science",
    description: "Develop AI solutions for process mining and business process automation. Work on anomaly detection, process optimization, and predictive analytics.",
    requirements: [
      "Master's student in Computer Science, Data Science, or AI",
      "Strong Python and data analysis skills",
      "Experience with machine learning and statistical modeling",
      "Knowledge of process mining or graph algorithms",
      "Familiarity with SQL and data visualization",
      "Interest in business process optimization"
    ],
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Process Mining", "Graph Algorithms", "Statistics", "Pandas", "Data Visualization"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Internship",
    industry: "Enterprise Software",
    focus: "Process Mining AI",
    applicationUrl: "https://www.celonis.com/careers"
  },
  {
    id: "deliveryhero-ai-012",
    company: "Delivery Hero",
    location: "Berlin, Germany",
    title: "ML Engineer Intern - Recommendation Systems",
    department: "Personalization & Search",
    description: "Build ML models for food delivery recommendations. Work on personalization, search ranking, and demand forecasting.",
    requirements: [
      "Master's student in Computer Science, Data Science, or AI",
      "Strong Python and machine learning skills",
      "Experience with recommendation systems or search",
      "Knowledge of A/B testing and experimentation",
      "Familiarity with big data technologies (Spark, etc.)",
      "Interest in e-commerce and logistics"
    ],
    skills: ["Python", "Machine Learning", "Recommendation Systems", "Search", "A/B Testing", "Spark", "Big Data", "Personalization", "Ranking"],
    duration: "6 months",
    startDate: "ASAP",
    type: "Internship",
    industry: "Food Delivery & E-commerce",
    focus: "Recommendation Systems",
    applicationUrl: "https://www.deliveryhero.com/careers"
  },
  {
    id: "dfki-ai-013",
    company: "DFKI (German Research Center for AI)",
    location: "Saarbrücken/Kaiserslautern",
    title: "Research Intern - Foundation Models",
    department: "Intelligent Agent Systems",
    description: "Research on foundation models, multi-modal AI, and AI agents. Contribute to cutting-edge AI research and publications.",
    requirements: [
      "Master's or PhD student in Computer Science or AI",
      "Strong theoretical foundation in machine learning",
      "Experience with deep learning and transformers",
      "Publication record or research experience",
      "Proficiency in PyTorch and research code",
      "Interest in academic research and papers"
    ],
    skills: ["PyTorch", "Deep Learning", "Transformers", "Foundation Models", "Research", "Multi-modal AI", "AI Agents", "Paper Writing"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Research Internship",
    industry: "Research Institute",
    focus: "Foundation Models",
    applicationUrl: "https://www.dfki.de/careers"
  },
  {
    id: "airbus-ai-014",
    company: "Airbus",
    location: "Hamburg, Germany",
    title: "AI Intern - Aerospace & Defense",
    department: "Digital & AI",
    description: "Apply AI to aerospace: predictive maintenance, satellite imagery analysis, autonomous systems, and manufacturing optimization.",
    requirements: [
      "Master's student in Computer Science, Engineering, or AI",
      "Strong Python and machine learning skills",
      "Experience with computer vision or time series",
      "Knowledge of deep learning frameworks",
      "Familiarity with cloud platforms and MLOps",
      "Interest in aerospace and defense industry"
    ],
    skills: ["Python", "Computer Vision", "Deep Learning", "Time Series", "PyTorch", "Cloud", "MLOps", "Satellite Imagery", "Predictive Maintenance"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Mandatory Internship",
    industry: "Aerospace & Defense",
    focus: "Aerospace AI",
    applicationUrl: "https://www.airbus.com/careers"
  },
  {
    id: "personio-ai-015",
    company: "Personio",
    location: "Munich, Germany",
    title: "AI Intern - HR Technology",
    department: "AI & Automation",
    description: "Build AI features for HR software: resume parsing, job matching, employee analytics, and conversational HR assistants.",
    requirements: [
      "Master's student in Computer Science, NLP, or AI",
      "Strong Python and NLP skills",
      "Experience with LLMs and text processing",
      "Knowledge of machine learning and data science",
      "Familiarity with cloud platforms and APIs",
      "Interest in HR tech and people analytics"
    ],
    skills: ["Python", "NLP", "LLMs", "Text Processing", "Machine Learning", "APIs", "Cloud", "Data Science", "Conversational AI"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Internship",
    industry: "HR Technology",
    focus: "HR AI",
    applicationUrl: "https://www.personio.com/careers"
  },
  {
    id: "mercedes-ai-016",
    company: "Mercedes-Benz",
    location: "Stuttgart, Germany",
    title: "ML Engineering Intern - Autonomous Driving",
    department: "Automated Driving",
    description: "Develop ML models for autonomous driving. Work on perception, planning, sensor fusion, and simulation.",
    requirements: [
      "Master's or PhD student in Computer Science, Robotics, or AI",
      "Deep knowledge of computer vision and deep learning",
      "Experience with PyTorch and large-scale training",
      "Knowledge of 3D perception, point clouds, or SLAM",
      "Familiarity with ROS or autonomous driving systems",
      "Strong C++ and Python skills"
    ],
    skills: ["PyTorch", "Computer Vision", "Deep Learning", "3D Perception", "C++", "Python", "ROS", "Sensor Fusion", "Autonomous Driving"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Mandatory Internship",
    industry: "Automotive",
    focus: "Autonomous Driving",
    applicationUrl: "https://www.mercedes-benz.com/careers"
  },
  {
    id: "bayer-ai-017",
    company: "Bayer",
    location: "Leverkusen, Germany",
    title: "AI Intern - Pharmaceutical Research",
    department: "Data Science & AI",
    description: "Apply AI to drug discovery and clinical research. Work on molecular modeling, clinical trial optimization, and medical imaging.",
    requirements: [
      "Master's or PhD student in Bioinformatics, Chemistry, or AI",
      "Strong Python and machine learning skills",
      "Experience with deep learning for scientific data",
      "Knowledge of cheminformatics or bioinformatics",
      "Familiarity with molecular modeling or medical imaging",
      "Interest in pharmaceutical research"
    ],
    skills: ["Python", "Deep Learning", "Bioinformatics", "Molecular Modeling", "Medical Imaging", "Data Science", "Scientific Computing", "Cheminformatics"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Research Internship",
    industry: "Pharmaceuticals",
    focus: "Drug Discovery AI",
    applicationUrl: "https://www.bayer.com/careers"
  },
  {
    id: "trivago-ai-018",
    company: "trivago",
    location: "Düsseldorf, Germany",
    title: "ML Intern - Search & Personalization",
    department: "Machine Learning",
    description: "Build ML models for hotel search and personalization. Work on ranking algorithms, recommendation systems, and user behavior modeling.",
    requirements: [
      "Master's student in Computer Science, Data Science, or AI",
      "Strong Python and machine learning skills",
      "Experience with search, ranking, or recommendations",
      "Knowledge of A/B testing and experimentation",
      "Familiarity with big data and SQL",
      "Interest in travel tech and e-commerce"
    ],
    skills: ["Python", "Machine Learning", "Search", "Ranking", "Recommendations", "A/B Testing", "SQL", "Big Data", "Personalization"],
    duration: "6 months",
    startDate: "ASAP",
    type: "Internship",
    industry: "Travel & E-commerce",
    focus: "Search & Ranking",
    applicationUrl: "https://www.trivago.com/careers"
  },
  {
    id: "db-ai-019",
    company: "Deutsche Bahn",
    location: "Berlin, Germany",
    title: "AI Intern - Mobility & Transportation",
    department: "Digitalization & AI",
    description: "Apply AI to railway operations: predictive maintenance, delay prediction, route optimization, and passenger flow analysis.",
    requirements: [
      "Master's student in Computer Science, Engineering, or AI",
      "Strong Python and data science skills",
      "Experience with time series and predictive modeling",
      "Knowledge of machine learning and optimization",
      "Familiarity with geospatial data or IoT",
      "Interest in transportation and mobility"
    ],
    skills: ["Python", "Time Series", "Predictive Modeling", "Machine Learning", "Optimization", "Geospatial", "IoT", "Data Science", "Pandas"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Mandatory Internship",
    industry: "Transportation",
    focus: "Mobility AI",
    applicationUrl: "https://www.deutschebahn.com/careers"
  },
  {
    id: "fraunhofer-ai-020",
    company: "Fraunhofer IAIS",
    location: "Sankt Augustin, Germany",
    title: "Research Intern - Applied AI",
    department: "Machine Learning & Analytics",
    description: "Research on applied AI: explainable AI, federated learning, trustworthy AI, and industry applications.",
    requirements: [
      "Master's or PhD student in Computer Science or AI",
      "Strong theoretical and practical ML background",
      "Experience with PyTorch and research projects",
      "Knowledge of explainable AI or federated learning",
      "Publication experience is a plus",
      "Interest in applied research and industry projects"
    ],
    skills: ["PyTorch", "Machine Learning", "Explainable AI", "Federated Learning", "Research", "Deep Learning", "Trustworthy AI", "Python"],
    duration: "6 months",
    startDate: "Flexible",
    type: "Research Internship",
    industry: "Research Institute",
    focus: "Applied AI Research",
    applicationUrl: "https://www.fraunhofer.de/careers"
  }
];
