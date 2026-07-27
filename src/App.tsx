import { useState } from 'react';
import { SidebarProfile } from './components/SidebarProfile';
import { PinnedTrash } from './components/PinnedTrash';
import { ToxicTraits } from './components/ToxicTraits';
import { ContributionGraph } from './components/ContributionGraph';
import { SkillRadarChart } from './components/SkillRadarChart';
import { ProfileCompletionTracker } from './components/ProfileCompletionTracker';
import { BadgeGenerator } from './components/BadgeGenerator';
import { ReadmePanel } from './components/ReadmePanel';
import { RepoAnalyzerPanel } from './components/RepoAnalyzerPanel';
import { ProfileJudgePanel } from './components/ProfileJudgePanel';
import { PvPBattlePanel } from './components/PvPBattlePanel';
import { GithubWrappedPanel } from './components/GithubWrappedPanel';
import { GitCommitHelper } from './components/GitCommitHelper';
import { characterProfile } from './data/character';
import type { DeveloperProfile } from './types/profile';

function App() {
  const [profile, setProfile] = useState<DeveloperProfile | any>(characterProfile);
  const [activeTab, setActiveTab] = useState<'overview' | 'judge' | 'readme' | 'git-commit' | 'repo' | 'pvp' | 'wrapped'>('judge');
  const [usernameInput, setUsernameInput] = useState<string>('octocat');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Force GitHub Dark Theme
  document.body.className = 'theme-github-dark';

  const handleGenerateProfile = async (targetUser?: string) => {
    const userToFetch = targetUser || usernameInput;
    if (!userToFetch.trim()) {
      setErrorMessage('Please enter a GitHub username.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    let sanitizedUsername = userToFetch.trim();
    if (sanitizedUsername.includes('github.com/')) {
      sanitizedUsername = sanitizedUsername.split('github.com/')[1].split('/')[0];
    }
    if (sanitizedUsername.startsWith('@')) {
      sanitizedUsername = sanitizedUsername.slice(1);
    }

    try {
      const response = await fetch(
        `/api/github?username=${encodeURIComponent(sanitizedUsername)}`,
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to fetch GitHub profile details.');
      }
      const currentProfile = await response.json();

      setProfile(currentProfile);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || '';
      if (msg.includes('404') || msg.includes('Not Found')) {
        setErrorMessage(`User "${sanitizedUsername}" not found on GitHub. Check spelling or try a preset below!`);
      } else {
        setErrorMessage(msg || 'Error compiling profile data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (username: string) => {
    setUsernameInput(username);
    handleGenerateProfile(username);
  };

  return (
    <div className="github-layout-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      {/* GitHub Top Navigation Bar */}
      <header style={{
        backgroundColor: '#161b22',
        padding: '12px 24px',
        borderBottom: '1px solid #30363d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('judge')}>
          <svg height="32" viewBox="0 0 16 16" width="32" fill="#ffffff">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f0f6fc', letterSpacing: '-0.5px' }}>
              GitRoast 🔥
            </span>
            <span style={{ fontSize: '0.7rem', color: '#8b949e', fontWeight: 500 }}>
              Profile Roaster & Open Source Mentor
            </span>
          </div>
        </div>

        {/* Global User Search & Demo Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1, maxWidth: '580px' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Enter GitHub username (e.g. torvalds, gaearon)..."
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateProfile()}
              style={{
                width: '100%',
                height: '34px',
                padding: '0 12px 0 32px',
                borderRadius: '6px',
                border: '1px solid #30363d',
                backgroundColor: '#0d1117',
                color: '#c9d1d9',
                fontSize: '0.85rem'
              }}
              aria-label="GitHub Username Search"
            />
            <span style={{ position: 'absolute', left: '10px', top: '8px', color: '#8b949e', fontSize: '0.85rem' }}>🔍</span>
          </div>

          <button
            onClick={() => handleGenerateProfile()}
            disabled={loading}
            style={{
              height: '34px',
              padding: '0 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#238636',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? 'Analyzing...' : '🔥 Roast Profile'}
          </button>
        </div>

        {/* Preset quick buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>Presets:</span>
          {['octocat', 'torvalds', 'gaearon'].map((user) => (
            <button
              key={user}
              onClick={() => handlePresetSelect(user)}
              style={{
                background: '#21262d',
                border: '1px solid #30363d',
                color: '#58a6ff',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              @{user}
            </button>
          ))}
        </div>
      </header>

      {errorMessage && (
        <div style={{
          backgroundColor: 'rgba(248, 81, 73, 0.15)',
          borderBottom: '1px solid #f85149',
          color: '#f85149',
          padding: '10px 24px',
          fontSize: '0.85rem',
          textAlign: 'center',
          fontWeight: 600
        }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Main Container */}
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0d1117', flex: 1 }}>
        <div style={{ width: '100%', maxWidth: '1380px', display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Left Sidebar Profile */}
          <div style={{ width: '296px', minWidth: '280px', flexShrink: 0 }}>
            <SidebarProfile profile={profile} />
          </div>

          {/* Right Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            
            {/* Nav Tabs */}
            <div style={{
              borderBottom: '1px solid #30363d',
              marginBottom: '24px',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingBottom: '4px'
            }}>
              {[
                { id: 'judge', label: '🔥 Profile Roast & Judge', icon: '⚖️' },
                { id: 'readme', label: '📝 README Generator', icon: '📄' },
                { id: 'git-commit', label: '💻 Git Commit Helper', icon: '💡' },
                { id: 'overview', label: '📊 Combat Stats Overview', icon: '📈' },
                { id: 'repo', label: '🔍 Open-Source Repo Audit', icon: '📦' },
                { id: 'pvp', label: '⚔️ Profile PvP Battle', icon: '🎮' },
                { id: 'wrapped', label: '🎁 GitHub Wrapped', icon: '✨' }
              ].map(tab => (
                <button
                  key={tab.id}
                  style={{
                    background: activeTab === tab.id ? '#21262d' : 'transparent',
                    border: '1px solid',
                    borderColor: activeTab === tab.id ? '#30363d' : 'transparent',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    color: activeTab === tab.id ? '#f0f6fc' : '#8b949e',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: PROFILE ROAST & JUDGE */}
            {activeTab === 'judge' && (
              <ProfileJudgePanel profile={profile} />
            )}

            {/* TAB 2: README GENERATOR */}
            {activeTab === 'readme' && (
              <ReadmePanel profile={profile} />
            )}

            {/* TAB 3: GIT COMMIT HELPER */}
            {activeTab === 'git-commit' && (
              <GitCommitHelper />
            )}

            {/* TAB 4: COMBAT STATS OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <SkillRadarChart profile={profile} />
                <PinnedTrash repositories={profile.pinnedTrash || []} />
                <ContributionGraph totalCommits={profile.totalCommits || 0} streak={profile.streak || 0} roast={profile.activityRoast || ''} />
                <ToxicTraits traits={profile.toxicTraits || []} />
                <ProfileCompletionTracker profile={profile} />
                <BadgeGenerator profile={profile} />
              </div>
            )}

            {/* TAB 5: REPO ANALYZER */}
            {activeTab === 'repo' && (
              <RepoAnalyzerPanel />
            )}

            {/* TAB 6: PVP BATTLE */}
            {activeTab === 'pvp' && (
              <PvPBattlePanel />
            )}

            {/* TAB 7: GITHUB WRAPPED */}
            {activeTab === 'wrapped' && (
              <GithubWrappedPanel profile={profile} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
