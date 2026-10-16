import React, { useState } from 'react';

export default function HustleCaseApp() {
  const [balance, setBalance] = useState<number>(300);
  const [demoBalance, setDemoBalance] = useState<number>(1500);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [houseTreasury, setHouseTreasury] = useState<number>(1200);
  const [activeTab, setActiveTab] = useState<'main' | 'profile'>('main');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [opening, setOpening] = useState<boolean>(false);
  const [wonItem, setWonItem] = useState<any>(null);

  const casesList = [
    { id: '1', name: 'Snake Case', price: 99, tag: 'Старт', tagColor: '#10b981', desc: 'Неоновый террариум', items: [{ name: 'Snake Box (Мусор)', value: 15, color: '#737373' }, { name: 'Golden Snake Box', value: 200, color: '#10b981' }] },
    { id: '2', name: 'Sakura Case', price: 249, tag: 'Хит', tagColor: '#3b82f6', desc: 'Ночной японский сад', items: [{ name: 'Sakura Petal (Мусор)', value: 40, color: '#737373' }, { name: 'Sakura Flower', value: 450, color: '#f59e0b' }] },
    { id: '3', name: 'Cigar Case', price: 349, tag: 'Премиум', tagColor: '#f59e0b', desc: 'Лаунж-бар Smoke Sway', items: [{ name: 'Smoke Ash (Мусор)', value: 50, color: '#737373' }, { name: 'Snoop Cigar', value: 600, color: '#ef4444' }] },
    { id: '4', name: 'Rose Case', price: 499, tag: 'Люкс', tagColor: '#ec4899', desc: 'Хрустальный купол', items: [{ name: 'Glass Dust (Мусор)', value: 80, color: '#737373' }, { name: 'Eternal Rose', value: 900, color: '#8b5cf6' }] },
    { id: '5', name: 'Ring Case', price: 700, tag: 'ТОП', tagColor: '#8b5cf6', desc: 'Оникс с подсветкой', items: [{ name: 'Onyx Fragment (Мусор)', value: 100, color: '#737373' }, { name: 'Signet Ring', value: 1400, color: '#fbbf24' }] },
  ];

  const handleOpenCase = (c: any) => {
    const curBal = isDemo ? demoBalance : balance;
    if (curBal < c.price) {
      alert('Недостаточно звезд!');
      return;
    }

    setSelectedCase(c);
    setOpening(true);
    setWonItem(null);

    if (isDemo) {
      setDemoBalance(prev => prev - c.price);
    } else {
      setBalance(prev => prev - c.price);
      setHouseTreasury(prev => prev + c.price);
    }

    setTimeout(() => {
      const isWin = Math.random() < 0.12;
      const item = isWin ? c.items[1] : c.items[0];

      if (isDemo) {
        setDemoBalance(prev => prev + item.value);
      } else {
        setBalance(prev => prev + item.value);
      }

      setWonItem(item);
      setOpening(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0f', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '80px', padding: '16px' }}>
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Hustle Case</div>
          <div style={{ fontSize: '11px', color: '#888' }}>{isDemo ? 'DEMO режим' : `Казна: ${houseTreasury} ⭐`}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setIsDemo(!isDemo)} style={{ background: isDemo ? '#f59e0b' : '#222', color: isDemo ? '#000' : '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
            {isDemo ? 'DEMO ON' : 'DEMO OFF'}
          </button>
          <div style={{ background: '#1a1a1e', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', color: '#fbbf24' }}>
            ⭐ {isDemo ? demoBalance : balance}
          </div>
        </div>
      </div>

      {/* Контент */}
      {activeTab === 'main' && (
        <div>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Выбирай кейс и крути:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {casesList.map(c => (
              <div key={c.id} onClick={() => handleOpenCase(c)} style={{ background: '#141418', border: '1px solid #222', borderRadius: '12px', padding: '14px', cursor: 'pointer', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '8px', right: '8px', background: c.tagColor, fontSize: '9px', padding: '2px 5px', borderRadius: '4px', fontWeight: 'bold' }}>{c.tag}</span>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{c.name}</div>
                <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>{c.desc}</div>
                <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '13px' }}>⭐ {c.price}</div>
              </div>
            ))}
          </div>

          {selectedCase && (
            <div style={{ marginTop: '20px', background: '#141418', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Открытие: {selectedCase.name}</h3>
              <div style={{ background: '#0a0a0c', padding: '15px', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' }}>
                {opening ? 'Крутим рулетку...' : wonItem ? `Выпало: ${wonItem.name} (+${wonItem.value} ⭐)` : 'Готово к открытию'}
              </div>
              <button onClick={() => handleOpenCase(selectedCase)} disabled={opening} style={{ width: '100%', padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                {opening ? 'Открываем...' : `Открыть за ⭐ ${selectedCase.price}`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Нижняя панель */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <button onClick={() => setActiveTab('main')} style={{ background: 'none', border: 'none', color: activeTab === 'main' ? '#3b82f6' : '#666', fontSize: '12px', fontWeight: 'bold' }}>🎁 Кейсы</button>
        <button onClick={() => setActiveTab('profile')} style={{ background: 'none', border: 'none', color: activeTab === 'profile' ? '#3b82f6' : '#666', fontSize: '12px', fontWeight: 'bold' }}>👤 Профиль</button>
      </div>

      {activeTab === 'profile' && (
        <div style={{ background: '#141418', padding: '16px', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Админка</h3>
          <p style={{ color: '#888', fontSize: '12px' }}>Чистая казна владельца: <strong style={{ color: '#10b981' }}>{houseTreasury} ⭐</strong></p>
        </div>
      )}
    </div>
  );
}
