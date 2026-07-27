import type { DeveloperProfile } from '../types/profile';

export interface AuditItem {
  feature: string;
  status: 'passed' | 'missing' | 'warning';
  detail: string;
  roast: string;
}

export interface DeepProfileReview {
  completenessScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  verdictHeadline: string;
  savageRoasts: string[];
  whatIsMissing: AuditItem[];
  whatIsWorking: AuditItem[];
  actionableSteps: string[];
}

export function judgeProfileDeep(profile: DeveloperProfile): DeepProfileReview {
  const missingItems: AuditItem[] = [];
  const workingItems: AuditItem[] = [];
  const savageRoasts: string[] = [];
  const actionSteps: string[] = [];

  let score = 100;

  // 1. Profile Picture / Avatar
  if (!profile.avatarUrl || profile.avatarUrl.includes('gravatar') || profile.avatarUrl.includes('default')) {
    score -= 15;
    const item: AuditItem = {
      feature: 'Profile Picture / Avatar',
      status: 'missing',
      detail: 'Default or missing avatar image',
      roast: 'You look like a GitHub bot or a newly created spam account. Upload a real picture or developer avatar!'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Upload a clean developer profile picture or avatar icon.');
  } else {
    workingItems.push({
      feature: 'Profile Avatar',
      status: 'passed',
      detail: 'Custom profile picture set',
      roast: 'At least people know you exist and are not an automated bot.'
    });
  }

  // 2. Bio
  if (!profile.bio || profile.bio.trim().length === 0) {
    score -= 15;
    const item: AuditItem = {
      feature: 'Profile Bio',
      status: 'missing',
      detail: 'Bio is completely empty',
      roast: '0 words in your bio. Are you hiding in a detached HEAD state or just too lazy to write a single sentence?'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Write a 1-sentence bio mentioning your core technologies (e.g. "Full-stack developer building with React & Node.js").');
  } else if (profile.bio.length < 20) {
    score -= 8;
    const item: AuditItem = {
      feature: 'Profile Bio',
      status: 'warning',
      detail: `Too short ("${profile.bio}")`,
      roast: `Your bio "${profile.bio}" is shorter than a git commit message. Tell recruiters what you actually build!`
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Expand your bio with target frameworks or open-source interests.');
  } else {
    workingItems.push({
      feature: 'Profile Bio',
      status: 'passed',
      detail: `Bio defined ("${profile.bio.slice(0, 40)}...")`,
      roast: 'Your bio exists! Let’s hope it matches your actual code capability.'
    });
  }

  // 3. Location
  if (!profile.location || profile.location.trim().length === 0) {
    score -= 10;
    const item: AuditItem = {
      feature: 'Location Tag',
      status: 'missing',
      detail: 'No location set',
      roast: 'No location set. Do you live in node_modules? Remote recruiters won’t even know what timezone you operate in.'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Set your location or country in GitHub settings so recruiters can match timezones.');
  } else {
    workingItems.push({
      feature: 'Location Tag',
      status: 'passed',
      detail: `Located in ${profile.location}`,
      roast: `You pinned ${profile.location}. At least we know where your slow code originates from.`
    });
  }

  // 4. Blog / Portfolio / Website URL
  if (!profile.blog || profile.blog.trim().length === 0) {
    score -= 10;
    const item: AuditItem = {
      feature: 'Portfolio / Website URL',
      status: 'missing',
      detail: 'No external website or portfolio link',
      roast: 'No website or portfolio URL attached. Where are visitors supposed to see your live deployed projects?'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Link your personal portfolio, LinkedIn, or Twitter/X handle in your profile details.');
  } else {
    workingItems.push({
      feature: 'Portfolio Link',
      status: 'passed',
      detail: `Website set (${profile.blog})`,
      roast: 'Link attached. Hopefully it doesn’t lead to a 404 page.'
    });
  }

  // 5. Pinned Repositories
  const pinned = profile.pinnedTrash || [];
  if (pinned.length === 0) {
    score -= 20;
    const item: AuditItem = {
      feature: 'Pinned Repositories',
      status: 'missing',
      detail: '0 pinned repositories on front page',
      roast: 'Zero pinned repositories. Your front page is an empty wasteland. Are you hiding your code because you’re ashamed of it?'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Pin 4 to 6 of your best repositories on your profile main page.');
  } else if (pinned.length < 4) {
    score -= 8;
    const item: AuditItem = {
      feature: 'Pinned Repositories',
      status: 'warning',
      detail: `Only ${pinned.length} pinned repository(ies)`,
      roast: `Only ${pinned.length} repo(s) pinned. GitHub lets you pin up to 6! You're leaving valuable real estate empty.`
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Pin up to 6 showcase repositories.');
  } else {
    workingItems.push({
      feature: 'Pinned Repositories',
      status: 'passed',
      detail: `${pinned.length} showcase repositories pinned`,
      roast: 'Solid repository selection on your main profile view.'
    });
  }

  // 6. Repository Descriptions & Stars
  if (pinned.length > 0) {
    const unDescribed = pinned.filter(r => !r.description || r.description.trim().length === 0);
    if (unDescribed.length > 0) {
      score -= 10;
      const item: AuditItem = {
        feature: 'Repository Descriptions',
        status: 'missing',
        detail: `${unDescribed.length} pinned repo(s) missing descriptions`,
        roast: `${unDescribed.length} of your pinned repositories have NO description. People shouldn’t have to read your source code to guess what your project does.`
      };
      missingItems.push(item);
      savageRoasts.push(item.roast);
      actionSteps.push('Add short 1-line descriptions to all pinned GitHub repositories.');
    }

    const totalStars = pinned.reduce((acc, r) => acc + (r.stars || 0), 0);
    if (totalStars === 0) {
      score -= 10;
      const item: AuditItem = {
        feature: 'Star Power',
        status: 'missing',
        detail: '0 stars on pinned repositories',
        roast: '0 total stars on your pinned repos. Not even your friends or alt accounts starred your work.'
      };
      missingItems.push(item);
      savageRoasts.push(item.roast);
      actionSteps.push('Add clean README files with screenshots to entice stars from the community.');
    } else {
      workingItems.push({
        feature: 'Star Recognition',
        status: 'passed',
        detail: `${totalStars} stars across showcase repos`,
        roast: `${totalStars} star(s) collected! You’ve piqued some curiosity.`
      });
    }
  }

  // 7. Activity & Commits
  const commits = profile.totalCommits || 0;
  if (commits === 0) {
    score -= 20;
    const item: AuditItem = {
      feature: 'Annual Commit Activity',
      status: 'missing',
      detail: '0 commits recorded this year',
      roast: '0 commits this year. Did you forget your git password, or are you just spectating developer life?'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Start committing code regularly to build up green contribution graph tiles.');
  } else if (commits < 50) {
    score -= 10;
    const item: AuditItem = {
      feature: 'Commit Consistency',
      status: 'warning',
      detail: `Only ${commits} commits this year`,
      roast: `Only ${commits} commits. Your contribution graph has more grey squares than a crossword puzzle.`
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
  } else {
    workingItems.push({
      feature: 'Commit Activity',
      status: 'passed',
      detail: `${commits} commits recorded`,
      roast: `Active graph with ${commits} commits logged!`
    });
  }

  // 8. Open Source Contributions (PRs)
  const prs = profile.totalPRs || 0;
  if (prs === 0) {
    score -= 10;
    const item: AuditItem = {
      feature: 'Pull Requests & Open Source PRs',
      status: 'missing',
      detail: '0 Pull Requests merged or opened',
      roast: '0 Pull Requests. You only code in isolation. Real open-source developers collaborate and open PRs!'
    };
    missingItems.push(item);
    savageRoasts.push(item.roast);
    actionSteps.push('Contribute bug fixes or doc improvements to active open-source projects via PRs.');
  } else {
    workingItems.push({
      feature: 'Pull Request Activity',
      status: 'passed',
      detail: `${prs} Pull Requests created/merged`,
      roast: `Collaborative developer with ${prs} PRs on record.`
    });
  }

  const finalScore = Math.max(0, Math.min(100, score));

  let grade: DeepProfileReview['grade'] = 'F';
  let verdictHeadline = "Critical Profile Makeover Required!";

  if (finalScore >= 90) {
    grade = 'A+';
    verdictHeadline = "Open Source Powerhouse! Extremely impressive profile layout.";
  } else if (finalScore >= 80) {
    grade = 'A';
    verdictHeadline = "Solid GitHub Profile! Just a few minor polishes away from perfection.";
  } else if (finalScore >= 65) {
    grade = 'B';
    verdictHeadline = "Decent Developer Profile, but missing crucial showcase details.";
  } else if (finalScore >= 50) {
    grade = 'C';
    verdictHeadline = "Average GitHub Lurker. Needs better pinned repos and an impressive README.";
  } else if (finalScore >= 35) {
    grade = 'D';
    verdictHeadline = "Underwhelming. Your profile looks abandoned and incomplete.";
  }

  return {
    completenessScore: finalScore,
    grade,
    verdictHeadline,
    savageRoasts: savageRoasts.length ? savageRoasts : ["Your profile is strangely flawless. Did you spend 3 weeks tweaking your bio?"],
    whatIsMissing: missingItems,
    whatIsWorking: workingItems,
    actionableSteps: actionSteps
  };
}
