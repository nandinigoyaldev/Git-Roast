type ToxicTraitsProps = {
  traits: string[];
};

export function ToxicTraits({ traits }: ToxicTraitsProps) {
  if (!traits || traits.length === 0) return null;

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <h3 style={{ margin: 0, fontSize: '1rem', color: '#f0883e', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚠️</span> Toxic Developer Traits Detected
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {traits.map((trait, index) => (
          <span
            key={index}
            style={{
              background: '#21262d',
              border: '1px solid #30363d',
              color: '#f0883e',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🏷️</span> {trait}
          </span>
        ))}
      </div>
    </div>
  );
}
