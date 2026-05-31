import type { Internship } from "../data/internships";

export interface UserProfile {
  name: string;
  university: string;
  program: string;
  skills: string[];
  experience: string;
  projects: string;
  languages: string[];
  startDate: string;
}

const openingVariants = [
  (company: string, title: string) =>
    `I am writing to express my strong interest in the "${title}" position at ${company}. As a Master's student deeply passionate about AI and machine learning, I believe my skills and experiences align closely with your team's mission.`,
  (company: string, title: string) =>
    `With great enthusiasm, I am applying for the "${title}" role at ${company}. My academic background in AI, combined with hands-on project experience, has prepared me to contribute meaningfully to your innovative work.`,
  (company: string, title: string) =>
    `I am excited to apply for the "${title}" position at ${company}. Having followed ${company}'s contributions to the field, I am eager to bring my technical skills and research mindset to your team.`,
];

const closingVariants = [
  `I would welcome the opportunity to discuss how my background can contribute to your team. Thank you for considering my application. I look forward to hearing from you.`,
  `I am eager to bring my enthusiasm and technical skills to your team. Thank you for your time and consideration. I look forward to the possibility of contributing to your work.`,
  `I would be thrilled to contribute to your innovative projects and learn from your experienced team. Thank you for considering my application.`,
];

export function generateCoverLetter(
  profile: UserProfile,
  internship: Internship,
  matchedSkills: string[],
  variant: number = 0
): string {
  const idx = variant % openingVariants.length;
  const opening = openingVariants[idx](internship.company, internship.title);
  const closing = closingVariants[idx];

  const skillPhrase =
    matchedSkills.length > 0
      ? `My hands-on experience with ${matchedSkills.slice(0, 4).join(", ")} directly addresses the technical requirements of this role`
      : `While my background spans a broad set of AI fundamentals, I am confident I can quickly adapt to the tools used in your team`;

  const focusPhrase = internship.focus
    ? `I am particularly drawn to your work in ${internship.focus.toLowerCase()}`
    : `I am particularly drawn to the opportunity to work at the intersection of AI and industry`;

  const letter = `Dear Hiring Manager,

${opening}

I am currently pursuing my Master's degree in ${profile.program || "Artificial Intelligence"} at ${profile.university || "my university"}, where I have built a solid foundation in machine learning, deep learning, and applied AI. ${focusPhrase}, and ${internship.company}'s reputation as a leader in ${internship.industry.toLowerCase()} makes this internship especially compelling.

${skillPhrase}. ${
    profile.projects
      ? `Through projects such as ${profile.projects}, I have developed practical skills in building end-to-end AI solutions — from data preprocessing to model deployment.`
      : `Through academic and personal projects, I have developed practical skills in building end-to-end AI solutions.`
  }

${
    profile.experience
      ? profile.experience
      : "I bring strong analytical thinking, a collaborative mindset, and a genuine curiosity for emerging AI technologies."
  }

${
    profile.languages.length > 0
      ? `I am fluent in ${profile.languages.join(" and ")}, which I believe will help me collaborate effectively within your international team.`
      : "I am comfortable working in international, English-speaking environments."
  } I am available to start ${profile.startDate || "flexibly"} and am committed to contributing fully throughout the internship.

${closing}

Sincerely,
${profile.name || "[Your Name]"}`;

  return letter;
}
