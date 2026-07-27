import type { DeveloperProfile } from '../types/profile';

export interface ProfileJudgeResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  headlineRoast: string;
  roasts: string[];
  impressiveTips: string[];
  scores: {
    bio: number;
    activity: number;
    repositories: number;
    social: number;
  };
}

export function judgeProfile(profile: DeveloperProfile): ProfileJudgeResult {
  const roasts: string[] = [];
  const impressiveTips: string[] = [];

  let bioScore = 25;
  let activityScore = 25;
  let repoScore = 25;
  let socialScore = 25;

  // 1. Evaluate Bio & Identity
  if (!profile.bio) {
    bioScore = 5;
    roasts.push("👻 Ghost Bio: You left your bio completely empty. Are you in witness protection or just hiding bad code?");
    impressiveTips.push("Add a tagline with your core tech stack, e.g., 'Full-Stack Eng @Company | Building open source tools with React & Rust'");
  } else {
    const bioLen = profile.bio.length;
    if (bioLen < 15) {
      bioScore = 12;
      roasts.push(`🔍 Minimalist or Lazy? Your bio is "${profile.bio}". Very mysterious, but recruiters won't guess your stack.`);
      impressiveTips.push("Expand your bio to mention your current focus and target roles.");
    } else if (profile.bio.toLowerCase().includes('enthusiast') || profile.bio.toLowerCase().includes('aspiring')) {
      bioScore = 18;
      roasts.push("⚠️ Buzzword Alert: You used 'enthusiast' or 'aspiring'. Be confident! Replace buzzwords with concrete tech keywords.");
      impressiveTips.push("Replace 'Web Enthusiast' with explicit technologies like 'TypeScript, Node.js, Next.js, PostgreSQL'.");
    }
  }

  if (!profile.location) {
    bioScore = Math.max(0, bioScore - 5);
    roasts.push("📍 Lost in node_modules: No location set. Add your city/country so remote recruiters know your timezone.");
  }

  // 2. Evaluate Activity & Commits
  if (profile.totalCommits === 0) {
    activityScore = 0;
    roasts.push("💀 Dead Contribution Graph: 0 commits this year. Are you sure your git push command is working?");
    impressiveTips.push("Make at least 3-5 commits weekly on side projects or open-source issues to keep your contribution tiles active green!");
  } else if (profile.totalCommits < 50) {
    activityScore = 10;
    roasts.push(`🐢 Weekend Warrior: Only ${profile.totalCommits} commits. Looks like you push code once every lunar eclipse.`);
    impressiveTips.push("Break large monolithic PRs into smaller atomic commits to build consistency.");
  } else if (profile.totalCommits > 500) {
    activityScore = 25;
    roasts.push(`🔥 Commit Machine: ${profile.totalCommits} commits! Either you're a legend or you commit typos one line at a time.`);
  }

  // 3. Evaluate Repositories & Pinned Items
  const repos = profile.pinnedTrash || [];
  if (repos.length === 0) {
    repoScore = 5;
    roasts.push("📦 Hidden Inventory: No pinned repositories. Your profile front page looks like a ghost town.");
    impressiveTips.push("Pin 4-6 of your top repositories with clear descriptions, topics, and live demo URLs.");
  } else {
    const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
    const reposWithoutDesc = repos.filter(r => !r.description);
    
    if (reposWithoutDesc.length > 0) {
      repoScore -= 10;
      roasts.push(`🙈 Missing Descriptions: ${reposWithoutDesc.length} of your pinned repos have zero description.`);
      impressiveTips.push("Add a one-sentence description to every public repo on GitHub.");
    }
    
    if (totalStars === 0) {
      repoScore -= 10;
      roasts.push("⭐ Star Desert: 0 stars across your pinned repos. Add nice README headers so visitors actually star them.");
    }
  }

  // 4. Evaluate Social & Followers
  const followersCount = profile.followers || 0;
  if (followersCount === 0) {
    socialScore = 5;
    roasts.push("🦗 Echo Chamber: 0 followers. Not even your alt account follows you back yet.");
    impressiveTips.push("Follow active open-source contributors, write useful issue comments, and share your projects on X/LinkedIn.");
  } else if (followersCount < 10) {
    socialScore = 15;
    roasts.push(`🌱 Lurker Status: ${followersCount} followers. Time to share your projects in dev communities.`);
  }

  const totalScore = Math.min(100, Math.max(0, bioScore + activityScore + repoScore + socialScore));

  let grade: ProfileJudgeResult['grade'] = 'F';
  let headlineRoast = "Needs an emergency open-source makeover!";

  if (totalScore >= 90) {
    grade = 'A+';
    headlineRoast = "Absolute Open Source Legend! Impressive contribution record.";
  } else if (totalScore >= 80) {
    grade = 'A';
    headlineRoast = "Solid GitHub Profile! A few minor polishes will make it top 1%.";
  } else if (totalScore >= 65) {
    grade = 'B';
    headlineRoast = "Decent Developer Profile, but you're leaving star potential on the table.";
  } else if (totalScore >= 50) {
    grade = 'C';
    headlineRoast = "Average GitHub Lurker. Needs better pinned repos and an impressive README!";
  } else if (totalScore >= 35) {
    grade = 'D';
    headlineRoast = "Underwhelming. Your contribution graph is crying for attention.";
  }

  return {
    score: totalScore,
    grade,
    headlineRoast,
    roasts: roasts.length ? roasts : ["Your profile is dangerously clean... almost suspicious!"],
    impressiveTips: impressiveTips.length ? impressiveTips : ["Keep up your daily commit streaks and maintain your awesome repository READMEs!"],
    scores: {
      bio: Math.min(25, bioScore),
      activity: Math.min(25, activityScore),
      repositories: Math.min(25, repoScore),
      social: Math.min(25, socialScore)
    }
  };
}
