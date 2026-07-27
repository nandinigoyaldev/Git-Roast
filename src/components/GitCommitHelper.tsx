import React, { useState } from 'react';

interface CommitType {
  type: string;
  emoji: string;
  label: string;
  desc: string;
}

const COMMIT_TYPES: CommitType[] = [
  { type: 'feat', emoji: '✨', label: 'Feature (feat)', desc: 'A new feature or capability for your project' },
  { type: 'fix', emoji: '🐛', label: 'Bug Fix (fix)', desc: 'Fixing a bug or unwanted behavior' },
  { type: 'docs', emoji: '📝', label: 'Documentation (docs)', desc: 'Adding or updating README, docs, or comments' },
  { type: 'style', emoji: '🎨', label: 'Style (style)', desc: 'Formatting, CSS tweaks, missing semicolons' },
  { type: 'refactor', emoji: '♻️', label: 'Refactor (refactor)', desc: 'Restructuring code without changing functionality' },
  { type: 'test', emoji: '🧪', label: 'Tests (test)', desc: 'Adding or correcting unit/integration tests' },
  { type: 'chore', emoji: '🔧', label: 'Chore (chore)', desc: 'Updating dependencies, build scripts, configs' },
  { type: 'perf', emoji: '⚡', label: 'Performance (perf)', desc: 'Changes that improve code performance' },
];

export const GitCommitHelper: React.FC = () => {
  const [selectedType, setSelectedType] = useState('feat');
  const [scope, setScope] = useState('profile');
  const [subject, setSubject] = useState('add interactive roast card generator');
  const [body, setBody] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const formattedType = COMMIT_TYPES.find(t => t.type === selectedType) || COMMIT_TYPES[0];
  
  const fullCommitMessage = `${selectedType}${scope ? `(${scope.trim()})` : ''}${isBreaking ? '!' : ''}: ${formattedType.emoji} ${subject.trim()}${
    body.trim() ? `\n\n${body.trim()}` : ''
  }`;

  const gitCommands = [
    { label: 'Check changed files', cmd: 'git status' },
    { label: 'Stage all changes', cmd: 'git add .' },
    { label: 'Commit with conventional message', cmd: `git commit -m "${fullCommitMessage.replace(/"/g, '\\"').split('\n')[0]}"` },
    { label: 'Push to remote repository', cmd: 'git push origin main' }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(35, 134, 54, 0.15), rgba(88, 166, 255, 0.1))',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.8rem' }}>💡</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f0f6fc' }}>Git Commit Masterclass & Helper</h2>
            <p style={{ margin: '4px 0 0', color: '#8b949e', fontSize: '0.9rem' }}>
              Never get your PR rejected again. Build standardized, impressive commit messages and copy ready-to-run Git terminal commands.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left Column: Interactive Commit Form */}
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#58a6ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛠️</span> 1. Compose Conventional Commit
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', marginBottom: '6px' }}>
              Commit Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {COMMIT_TYPES.map(t => (
                <button
                  key={t.type}
                  onClick={() => setSelectedType(t.type)}
                  style={{
                    background: selectedType === t.type ? '#21262d' : '#0d1117',
                    border: `1px solid ${selectedType === t.type ? '#58a6ff' : '#30363d'}`,
                    color: selectedType === t.type ? '#58a6ff' : '#c9d1d9',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{t.emoji} {t.type}</div>
                  <div style={{ fontSize: '0.72rem', color: '#8b949e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.desc.split(' ')[0]}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', marginBottom: '6px' }}>
                Scope (optional)
              </label>
              <input
                type="text"
                value={scope}
                onChange={e => setScope(e.target.value)}
                placeholder="e.g. auth, ui, api"
                style={{
                  width: '100%',
                  background: '#0d1117',
                  border: '1px solid #30363d',
                  color: '#c9d1d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.82rem', color: '#f85149' }}>
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={e => setIsBreaking(e.target.checked)}
                />
                Breaking Change (!)
              </label>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', marginBottom: '6px' }}>
              Short Description (Imperative mood, e.g. "add feature" not "added feature")
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Describe what changed in 50 chars or less..."
              style={{
                width: '100%',
                background: '#0d1117',
                border: '1px solid #30363d',
                color: '#c9d1d9',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8b949e', marginBottom: '6px' }}>
              Detailed Body (optional)
            </label>
            <textarea
              rows={3}
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Explain motivation or additional details..."
              style={{
                width: '100%',
                background: '#0d1117',
                border: '1px solid #30363d',
                color: '#c9d1d9',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>

        {/* Right Column: Terminal Preview & CLI Commands */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Commit Message Preview */}
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#2ea44f', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✨</span> Generated Commit Message
              </h3>
              <button
                onClick={() => handleCopy(fullCommitMessage, 'msg')}
                style={{
                  background: '#238636',
                  border: 'none',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copiedIndex === 'msg' ? '✓ Copied!' : 'Copy Message'}
              </button>
            </div>

            <div style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '12px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.88rem',
              color: '#a5d6ff',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {fullCommitMessage}
            </div>
          </div>

          {/* Interactive Shell Execution */}
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#bc8cff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💻</span> Step-by-Step CLI Commands
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {gitCommands.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#0d1117',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#8b949e', fontWeight: 600 }}>
                      STEP {idx + 1}: {step.label}
                    </span>
                    <button
                      onClick={() => handleCopy(step.cmd, `cmd-${idx}`)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #30363d',
                        color: '#58a6ff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedIndex === `cmd-${idx}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#79c0ff' }}>
                    $ {step.cmd}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs and Best Practices */}
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '8px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', color: '#f0883e', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📚</span> Open Source Pro-Tips for an Impressive Profile
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#0d1117', padding: '14px', borderRadius: '6px', border: '1px solid #21262d' }}>
            <h4 style={{ margin: '0 0 6px', color: '#58a6ff', fontSize: '0.9rem' }}>🎯 Always Use Imperative Mood</h4>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.82rem' }}>
              Write "add feature" or "fix button bug" instead of "added" or "fixes". Git commit messages should complete the sentence: "If applied, this commit will..."
            </p>
          </div>
          <div style={{ background: '#0d1117', padding: '14px', borderRadius: '6px', border: '1px solid #21262d' }}>
            <h4 style={{ margin: '0 0 6px', color: '#2ea44f', fontSize: '0.9rem' }}>🔥 Green Contribution Graph Tip</h4>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.82rem' }}>
              Commits are counted on GitHub when made on your default branch (`main`) or merged into it, using the email linked to your GitHub account!
            </p>
          </div>
          <div style={{ background: '#0d1117', padding: '14px', borderRadius: '6px', border: '1px solid #21262d' }}>
            <h4 style={{ margin: '0 0 6px', color: '#bc8cff', fontSize: '0.9rem' }}>⭐ Star-Worthy README Secret</h4>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.82rem' }}>
              Include dynamic stats cards, clear badges, setup instructions, tech stack tags, and a live demo link at the top of every repository!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
