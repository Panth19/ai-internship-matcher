import { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Building2,
  Briefcase,
  Copy,
  Download,
  RefreshCw,
  TrendingUp,
  Target,
  Loader2,
  GraduationCap,
  Code2,
  BrainCircuit,
  ExternalLink,
  ChevronDown,
  FileText,
  Zap,
  Info,
} from "lucide-react";
import { internships, type Internship } from "./data/internships";
import { getEmbedding, cosineSimilarity } from "./services/embeddings";
import { generateCoverLetter, type UserProfile } from "./services/coverLetter";
import { fetchAllJobs } from "./services/jobApis";

interface MatchResult {
  internship: Internship;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export default function App() {
  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    university: "BTU Cottbus-Senftenberg",
    program: "Artificial Intelligence",
    skills: [],
    experience: "",
    projects: "",
    languages: ["English"],
    startDate: "",
  });
  const [skillsInput, setSkillsInput] = useState(
    "Python, PyTorch, TensorFlow, scikit-learn, NLP, Transformers, LangChain, RAG, Hugging Face, SQL, Docker, LLMs, Prompt Engineering, Vector Databases, Computer Vision"
  );
  const [freeTextProfile, setFreeTextProfile] = useState(
    "Master's student in Artificial Intelligence at BTU Cottbus. Built a RAG chatbot using LangChain and ChromaDB for answering questions from university PDFs. Implemented a sentiment analysis model with PyTorch. Familiar with deploying ML models on AWS and using Docker for containerization."
  );

  // Matching state
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const [modelLoading, setModelLoading] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);
  const [coverLetterVariant, setCoverLetterVariant] = useState(0);
  const [copied, setCopied] = useState(false);
  const [useRealJobs, setUseRealJobs] = useState(false);
  const [realJobs, setRealJobs] = useState<Internship[]>([]);
  const [loadingRealJobs, setLoadingRealJobs] = useState(false);

  // Parse skills from input
  const parsedSkills = useMemo(
    () =>
      skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [skillsInput]
  );

  // Load real jobs from APIs
  useEffect(() => {
    if (useRealJobs && realJobs.length === 0) {
      setLoadingRealJobs(true);
      fetchAllJobs()
        .then((jobs) => {
          setRealJobs(jobs);
        })
        .catch((err) => {
          console.error("Failed to load real jobs:", err);
          alert("Could not load real jobs from APIs. Using curated list instead.");
          setUseRealJobs(false);
        })
        .finally(() => setLoadingRealJobs(false));
    }
  }, [useRealJobs]);

  // Run matching
  async function runMatch() {
    setIsMatching(true);
    setModelLoading(true);
    setModelProgress(0);
    setMatches([]);
    setSelectedMatch(null);

    try {
      // Use real jobs or curated list
      const jobsToMatch = useRealJobs && realJobs.length > 0 ? realJobs : internships;

      // Build a composite profile text
      const profileText = [
        `Skills: ${parsedSkills.join(", ")}`,
        freeTextProfile,
        `Program: ${profile.program} at ${profile.university}`,
      ].join(". ");

      // Get embedding for user profile (loads model if first time)
      const profileEmbedding = await getEmbedding(profileText, (p) => {
        setModelProgress(p * 0.5);
      });

      setModelLoading(false);

      // Get embeddings for all internships and compute similarity
      const results: MatchResult[] = [];
      for (let i = 0; i < jobsToMatch.length; i++) {
        const job = jobsToMatch[i];
        const jobText = [
          job.title,
          job.description,
          `Required skills: ${job.skills.join(", ")}`,
          `Requirements: ${job.requirements.join(". ")}`,
          `Focus: ${job.focus}`,
        ].join(". ");

        const jobEmbedding = await getEmbedding(jobText);
        const score = cosineSimilarity(profileEmbedding, jobEmbedding);

        // Find matching skills
        const userSkillsLower = parsedSkills.map((s) => s.toLowerCase());
        const matchedSkills = job.skills.filter((js) =>
          userSkillsLower.some(
            (us) => us.includes(js.toLowerCase()) || js.toLowerCase().includes(us)
          )
        );
        const missingSkills = job.skills.filter((js) => !matchedSkills.includes(js));

        results.push({
          internship: job,
          score,
          matchedSkills,
          missingSkills: missingSkills.slice(0, 5),
        });

        setModelProgress(50 + ((i + 1) / jobsToMatch.length) * 50);
      }

      // Sort by score descending
      results.sort((a, b) => b.score - a.score);
      setMatches(results);
      setSelectedMatch(results[0]);
      setHasMatched(true);
    } catch (err) {
      console.error("Matching failed:", err);
      alert("Matching failed. Please check the console for details.");
    } finally {
      setIsMatching(false);
      setModelLoading(false);
      setModelProgress(100);
    }
  }

  // Generate cover letter
  const coverLetter = useMemo(() => {
    if (!selectedMatch) return "";
    const userProfile = {
      ...profile,
      skills: parsedSkills,
    };
    return generateCoverLetter(
      userProfile,
      selectedMatch.internship,
      selectedMatch.matchedSkills,
      coverLetterVariant
    );
  }, [selectedMatch, profile, parsedSkills, coverLetterVariant]);

  // Copy to clipboard
  async function copyCoverLetter() {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Download as text
  function downloadCoverLetter() {
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${selectedMatch?.internship.company.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Score color helper
  function getScoreColor(score: number) {
    const normalized = (score - 0.3) / 0.4; // normalize roughly to 0-1
    if (normalized > 0.7) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (normalized > 0.4) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-slate-500 bg-slate-50 border-slate-200";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  German AI Internship Matcher
                </h1>
                <p className="text-xs text-slate-500">
                  Semantic matching with Transformers.js · 100% in-browser AI
                </p>
              </div>
            </div>
            <a
              href="https://github.com/Panth19/ai-internship-matcher"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View Source</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            Built for BTU Cottbus AI Master's Students
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Find your perfect{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              GenAI internship
            </span>{" "}
            in Germany & Europe
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Enter your skills and let our in-browser AI match you to real internship
            opportunities from JustJoinIT, GitHub Jobs, Remotive, and curated roles at SAP, Siemens, Bosch, BMW, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* LEFT COLUMN - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Source Toggle */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Job Source</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-indigo-200 bg-indigo-50 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useRealJobs}
                    onChange={() => setUseRealJobs(false)}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-medium text-slate-900">Curated List</div>
                    <div className="text-xs text-slate-600">20 hand-picked German companies</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 cursor-pointer hover:border-indigo-200">
                  <input
                    type="radio"
                    checked={useRealJobs}
                    onChange={() => setUseRealJobs(true)}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-medium text-slate-900">Real-Time APIs</div>
                    <div className="text-xs text-slate-600">JustJoinIT, GitHub Jobs, Remotive</div>
                  </div>
                </label>
              </div>
              {useRealJobs && loadingRealJobs && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                  <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                  Loading real jobs...
                </div>
              )}
              {useRealJobs && realJobs.length > 0 && (
                <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
                  ✓ Loaded {realJobs.length} real internships
                </div>
              )}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">Your Profile</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    placeholder="Max Mustermann"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={profile.university}
                      onChange={(e) =>
                        setProfile({ ...profile, university: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Program
                    </label>
                    <input
                      type="text"
                      value={profile.program}
                      onChange={(e) =>
                        setProfile({ ...profile, program: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Available Start Date
                  </label>
                  <input
                    type="text"
                    value={profile.startDate}
                    onChange={(e) =>
                      setProfile({ ...profile, startDate: e.target.value })
                    }
                    placeholder="e.g., April 2026"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">Skills</h3>
                <span className="ml-auto text-xs text-slate-500">
                  comma-separated
                </span>
              </div>
              <textarea
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                placeholder="Python, PyTorch, LangChain, RAG..."
              />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {parsedSkills.slice(0, 8).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {parsedSkills.length > 8 && (
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                    +{parsedSkills.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">
                  Experience & Projects
                </h3>
              </div>
              <textarea
                value={freeTextProfile}
                onChange={(e) => setFreeTextProfile(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                placeholder="Describe your projects, experience, and interests..."
              />
            </div>

            {/* Match Button */}
            <button
              onClick={runMatch}
              disabled={isMatching || (useRealJobs && loadingRealJobs)}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isMatching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {modelLoading
                    ? `Loading AI model (${Math.round(modelProgress)}%)...`
                    : `Matching (${Math.round(modelProgress)}%)...`}
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  {hasMatched ? "Re-run Match" : "Find My Matches"}
                </>
              )}
            </button>

            {isMatching && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">First run downloads ~90 MB</p>
                    <p>
                      The all-MiniLM-L6-v2 embedding model is loaded once and cached
                      in your browser. Everything runs 100% locally — your data never
                      leaves your device.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Results */}
          <div className="lg:col-span-3 space-y-6">
            {!hasMatched ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Ready to match?
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
                  Fill in your profile on the left and click "Find My Matches". Our AI
                  will analyze semantic similarity between your profile and real internship opportunities.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <BrainCircuit className="w-5 h-5 text-indigo-600 mb-2" />
                    <h4 className="font-medium text-sm text-slate-900">
                      Semantic AI
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Uses transformer embeddings, not keyword matching
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <Zap className="w-5 h-5 text-indigo-600 mb-2" />
                    <h4 className="font-medium text-sm text-slate-900">
                      In-Browser
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      All AI runs locally via Transformers.js — fully private
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-600 mb-2" />
                    <h4 className="font-medium text-sm text-slate-900">
                      Apply Now
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Direct links to real job postings
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Top Match Highlight */}
                {selectedMatch && (
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-medium uppercase tracking-wide opacity-90">
                            Top Match
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">
                          {selectedMatch.internship.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm opacity-90 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {selectedMatch.internship.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {selectedMatch.internship.location}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
                        <div className="text-2xl font-bold">
                          {Math.round(selectedMatch.score * 100)}%
                        </div>
                        <div className="text-xs opacity-80">Match Score</div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wide opacity-80 mb-2">
                          Your Matching Skills
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedMatch.matchedSkills.map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 rounded text-xs"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wide opacity-80 mb-2">
                          Skills to Learn
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedMatch.missingSkills.map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-white/10 text-white/90 border border-white/20 rounded text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm mb-4">
                      {selectedMatch.internship.description}
                    </div>

                    {selectedMatch.internship.applicationUrl && (
                      <a
                        href={selectedMatch.internship.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </a>
                    )}
                  </div>
                )}

                {/* All Matches */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">
                      All Matches ({matches.length})
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <TrendingUp className="w-3 h-3" />
                      Sorted by semantic similarity
                    </div>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {matches.map((m, i) => (
                      <div key={m.internship.id}>
                        <button
                          onClick={() => {
                            setSelectedMatch(m);
                            setCoverLetterVariant(0);
                          }}
                          className={`w-full text-left p-3 rounded-lg border transition ${
                            selectedMatch?.internship.id === m.internship.id
                              ? "border-indigo-400 bg-indigo-50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                              #{i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-0.5">
                                <h4 className="font-medium text-sm text-slate-900 truncate">
                                  {m.internship.title}
                                </h4>
                                <span
                                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${getScoreColor(m.score)}`}
                                >
                                  {Math.round(m.score * 100)}%
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
                                <span>{m.internship.company}</span>
                                <span>·</span>
                                <span>{m.internship.location}</span>
                                <span className="hidden sm:inline">·</span>
                                <span className="hidden sm:inline">
                                  {m.matchedSkills.length} skills match
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                        {selectedMatch?.internship.id === m.internship.id &&
                          m.internship.applicationUrl && (
                            <a
                              href={m.internship.applicationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 ml-11 flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded transition"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Apply Now
                            </a>
                          )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cover Letter */}
                {selectedMatch && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-slate-900">
                          Cover Letter for {selectedMatch.internship.company}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setCoverLetterVariant((v) => v + 1)
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Regenerate
                        </button>
                        <button
                          onClick={copyCoverLetter}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={downloadCoverLetter}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto border border-slate-200">
                      {coverLetter}
                    </pre>
                    <p className="text-xs text-slate-500 mt-3">
                      💡 Tip: Use this as a starting point and personalize it further
                      with specific projects and motivations.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Tech Stack Info - always shown at bottom */}
            <details className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 group">
              <summary className="cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-900">
                    Tech Stack & Why It Was Chosen
                  </h3>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition" />
              </summary>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      🤖 Transformers.js
                    </div>
                    <p className="text-xs text-slate-600">
                      Runs Hugging Face models directly in the browser via WebAssembly
                      / ONNX. <b>Why:</b> Zero API costs, no backend needed, fully
                      private, demonstrates in-browser ML — a skill German companies
                      love.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      📊 all-MiniLM-L6-v2
                    </div>
                    <p className="text-xs text-slate-600">
                      384-dim sentence embeddings, ~90 MB. <b>Why:</b> State-of-the-art
                      semantic similarity, same architecture used in production RAG
                      systems at SAP, Siemens, etc.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      ⚛️ React + Vite + TS
                    </div>
                    <p className="text-xs text-slate-600">
                      Modern, fast, type-safe frontend. <b>Why:</b> Industry standard,
                      shows software engineering rigor beyond ML.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      🎨 Tailwind CSS
                    </div>
                    <p className="text-xs text-slate-600">
                      Utility-first styling. <b>Why:</b> Rapid, consistent UI without
                      heavy design overhead.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      📈 Cosine Similarity
                    </div>
                    <p className="text-xs text-slate-600">
                      Math-based ranking on normalized embeddings. <b>Why:</b> Core
                      technique in RAG and vector search — directly maps to skills
                      German JDs list.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      🚀 Deploy Free
                    </div>
                    <p className="text-xs text-slate-600">
                      Static site → host on Vercel / Netlify / GitHub Pages for free.{" "}
                      <b>Why:</b> Recruiters can test the live link instantly.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-1">
                      🔗 Real Job APIs
                    </div>
                    <p className="text-xs text-slate-600">
                      JustJoinIT, GitHub Jobs, Remotive. <b>Why:</b> Real, live job
                      postings with application links. No scraping, fully legal & free.
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
                  <p className="text-xs text-indigo-900">
                    <b>💡 Recruiter talking point:</b> "I built an app that runs a
                    transformer model entirely in the browser, uses semantic embeddings
                    for ranking (same principle as RAG), integrates real job APIs for
                    live internship data, and solves my own real problem of finding
                    internships. Here's the live link."
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Built by an AI Master's student at BTU Cottbus-Senftenberg · Uses real job APIs
          (JustJoinIT, GitHub Jobs, Remotive) + curated 2026 internship data · AI runs 100% in
          your browser · All free, forever
        </div>
      </footer>
    </div>
  );
}
