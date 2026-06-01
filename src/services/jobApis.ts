import { Internship } from "../data/internships";

// JustJoinIT API - Polish/EU tech jobs
export async function fetchJustJoinITJobs(): Promise<Internship[]> {
  try {
    const response = await fetch(
      "https://api.justjoinit.eu/v2/postings?orderBy=newest&limit=50&experience_level=trainee,junior"
    );
    if (!response.ok) throw new Error("JustJoinIT API failed");

    const data = await response.json();
    return (data.data || []).map((job: any, index: number) => ({
      id: `justjoinit-${job.id || index}`,
      company: job.company_name || "Unknown",
      location: job.city || "Remote",
      title: job.title || "Tech Position",
      department: job.work_type?.[0] || "Engineering",
      description: job.description || job.title || "Tech internship opportunity",
      requirements: job.requirements || [],
      skills: extractSkills(job.description || ""),
      duration: "3-6 months",
      startDate: "ASAP",
      type: "Internship",
      industry: "Technology",
      focus: "General Tech",
      applicationUrl: job.url || "",
    }));
  } catch (error) {
    console.error("JustJoinIT fetch error:", error);
    return [];
  }
}

// GitHub Jobs API - Tech internships
export async function fetchGitHubJobs(): Promise<Internship[]> {
  try {
    const response = await fetch(
      "https://jobs.github.com/positions.json?description=internship&full_time=false"
    );
    if (!response.ok) throw new Error("GitHub Jobs API failed");

    const data = await response.json();
    return (data || []).map((job: any, index: number) => ({
      id: `github-${job.id || index}`,
      company: job.company || "Unknown",
      location: job.location || "Remote",
      title: job.title || "Tech Internship",
      department: "Engineering",
      description: job.description || job.title || "Tech internship",
      requirements: [],
      skills: extractSkills(job.description || ""),
      duration: "3-6 months",
      startDate: "ASAP",
      type: "Internship",
      industry: "Technology",
      focus: "Software Development",
      applicationUrl: job.url || "",
    }));
  } catch (error) {
    console.error("GitHub Jobs fetch error:", error);
    return [];
  }
}

// Remotive API - Remote + on-site jobs
export async function fetchRemotiveJobs(): Promise<Internship[]> {
  try {
    const response = await fetch(
      "https://remotive.com/api/remote-jobs?category=software-dev&limit=50"
    );
    if (!response.ok) throw new Error("Remotive API failed");

    const data = await response.json();
    return (data.jobs || []).map((job: any, index: number) => ({
      id: `remotive-${job.id || index}`,
      company: job.company_name || "Unknown",
      location: job.job_type === "remote" ? "Remote" : job.job_location || "Remote",
      title: job.title || "Tech Position",
      department: "Engineering",
      description: job.description || job.title || "Internship opportunity",
      requirements: [],
      skills: extractSkills(job.description || ""),
      duration: "3-6 months",
      startDate: "ASAP",
      type: "Internship",
      industry: "Technology",
      focus: job.category || "General Tech",
      applicationUrl: job.url || "",
    }));
  } catch (error) {
    console.error("Remotive fetch error:", error);
    return [];
  }
}

// Helper function to extract skills from job description
function extractSkills(text: string): string[] {
  const skillKeywords = [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Vue",
    "Angular",
    "Django",
    "FastAPI",
    "Spring",
    "Java",
    "C++",
    "Go",
    "Rust",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "REST API",
    "GraphQL",
    "Machine Learning",
    "AI",
    "Deep Learning",
    "PyTorch",
    "TensorFlow",
    "NLP",
    "Computer Vision",
    "LLMs",
    "RAG",
    "LangChain",
    "Transformers",
  ];

  const found = new Set<string>();
  const lowerText = text.toLowerCase();

  for (const skill of skillKeywords) {
    if (lowerText.includes(skill.toLowerCase())) {
      found.add(skill);
    }
  }

  return Array.from(found);
}

// Fetch all jobs from all APIs
export async function fetchAllJobs(): Promise<Internship[]> {
  const [justjoinit, github, remotive] = await Promise.all([
    fetchJustJoinITJobs(),
    fetchGitHubJobs(),
    fetchRemotiveJobs(),
  ]);

  // Combine and deduplicate by company + title + location
  const allJobs = [...justjoinit, ...github, ...remotive];
  const seen = new Set<string>();
  const unique: Internship[] = [];

  for (const job of allJobs) {
    const key = `${job.company}-${job.title}-${job.location}`.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(job);
    }
  }

  // Prioritize jobs with application URLs
  return unique.sort((jobA, jobB) => {
    const aHasUrl = jobA.applicationUrl ? 1 : 0;
    const bHasUrl = jobB.applicationUrl ? 1 : 0;
    return bHasUrl - aHasUrl;
  });
}
