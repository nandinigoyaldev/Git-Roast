import type { DeveloperProfile } from '../types/profile';

type SidebarProfileProps = {
  profile: DeveloperProfile;
};

export function SidebarProfile({ profile }: SidebarProfileProps) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <img 
          src={profile.avatarUrl || `https://github.com/${profile.login}.png`} 
          alt={profile.login} 
          style={{
            maxWidth: '296px',
            width: '100%',
            height: 'auto',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            border: '1px solid var(--line-strong)',
            marginBottom: '16px',
            objectFit: 'cover'
          }}
        />
        <h1 style={{ marginBottom: '12px', margin: 0 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
            {profile.name || profile.login}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.2, marginTop: '2px' }}>
            @{profile.login}
          </div>
        </h1>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
          {profile.bio || 'No bio provided on GitHub.'}
        </p>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>👥</span>
          <strong style={{ color: 'var(--text-main)' }}>{profile.followers || 0}</strong> followers
          <span>·</span>
          <strong style={{ color: 'var(--text-main)' }}>{profile.following || 0}</strong> following
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          {profile.company && (
            <li style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🏢 {profile.company}</li>
          )}
          {profile.location && (
            <li style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📍 {profile.location}</li>
          )}
          {profile.blog && (
            <li style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🔗 <a href={profile.blog} target="_blank" rel="noreferrer" style={{ color: 'var(--git-blue)', textDecoration: 'none' }}>{profile.blog}</a></li>
          )}
        </ul>

        <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: '16px', width: '100%' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 8px 0', color: '#c9d1d9' }}>Achievements & Grade</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#21262d',
              border: '1px solid #30363d',
              color: '#58a6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800
            }} title="Grade">
              {profile.grade || 'B'}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f0f6fc' }}>{profile.title || 'Developer'}</div>
              <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>GitHub Rank</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
