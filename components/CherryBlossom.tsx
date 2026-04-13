'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  swayX: number;
}

export default function CherryBlossom() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 10,
        size: 12 + Math.random() * 12,
        swayX: (Math.random() - 0.5) * 80,
      }))
    );
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 999,
      overflow: 'hidden',
    }}>
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-30px',
            fontSize: `${p.size}px`,
            animation: `petalFall ${p.duration}s ${p.delay}s infinite ease-in-out`,
            '--sway': `${p.swayX}px`,
          } as React.CSSProperties}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
