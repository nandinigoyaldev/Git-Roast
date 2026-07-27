import { useMemo } from 'react';
import type { DeveloperProfile } from '../types/profile';
import { judgeProfile } from '../lib/profileJudge';

interface ProfileJudgePanelProps {
  profile: DeveloperProfile;
}

export function ProfileJudgePanel({ profile }: ProfileJudgePanelProps) {
  const judgment = useMemo(() => judgeProfile(profile), [profile]);

  const gradeColors: Record<string, string> = {
    'A+': '#2ea44f',
    'A': '#238636',
    'B': '#58a6ff',
    'C': '#f0883e',
    'D': '#d29922',
    'F': '#f85149'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Grade and Headline Banner */}
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Big Grade Badge */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            background: gradeColors[judgment.grade] || '#58a6ff',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 20px ${gradeColors[judgment.grade]}44`,
            flexShrink: 0
          }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1 }}>{judgment.grade}</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.9 }}>GRADE</span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f0f6fc' }}>
                GitHub Profile Impression Roast
              </h2>
              <span style={{
                background: '#21262d',
                border: '1px solid #30363d',
                color: '#58a6ff',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {judgment.score} / 100 PTS
              </span>
            </div>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.95rem' }}>
              "{judgment.headlineRoast}"
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Scores & Playful Roasts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Playful Roasts List */}
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f85149', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔥</span> Playful Profile Roasts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {judgment.roasts.map((roast, idx) => (
              <div key={idx} style={{
                background: 'rgba(248, 81, 73, 0.08)',
                border: '1px solid rgba(248, 81, 73, 0.25)',
                borderRadius: '6px',
                padding: '12px 14px',
                color: '#c9d1d9',
                fontSize: '0.88rem',
                lineHeight: '1.4'
              }}>
                {roast}
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Ratings */}
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
            <span>📊</span> Impression Category Ratings
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Bio & Personal Identity', value: judgment.scores.bio, max: 25, color: '#2ea44f' },
              { label: 'Activity & Commits', value: judgment.scores.activity, max: 25, color: '#58a6ff' },
              { label: 'Repositories & Pinned Quality', value: judgment.scores.repositories, max: 25, color: '#bc8cff' },
              { label: 'Social & Network Impact', value: judgment.scores.social, max: 25, color: '#f0883e' }
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: '#c9d1d9' }}>{item.label}</span>
                  <span style={{ color: '#8b949e', fontWeight: 600 }}>{item.value} / {item.max}</span>
                </div>
                <div style={{ height: '8px', background: '#0d1117', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(item.value / item.max) * 100}%`,
                    background: item.color,
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Make Your Profile Impressive */}
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', color: '#2ea44f', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🚀</span> How to Make Your Profile 10x More Impressive
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {judgment.impressiveTips.map((tip, idx) => (
            <div key={idx} style={{
              background: '#0d1117',
              border: '1px solid #21262d',
              borderRadius: '6px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              fontSize: '0.88rem',
              color: '#c9d1d9'
            }}>
              <span style={{ color: '#2ea44f', fontWeight: 700 }}>#{idx + 1}</span>
              <span style={{ lineHeight: '1.4' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
