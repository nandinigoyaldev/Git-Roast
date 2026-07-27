import { useMemo } from 'react';
import type { DeveloperProfile } from '../types/profile';
import { judgeProfileDeep } from '../lib/profileJudge';

interface ProfileJudgePanelProps {
  profile: DeveloperProfile;
}

export function ProfileJudgePanel({ profile }: ProfileJudgePanelProps) {
  const audit = useMemo(() => judgeProfileDeep(profile), [profile]);

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
      {/* Grade and Verdict Header */}
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
          {/* Grade Badge */}
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '12px',
            background: gradeColors[audit.grade] || '#58a6ff',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 24px ${gradeColors[audit.grade]}55`,
            flexShrink: 0
          }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1 }}>{audit.grade}</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, opacity: 0.9, marginTop: '2px' }}>GRADE</span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f0f6fc' }}>
                Brutal GitHub Profile Audit & Roast
              </h2>
              <span style={{
                background: '#21262d',
                border: '1px solid #30363d',
                color: '#58a6ff',
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 700
              }}>
                {audit.completenessScore}% Complete
              </span>
            </div>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '0.95rem' }}>
              "{audit.verdictHeadline}"
            </p>
          </div>
        </div>
      </div>

      {/* Savage Roasts List */}
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f85149', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔥</span> Playful Profile Roasts ({audit.savageRoasts.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {audit.savageRoasts.map((roast, idx) => (
            <div key={idx} style={{
              background: 'rgba(248, 81, 73, 0.08)',
              border: '1px solid rgba(248, 81, 73, 0.3)',
              borderRadius: '6px',
              padding: '12px 16px',
              color: '#c9d1d9',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <span style={{ color: '#f85149', fontWeight: 700 }}>#{idx + 1}</span>
              <span>{roast}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: What You Are Missing vs What Is Working */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* WHAT IS MISSING (RED) */}
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f85149', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌</span> What You Are Missing ({audit.whatIsMissing.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#f85149', fontWeight: 600 }}>Needs Attention</span>
          </div>

          {audit.whatIsMissing.length === 0 ? (
            <div style={{ color: '#2ea44f', fontSize: '0.88rem', padding: '12px', background: '#0d1117', borderRadius: '6px' }}>
              🎉 Incredible! You are not missing any core profile features.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {audit.whatIsMissing.map((item, idx) => (
                <div key={idx} style={{
                  background: '#0d1117',
                  border: '1px solid rgba(248, 81, 73, 0.3)',
                  borderRadius: '6px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#f85149', fontSize: '0.88rem' }}>
                      ❌ {item.feature}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#21262d', color: '#8b949e', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#8b949e' }}>
                    {item.detail}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#c9d1d9', fontStyle: 'italic', marginTop: '4px', borderLeft: '2px solid #f85149', paddingLeft: '8px' }}>
                    "{item.roast}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WHAT IS WORKING (GREEN) */}
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#2ea44f', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> What You Have Going For You ({audit.whatIsWorking.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#2ea44f', fontWeight: 600 }}>Strengths</span>
          </div>

          {audit.whatIsWorking.length === 0 ? (
            <div style={{ color: '#f85149', fontSize: '0.88rem', padding: '12px', background: '#0d1117', borderRadius: '6px' }}>
              ⚠️ Zero strengths detected. Your profile needs emergency work!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {audit.whatIsWorking.map((item, idx) => (
                <div key={idx} style={{
                  background: '#0d1117',
                  border: '1px solid rgba(46, 164, 79, 0.3)',
                  borderRadius: '6px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#2ea44f', fontSize: '0.88rem' }}>
                      ✅ {item.feature}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#21262d', color: '#2ea44f', padding: '2px 6px', borderRadius: '4px' }}>
                      PASSED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#8b949e' }}>
                    {item.detail}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#c9d1d9', fontStyle: 'italic', marginTop: '4px', borderLeft: '2px solid #2ea44f', paddingLeft: '8px' }}>
                    "{item.roast}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Steps */}
      {audit.actionableSteps.length > 0 && (
        <div style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '1.1rem', color: '#58a6ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚀</span> How to Turn This Roast Into an Impressive Profile
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {audit.actionableSteps.map((step, idx) => (
              <div key={idx} style={{
                background: '#0d1117',
                border: '1px solid #21262d',
                borderRadius: '6px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.88rem',
                color: '#c9d1d9'
              }}>
                <span style={{
                  background: '#21262d',
                  color: '#58a6ff',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
