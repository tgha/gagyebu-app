'use client';

import { useState } from 'react';
import { TransactionType, Transaction } from '@/types';

const INCOME_CATEGORIES = ['급여', '부업', '기타'];
const EXPENSE_CATEGORIES = ['식비', '교통', '쇼핑', '문화', '의료', '기타'];

interface TransactionFormProps {
  onAdd: (tx: Omit<Transaction, 'id'>) => void;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('income');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('급여');
  const [date, setDate] = useState(today());

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleTypeChange(t: TransactionType) {
    setType(t);
    setCategory(t === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  }

  function handleSubmit() {
    if (!desc.trim()) { alert('내용을 입력해주세요.'); return; }
    const amt = parseInt(amount);
    if (!amt || amt <= 0) { alert('금액을 올바르게 입력해주세요.'); return; }
    if (!date) { alert('날짜를 선택해주세요.'); return; }

    onAdd({ type, desc: desc.trim(), amount: amt, category, date });
    setDesc('');
    setAmount('');
  }

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px 12px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '0.95rem',
    outline: 'none',
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    }}>
      <h2 style={{ fontSize: '1rem', marginBottom: '14px', color: '#4a5568' }}>거래 추가</h2>

      {/* 수입 / 지출 토글 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button
          onClick={() => handleTypeChange('income')}
          style={{
            flex: 1,
            padding: '9px',
            border: `1.5px solid ${type === 'income' ? '#38c97a' : '#e2e8f0'}`,
            borderRadius: '10px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontWeight: 600,
            background: type === 'income' ? '#ebfff4' : 'white',
            color: type === 'income' ? '#1b7a4a' : '#333',
          }}
        >
          + 수입
        </button>
        <button
          onClick={() => handleTypeChange('expense')}
          style={{
            flex: 1,
            padding: '9px',
            border: `1.5px solid ${type === 'expense' ? '#e05757' : '#e2e8f0'}`,
            borderRadius: '10px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontWeight: 600,
            background: type === 'expense' ? '#fff0f0' : 'white',
            color: type === 'expense' ? '#b02020' : '#333',
          }}
        >
          - 지출
        </button>
      </div>

      {/* 내용 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="내용 (예: 점심식사)"
          maxLength={30}
          style={inputStyle}
        />
      </div>

      {/* 금액 + 카테고리 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="금액"
          min={0}
          style={inputStyle}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={inputStyle}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 날짜 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={inputStyle}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px',
          background: '#4a7fe5',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        추가하기
      </button>
    </div>
  );
}
