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
import { characterProfile } from './data/character';
import type { DeveloperProfile } from './types/profile';

function App() {
  const [profile, setProfile] = useState<DeveloperProfile | any>(characterProfile);
  const [activeTab, setActiveTab] = useState<'overview' | 'judge' | 'readme' | 'repo' | 'pvp' | 'wrapped'>('judge');
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Start on Login Panel
  const [usernameInput, setUsernameInput] = useState<string>('');
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
      setIsLoaded(true);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || '';
      if (msg.includes('404') || msg.includes('Not Found')) {
        setErrorMessage(`User "${sanitizedUsername}" not found on GitHub. Try another handle or preset!`);
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

  const handleSandboxDemo = () => {
    setProfile(characterProfile);
    setIsLoaded(true);
  };

  return (
    <div className="github-layout-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      {/* 1. INITIAL LANDING & LOGIN PANEL */}
      {!isLoaded ? (
        <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '24px', backgroundColor: '#0d1117' }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            border: '1px solid #30363d',
            borderRadius: '12px',
            backgroundColor: '#161b22',
            boxShadow: '0 12px 32px rgba(1, 4, 9, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #238636, #58a6ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🔥
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px', color: '#f0f6fc', letterSpacing: '-0.5px' }}>
                GitRoast 🔥
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#8b949e', margin: 0, lineHeight: 1.4 }}>
                Playful GitHub Profile Roaster & Open Source Auditor. Enter your GitHub handle to perform a savage roast, see what you are missing, and generate an impressive profile README.
              </p>
            </div>

            {errorMessage && (
              <div style={{
                backgroundColor: 'rgba(248, 81, 73, 0.15)',
                border: '1px solid #f85149',
                color: '#f85149',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600
              }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c9d1d9' }}>
                  GitHub Username or Profile URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. torvalds or https://github.com/octocat"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateProfile()}
                  style={{
                    height: '42px',
                    padding: '0 14px',
                    borderRadius: '6px',
                    border: '1px solid #30363d',
                    backgroundColor: '#0d1117',
                    color: '#c9d1d9',
                    fontSize: '0.9rem',
                    width: '100%'
                  }}
                  aria-label="GitHub Username Login"
                />
              </div>

              <button
                onClick={() => handleGenerateProfile()}
                disabled={loading}
                style={{
                  height: '42px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#238636',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s ease'
                }}
              >
                {loading ? 'Analyzing GitHub Profile...' : '🔥 Roast & Audit Profile'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: '#30363d' }} />
                <span style={{ fontSize: '0.75rem', color: '#8b949e', fontWeight: 600 }}>OR TRY PRESETS</span>
                <div style={{ flex: 1, height: '1px', background: '#30363d' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {['octocat', 'torvalds', 'gaearon'].map((user) => (
                  <button
                    key={user}
                    onClick={() => handlePresetSelect(user)}
                    style={{
                      background: '#21262d',
                      border: '1px solid #30363d',
                      color: '#58a6ff',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    @{user}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSandboxDemo}
                style={{
                  background: 'transparent',
                  border: '1px solid #30363d',
                  color: '#8b949e',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                🚀 Browse Sandbox with Demo Profile
              </button>
            </div>
          </div>
        </main>
      ) : (
        
        /* 2. MAIN DASHBOARD PAGE */
        <>
          {/* GitHub Top Navigation Bar */}
          <header className="gr-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setIsLoaded(false)}>
              <svg height="32" viewBox="0 0 16 16" width="32" fill="#ffffff">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f0f6fc', letterSpacing: '-0.5px' }}>
                  GitRoast 🔥
                </span>
                <span style={{ fontSize: '0.7rem', color: '#8b949e', fontWeight: 500 }}>
                  Profile Roaster & Open Source Auditor
                </span>
              </div>
            </div>

            {/* Global User Search Bar */}
            <div className="gr-search-bar">
              <div style={{ position: 'relative', flex: 1, minWidth: '160px' }}>
                <input
                  type="text"
                  placeholder="Enter GitHub username (e.g. torvalds)..."
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateProfile()}
                  style={{
                    width: '100%',
                    height: '36px',
                    padding: '0 12px 0 32px',
                    borderRadius: '6px',
                    border: '1px solid #30363d',
                    backgroundColor: '#0d1117',
                    color: '#c9d1d9',
                    fontSize: '0.85rem'
                  }}
                  aria-label="GitHub Username Search"
                />
                <span style={{ position: 'absolute', left: '10px', top: '9px', color: '#8b949e', fontSize: '0.85rem' }}>🔍</span>
              </div>

              <button
                onClick={() => handleGenerateProfile()}
                disabled={loading}
                style={{
                  height: '36px',
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
                {loading ? 'Analyzing...' : '🔥 Roast'}
              </button>
            </div>

            {/* Switch User / Login Panel Toggle */}
            <button
              onClick={() => setIsLoaded(false)}
              style={{
                background: '#21262d',
                border: '1px solid #30363d',
                color: '#c9d1d9',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap'
              }}
            >
              🔑 Switch User
            </button>
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

          {/* Main Content Area */}
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0d1117', flex: 1, width: '100%' }}>
            <div className="gr-layout-container">
              
              {/* Left Sidebar Profile */}
              <div className="gr-sidebar-col">
                <SidebarProfile profile={profile} />
              </div>

              {/* Right Main Content */}
              <div className="gr-main-col">
                
                {/* Nav Tabs */}
                <div className="gr-tab-row">
                  {[
                    { id: 'judge', label: '🔥 Profile Roast & Audit', icon: '⚖️' },
                    { id: 'readme', label: '📝 README Generator', icon: '📄' },
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

                {/* TAB 3: COMBAT STATS OVERVIEW */}
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

                {/* TAB 4: REPO ANALYZER */}
                {activeTab === 'repo' && (
                  <RepoAnalyzerPanel />
                )}

                {/* TAB 5: PVP BATTLE */}
                {activeTab === 'pvp' && (
                  <PvPBattlePanel />
                )}

                {/* TAB 6: GITHUB WRAPPED */}
                {activeTab === 'wrapped' && (
                  <GithubWrappedPanel profile={profile} />
                )}

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
