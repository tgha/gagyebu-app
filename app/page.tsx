'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { supabase } from '@/lib/supabase';
import BalanceCard from '@/components/BalanceCard';
import MonthFilter from '@/components/MonthFilter';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import CherryBlossom from '@/components/CherryBlossom';
import BottomScene from '@/components/BottomScene';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  // DB에서 해당 월 거래내역 불러오기
  async function fetchTransactions(year: number, month: number) {
    setLoading(true);
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .like('date', `${prefix}%`)
      .order('date', { ascending: false });

    if (!error && data) {
      setTransactions(
        data.map(row => ({
          id: row.id,
          type: row.type,
          desc: row.description,
          amount: row.amount,
          category: row.category,
          date: row.date,
        }))
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTransactions(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  async function addTransaction(tx: Omit<Transaction, 'id'>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        type: tx.type,
        description: tx.desc,
        amount: tx.amount,
        category: tx.category,
        date: tx.date,
      })
      .select()
      .single();

    if (!error && data) {
      setTransactions(prev => [{
        id: data.id,
        type: data.type,
        desc: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date,
      }, ...prev]);
    }
  }

  async function deleteTransaction(id: number) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (!error) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  }

  async function clearAll() {
    if (!confirm('이번 달 거래 내역을 모두 삭제할까요?')) return;
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    const { error } = await supabase
      .from('transactions')
      .delete()
      .like('date', `${prefix}%`);

    if (!error) {
      setTransactions([]);
    }
  }

  function changeMonth(dir: number) {
    setViewMonth(prev => {
      let m = prev + dir;
      if (m < 0)  { setViewYear(y => y - 1); return 11; }
      if (m > 11) { setViewYear(y => y + 1); return 0; }
      return m;
    });
  }

  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

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
          {loading ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>불러오는 중...</p>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onClearAll={clearAll}
            />
          )}
        </div>

        {/* 경복궁 돌담길 연인 장면 */}
        <div style={{ marginTop: '32px', paddingBottom: '0' }}>
          <BottomScene />
        </div>
      </main>
    </>
  );
}
