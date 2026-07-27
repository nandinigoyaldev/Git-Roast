import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { DeveloperProfile } from '../types/profile';

type ReadmePanelProps = {
  profile: DeveloperProfile;
};

type TemplateId = 'modern-pro' | 'cyberpunk-neon' | 'gitroast-brutal' | 'open-source' | 'aesthetic';

const TECH_BADGES: Record<string, { label: string; logo: string; color: string }> = {
  react: { label: 'React', logo: 'react', color: '61DAFB' },
  typescript: { label: 'TypeScript', logo: 'typescript', color: '3178C6' },
  nodejs: { label: 'Node.js', logo: 'nodedotjs', color: '339933' },
  python: { label: 'Python', logo: 'python', color: '3776AB' },
  tailwind: { label: 'Tailwind CSS', logo: 'tailwindcss', color: '06B6D4' },
  nextjs: { label: 'Next.js', logo: 'nextdotjs', color: '000000' },
  docker: { label: 'Docker', logo: 'docker', color: '2496ED' },
  go: { label: 'Go', logo: 'go', color: '00ADD8' },
  rust: { label: 'Rust', logo: 'rust', color: '000000' },
  aws: { label: 'AWS', logo: 'amazonwebservices', color: '232F3E' }
};

export function ReadmePanel({ profile }: ReadmePanelProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('gitroast-brutal');
  const [customTagline, setCustomTagline] = useState<string>(profile.bio || 'Building open source projects for the web.');
  const [selectedTech, setSelectedTech] = useState<string[]>(['react', 'typescript', 'nodejs', 'tailwind']);
  const [showStats, setShowStats] = useState<boolean>(true);
  const [showLanguages, setShowLanguages] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate markdown client-side instantly and reliably
  const generatedMarkdown = useMemo(() => {
    const login = profile.login || 'octocat';
    const name = profile.name || login;
    const commits = profile.totalCommits || 0;
    const stars = profile.totalStars || 0;
    const grade = profile.grade || 'B';
    const title = profile.title || 'Full Stack Developer';
    const repos = profile.pinnedTrash || [];

    const techBadgesHtml = selectedTech.map(key => {
      const b = TECH_BADGES[key];
      if (!b) return '';
      return `<img src="https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=for-the-badge&logo=${b.logo}&logoColor=white" alt="${b.label}" />`;
    }).join(' ');

    if (selectedTemplate === 'cyberpunk-neon') {
      return `<!-- CYBERPUNK NEON PROFILE README -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:0d1117,100:58a6ff&text=${encodeURIComponent(name)}&fontSize=50&fontColor=ffffff&fontAlignY=35&descAlignY=55&desc=${encodeURIComponent(customTagline)}" alt="Hero Banner"/>
</div>

<br>

<table width="100%">
  <tr>
    <td width="60%">
      <h2>⚡ System Terminal: whoami</h2>
      <p>I am <strong>${name}</strong> (${title}).</p>
      <blockquote>"${customTagline}"</blockquote>
      <pre><code>const dev = {
  handle: "${login}",
  commits_this_year: ${commits},
  stars_earned: ${stars},
  power_rank: "${grade}"
};</code></pre>
    </td>
    <td width="40%" align="center">
      <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" width="180" style="border-radius:10px;" />
    </td>
  </tr>
</table>

<br>

<h3>🛠️ Tech Stack & Weapons</h3>
<p align="center">
  ${techBadgesHtml}
</p>

<br>

${showStats ? `<h3>📊 Cyber Analytics</h3>
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&theme=cyberpunk&hide_border=true" alt="GitHub Stats" />
</div>
<br>` : ''}

<h3>📌 Featured Systems</h3>
${repos.map(r => `- **[${r.name}](https://github.com/${login}/${r.name})**: ${r.description || 'No description.'} (⭐ ${r.stars})`).join('\n')}
`;
    }

    if (selectedTemplate === 'gitroast-brutal') {
      const traits = (profile.toxicTraits || []).join(', ') || 'Serial Code Refactorer';
      return `<!-- GITROAST BRUTAL PROFILE README -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:0d1117,100:f85149&text=${encodeURIComponent(name)}%20%F0%9F%94%A5&fontSize=48&fontColor=ffffff&fontAlignY=35&descAlignY=55&desc=GitRoast%20Impression%20Grade:%20${grade}" alt="GitRoast Banner"/>

  <br>

  <p>
    <img src="https://img.shields.io/badge/GitRoast%20Grade-${grade}-f85149?style=for-the-badge&logo=github" />
    <img src="https://img.shields.io/badge/Annual%20Commits-${commits}-2ea44f?style=for-the-badge&logo=git" />
    <img src="https://img.shields.io/badge/Star%20Count-${stars}-f0883e?style=for-the-badge&logo=github-sponsors" />
  </p>

  <p><i>"${profile.activityRoast || customTagline}"</i></p>
</div>

---

### ⚠️ Toxic Developer Traits
> **Detected Traits:** \`${traits}\`

---

### 🛠️ Core Tech Stack
<p>
  ${techBadgesHtml}
</p>

${showStats ? `---

### 📈 GitHub Stats Breakdown
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&theme=dark&hide_border=true" alt="GitHub Stats" />
</div>` : ''}

${showLanguages ? `\n<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${login}&layout=compact&theme=dark&hide_border=true" alt="Top Languages" />
</div>` : ''}

---

### 📦 Pinned Repositories
${repos.map(r => `#### 🚀 [${r.name}](https://github.com/${login}/${r.name})\n${r.description || 'No description provided.'}\n- **Stars**: ⭐ ${r.stars}\n- **Roast**: _${r.roast || 'Needs more unit tests.'}_\n`).join('\n')}
`;
    }

    if (selectedTemplate === 'open-source') {
      return `<!-- OPEN SOURCE LEGEND README -->
# Hi there, I'm ${name} 👋

> ${customTagline}

- 🔭 I’m currently working on open-source web applications
- 🌱 I’m currently learning advanced systems design & TypeScript
- 💬 Ask me about **React, Node.js, and Open Source**
- ⚡ Fun fact: I have logged **${commits} commits** this year!

---

### 🛠️ Tech Stack & Skills
${techBadgesHtml}

---

${showStats ? `### 📊 GitHub Activity & Stats
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&theme=tokyonight&hide_border=true" alt="GitHub Stats" />
</p>` : ''}

### 🌟 Featured Repositories
| Repository | Description | Stars |
| :--- | :--- | :--- |
${repos.map(r => `| [**${r.name}**](https://github.com/${login}/${r.name}) | ${r.description || 'Awesome project'} | ⭐ ${r.stars} |`).join('\n')}

---

<p align="center">
  <i>Generated with <a href="https://github.com/nandinigoyaldev/Developer-rpg-profile-generator">GitRoast</a></i>
</p>
`;
    }

    if (selectedTemplate === 'aesthetic') {
      return `<!-- AESTHETIC MINIMALIST README -->
<div align="center">
  <h1>✨ ${name} ✨</h1>
  <p><code>${title}</code> • <code>${profile.location || 'Worldwide'}</code></p>
  <p>${customTagline}</p>
</div>

<br>

### 💻 Technologies & Frameworks
<p align="center">
  ${techBadgesHtml}
</p>

${showStats ? `<br>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&theme=radical&hide_border=true" alt="GitHub Stats" />
</div>` : ''}

<br>

### 📌 Highlights
${repos.map(r => `- **${r.name}**: ${r.description || 'Project link'} (⭐ ${r.stars})`).join('\n')}
`;
    }

    // Default: Modern Pro
    return `<!-- MODERN PRO DEVELOPER README -->
# ${name} 🚀

**${title}** • ${customTagline}

- 📍 Location: ${profile.location || 'Remote'}
- 📈 Annual Commits: ${commits}
- ⭐ Total Stars Earned: ${stars}

---

### 🧰 Tech Stack
<p>
  ${techBadgesHtml}
</p>

${showStats ? `---

### 📊 GitHub Statistics
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&theme=dark&hide_border=true" alt="Stats" />
</p>` : ''}

---

### 📂 Featured Repositories
${repos.map(r => `- [**${r.name}**](https://github.com/${login}/${r.name}): ${r.description || 'No description provided.'} (⭐ ${r.stars})`).join('\n')}
`;
  }, [profile, selectedTemplate, customTagline, selectedTech, showStats, showLanguages]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleTech = (key: string) => {
    if (selectedTech.includes(key)) {
      setSelectedTech(selectedTech.filter(t => t !== key));
    } else {
      setSelectedTech([...selectedTech, key]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Controls & Options Bar */}
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f0f6fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📝</span> Impressive Profile README Builder
            </h2>
            <p style={{ margin: '4px 0 0', color: '#8b949e', fontSize: '0.9rem' }}>
              Select a theme template, customize badges & bio, and copy or download your GitHub profile README.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopy}
              style={{
                background: '#238636',
                border: 'none',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Markdown'}
            </button>
            <button
              onClick={handleDownload}
              style={{
                background: '#21262d',
                border: '1px solid #30363d',
                color: '#58a6ff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              💾 Download README.md
            </button>
          </div>
        </div>

        {/* 1. Template Selectors */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', fontWeight: 600, marginBottom: '8px' }}>
            Choose README Theme Template
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {[
              { id: 'gitroast-brutal', name: '🔥 GitRoast Brutal', desc: 'Roast score + toxic traits' },
              { id: 'modern-pro', name: '🚀 Modern Pro', desc: 'Clean recruiter-focused' },
              { id: 'cyberpunk-neon', name: '⚡ Cyberpunk Hacker', desc: 'Capsule banner + terminal' },
              { id: 'open-source', name: '🌟 Open Source Legend', desc: 'Projects table + shields' },
              { id: 'aesthetic', name: '✨ Aesthetic Minimalist', desc: 'Clean typography' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id as any)}
                style={{
                  background: selectedTemplate === t.id ? '#21262d' : '#0d1117',
                  border: `1px solid ${selectedTemplate === t.id ? '#58a6ff' : '#30363d'}`,
                  color: selectedTemplate === t.id ? '#58a6ff' : '#c9d1d9',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '2px' }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Customization Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', fontWeight: 600, marginBottom: '6px' }}>
              Custom Profile Tagline / Bio
            </label>
            <input
              type="text"
              value={customTagline}
              onChange={e => setCustomTagline(e.target.value)}
              placeholder="e.g. Building open source tools with React & Rust..."
              style={{
                width: '100%',
                background: '#0d1117',
                border: '1px solid #30363d',
                color: '#c9d1d9',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.88rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', fontWeight: 600, marginBottom: '6px' }}>
              Include Dynamic Widgets
            </label>
            <div style={{ display: 'flex', gap: '16px', paddingTop: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#c9d1d9', cursor: 'pointer' }}>
                <input type="checkbox" checked={showStats} onChange={e => setShowStats(e.target.checked)} />
                GitHub Stats Card
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#c9d1d9', cursor: 'pointer' }}>
                <input type="checkbox" checked={showLanguages} onChange={e => setShowLanguages(e.target.checked)} />
                Top Languages Card
              </label>
            </div>
          </div>
        </div>

        {/* 3. Tech Stack Badge Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', fontWeight: 600, marginBottom: '8px' }}>
            Select Tech Stack Badges to Feature
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(TECH_BADGES).map(([key, b]) => {
              const active = selectedTech.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleTech(key)}
                  style={{
                    background: active ? '#21262d' : '#0d1117',
                    border: `1px solid ${active ? '#' + b.color : '#30363d'}`,
                    color: active ? '#ffffff' : '#8b949e',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{active ? '✓' : '+'}</span>
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs for Live Rendered Preview vs Markdown Code */}
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #30363d', background: '#0d1117', padding: '0 16px' }}>
          <button
            onClick={() => setActiveTab('preview')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'preview' ? '2px solid #58a6ff' : '2px solid transparent',
              color: activeTab === 'preview' ? '#f0f6fc' : '#8b949e',
              padding: '12px 16px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            👁️ Live Rendered Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'code' ? '2px solid #58a6ff' : '2px solid transparent',
              color: activeTab === 'code' ? '#f0f6fc' : '#8b949e',
              padding: '12px 16px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            📄 Raw Markdown Code
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {activeTab === 'preview' ? (
            <div style={{ background: '#0d1117', padding: '24px', borderRadius: '8px', border: '1px solid #30363d' }}>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {generatedMarkdown}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              rows={22}
              value={generatedMarkdown}
              readOnly
              style={{
                width: '100%',
                background: '#0d1117',
                border: '1px solid #30363d',
                color: '#a5d6ff',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '16px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                lineHeight: '1.5'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
