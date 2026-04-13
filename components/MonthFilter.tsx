interface MonthFilterProps {
  year: number;
  month: number; // 0-based
  onChange: (dir: number) => void;
}

export default function MonthFilter({ year, month, onChange }: MonthFilterProps) {
  const btnStyle: React.CSSProperties = {
    background: 'none',
    border: '1.5px solid #e2e8f0',
    borderRadius: '8px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
      <button style={btnStyle} onClick={() => onChange(-1)}>&#8249;</button>
      <span style={{ fontWeight: 600, fontSize: '1rem', minWidth: '80px', textAlign: 'center' }}>
        {year}년 {month + 1}월
      </span>
      <button style={btnStyle} onClick={() => onChange(1)}>&#8250;</button>
    </div>
  );
}
