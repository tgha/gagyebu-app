import { Transaction } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  식비: '🍚', 교통: '🚌', 쇼핑: '🛍️', 문화: '🎬',
  의료: '💊', 급여: '💵', 부업: '💼', 기타: '📌',
};

function fmt(n: number) {
  return n.toLocaleString('ko-KR') + ' 원';
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onClearAll: () => void;
}

export default function TransactionList({ transactions, onDelete, onClearAll }: TransactionListProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '1rem', color: '#4a5568' }}>거래 내역</h2>
        <button
          onClick={onClearAll}
          style={{
            fontSize: '0.8rem',
            color: '#a0aec0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          전체 삭제
        </button>
      </div>

      {transactions.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#a0aec0', padding: '24px 0', fontSize: '0.9rem' }}>
          거래 내역이 없습니다.
        </div>
      ) : (
        transactions.map((tx, idx) => {
          const icon = CATEGORY_ICONS[tx.category] || '📌';
          const sign = tx.type === 'income' ? '+' : '-';
          const isLast = idx === transactions.length - 1;

          return (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 0',
                borderBottom: isLast ? 'none' : '1px solid #f0f4f8',
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
                background: tx.type === 'income' ? '#ebfff4' : '#fff0f0',
              }}>
                {icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {tx.desc}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a0aec0', marginTop: '2px' }}>
                  {tx.date} · {tx.category}
                </div>
              </div>

              <div style={{
                fontWeight: 700,
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                color: tx.type === 'income' ? '#38c97a' : '#e05757',
              }}>
                {sign}{fmt(tx.amount)}
              </div>

              <button
                onClick={() => onDelete(tx.id)}
                title="삭제"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#cbd5e0',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '4px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
