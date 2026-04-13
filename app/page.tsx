'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import BalanceCard from '@/components/BalanceCard';
import MonthFilter from '@/components/MonthFilter';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

const STORAGE_KEY = 'gagyebu_data';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  // 데이터 변경 시 localStorage에 저장
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
      if (m < 0) { setViewYear(y => y - 1); return 11; }
      if (m > 11) { setViewYear(y => y + 1); return 0; }
      return m;
    });
  }

  // 현재 월 필터링
  const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
  const filtered = transactions.filter(t => t.date.startsWith(prefix));
  const income  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  return (
    <main style={{ padding: '24px 16px', minHeight: '100vh', background: '#f0f4f8' }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '1.8rem',
        marginBottom: '24px',
        color: '#2d3748',
      }}>
        💰 가계부
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
    </main>
  );
}
