interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

function fmt(n: number) {
  return n.toLocaleString('ko-KR') + ' 원';
}

export default function BalanceCard({ balance, income, expense }: BalanceCardProps) {
  return (
    <div style={{
      background: '#4a7fe5',
      color: 'white',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center',
      boxShadow: '0 4px 16px rgba(74,127,229,0.35)',
    }}>
      <div style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '6px' }}>총 잔액</div>
      <div style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>{fmt(balance)}</div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.18)',
          borderRadius: '10px',
          padding: '10px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>수입</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '2px', color: '#a8f0c6' }}>
            {fmt(income)}
          </div>
        </div>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.18)',
          borderRadius: '10px',
          padding: '10px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>지출</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '2px', color: '#ffa8a8' }}>
            {fmt(expense)}
          </div>
        </div>
      </div>
    </div>
  );
}
