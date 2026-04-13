'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import BalanceCard from '@/components/BalanceCard';
import MonthFilter from '@/components/MonthFilter';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import CherryBlossom from '@/components/CherryBlossom';
import BottomScene from '@/components/BottomScene';

const STORAGE_KEY = 'gagyebu_data';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  function save(txs: Transaction[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
    setTransactions(txs);
  }

  function addTransaction(tx: Omit<Transaction, 'id'>) {
    save([{ id: Date.now(), ...tx }, ...transactions]);
  }

  function deleteTransaction(id: number) {
    save(transactions.filter(t => t.id !== id));
  }

  function clearAll() {
    if (!confirm('이번 달 거래 내역을 모두 삭제할까요?')) return;
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    save(transactions.filter(t => !t.date.startsWith(prefix)));
  }

  function changeMonth(dir: number) {
    setViewMonth(prev => {
      let m = prev + dir;
      if (m < 0)  { setViewYear(y => y - 1); return 11; }
      if (m > 11) { setViewYear(y => y + 1); return 0; }
      return m;
    });
  }

  const prefix   = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
  const filtered = transactions.filter(t => t.date.startsWith(prefix));
  const income   = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense  = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance  = income - expense;

  return (
    <>
      {/* 벚꽃 낙화 애니메이션 */}
      <CherryBlossom />

      <main style={{ padding: '24px 16px 0', minHeight: '100vh' }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '1.8rem',
          marginBottom: '24px',
          color: '#c0506a',
          textShadow: '0 1px 4px rgba(255,180,200,0.5)',
        }}>
          🌸 가계부 🌸
        </h1>

        <div style={{
          maxWidth: '540px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <BalanceCard balance={balance} income={income} expense={expense} />
          <MonthFilter year={viewYear} month={viewMonth} onChange={changeMonth} />
          <TransactionForm onAdd={addTransaction} />
          <TransactionList
            transactions={filtered}
            onDelete={deleteTransaction}
            onClearAll={clearAll}
          />
        </div>

        {/* 경복궁 돌담길 연인 장면 */}
        <div style={{ marginTop: '32px', paddingBottom: '0' }}>
          <BottomScene />
        </div>
      </main>
    </>
  );
}
