import React, { useState, useEffect, useRef } from 'react';

interface CaseItem {
  id: string;
  name: string;
  value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
}

interface CaseBox {
  id: string;
  name: string;
  price: number;
  tag: string;
  tagColor: string;
  themeDesc: string;
  items: CaseItem[];
}

export default function HustleCaseApp() {
  const [balance, setBalance] = useState<number>(300); // Баланс игрока
  const [demoBalance, setDemoBalance] = useState<number>(1500); // Демо баланс
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [houseTreasury, setHouseTreasury] = useState<number>(1200); // Твоя чистая казна (прибыль)
  const [activeTab, setActiveTab] = useState<'main' | 'tasks' | 'crash' | 'pvp' | 'modes' | 'profile'>('main');
  const [selectedCase, setSelectedCase] = useState<CaseBox | null>(null);
  const [opening, setOpening] = useState<boolean>(false);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Твои кейсы с точными ценами и NFT-подарками
  const casesList: CaseBox[] = [
    {
      id: '1',
      name: 'Snake Case',
      price: 99,
      tag: 'Старт',
      tagColor: '#10b981',
      themeDesc: 'Неоновый террариум со змеиными узорами.',
      items: [
        { id: 's1', name: 'Snake Box (Мусор)', value: 15, rarity: 'common', color: '#737373' },
        { id: 's2', name: 'Honey Bee Edition', value: 40, rarity: 'rare', color: '#a3a3a3' },
        { id: 's3', name: 'Lion Head Decor', value: 90, rarity: 'epic', color: '#3b82f6' },
        { id: 's4', name: 'Golden Snake Box #102365', value: 200, rarity: 'legendary', color: '#10b981' },
      ]
    },
    {
      id: '2',
      name: 'Sakura Case',
      price: 249,
      tag: 'Хит',
      tagColor: '#3b82f6',
      themeDesc: 'Ночной японский сад с лепестками сакуры.',
      items: [
        { id: 'sk1', name: 'Sakura Petal (Мусор)', value: 40, rarity: 'common', color: '#737373' },
        { id: 'sk2', name: 'Legionary Pattern', value: 90, rarity: 'rare', color: '#a3a3a3' },
        { id: 'sk3', name: 'Golden Sakura', value: 180, rarity: 'epic', color: '#ec4899' },
        { id: 'sk4', name: 'Sakura Flower #50757', value: 450, rarity: 'legendary', color: '#f59e0b' },
      ]
    },
    {
      id: '3',
      name: 'Cigar Case',
      price: 349,
      tag: 'Премиум',
      tagColor: '#f59e0b',
      themeDesc: 'Элитный лаунж-бар, дымные клубы Smoke Sway.',
      items: [
        { id: 'c1', name: 'Smoke Ash (Мусор)', value: 50, rarity: 'common', color: '#737373' },
        { id: 'c2', name: 'Porrige Pattern', value: 120, rarity: 'rare', color: '#a3a3a3' },
        { id: 'c3', name: 'Black Edition Cigar', value: 250, rarity: 'epic', color: '#f59e0b' },
        { id: 'c4', name: 'Snoop Cigar #9070', value: 600, rarity: 'legendary', color: '#ef4444' },
      ]
    },
    {
      id: '4',
      name: 'Rose Case',
      price: 499,
      tag: 'Люкс',
      tagColor: '#ec4899',
      themeDesc: 'Хрустальный купол, мистическая роза.',
      items: [
        { id: 'r1', name: 'Glass Dust (Мусор)', value: 80, rarity: 'common', color: '#737373' },
        { id: 'r2', name: 'Lovely Bra Pattern', value: 180, rarity: 'rare', color: '#a3a3a3' },
        { id: 'r3', name: 'Gentle Magic Rose', value: 350, rarity: 'epic', color: '#ec4899' },
        { id: 'r4', name: 'Eternal Rose #21310', value: 900, rarity: 'legendary', color: '#8b5cf6' },
      ]
    },
    {
      id: '5',
      name: 'Ring Case',
      price: 700,
      tag: 'ТОП',
      tagColor: '#8b5cf6',
      themeDesc: 'Кибернетический оникс с красной подсветкой.',
      items: [
        { id: 'rn1', name: 'Onyx Fragment (Мусор)', value: 100, rarity: 'common', color: '#737373' },
        { id: 'rn2', name: 'Mountain Lion Detail', value: 250, rarity: 'rare', color: '#a3a3a3' },
        { id: 'rn3', name: 'Onyx Demon Ring', value: 500, rarity: 'epic', color: '#3b82f6' },
        { id: 'rn4', name: 'Signet Ring #10163', value: 1400, rarity: 'legendary', color: '#fbbf24' },
      ]
    },
  ];

  const [liveDrops] = useState<string[]>(['🐍', '🌸', '🚬', '🌹', '💍', '⭐']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedY: (Math.random() - 0.5) * 0.2,
      speedX: (Math.random() - 0.5) * 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // ЖЕСТКИЙ АЛГОРИТМ СЛИВА И ОКУПАЕМОСТИ
  const handleOpenCase = (caseBox: CaseBox) => {
    const currentActiveBalance = isDemo ? demoBalance : balance;

    if (currentActiveBalance < caseBox.price) {
      alert(isDemo ? 'Демо-баланс пуст!' : 'Недостаточно звезд! Пополни баланс, чтобы продолжить игру.');
      return;
    }

    setSelectedCase(caseBox);
    setOpening(true);
    setWonItem(null);

    // Списываем средства у игрока
    if (isDemo) {
      setDemoBalance((prev) => prev - caseBox.price);
    } else {
      setBalance((prev) => prev - caseBox.price);
      // Сразу забираем себе в казну большую часть (гарантированный процент владельцу)
      setHouseTreasury((prev) => prev + caseBox.price);
    }

    setTimeout(() => {
      const rand = Math.random() * 100;
      let chosenItem: CaseItem;

      // 88% шансов, что игрок получает дешевый мусор (глубокий минус для него, чистый плюс для тебя)
      if (rand < 88) {
        chosenItem = caseBox.items[0]; 
      } 
      // 10% шансов небольшой возврат (около половины стоимости)
      else if (rand < 98) {
        chosenItem = caseBox.items[1];
      } 
      // 2% редчайший шанс на крупный выигрыш, НО ТОЛЬКО ЕСЛИ КАЗНА ПОЗВОЛЯЕТ ВЫПЛАТИТЬ
      else {
        const topItem = caseBox.items[3];
        if (isDemo || houseTreasury >= topItem.value) {
          chosenItem = topItem;
          if (!isDemo) {
            setHouseTreasury((prev) => prev - topItem.value); // Выплата из твоей казны
          }
        } else {
          // Если казна пуста — система глушит крупный дроп и выдает утешительный
          chosenItem = caseBox.items[2];
        }
      }

      // Начисляем игроку его скромный выигрыш
      if (isDemo) {
        setDemoBalance((prev) => prev + chosenItem.value);
      } else {
        setBalance((prev) => prev + chosenItem.value);
      }

      setWonItem(chosenItem);
      setOpening(false);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0f',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '90px',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Шапка */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        borderBottom: '1px solid #1a1a1e',
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(13, 13, 15, 0.85)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#26262b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🦍</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>Hustle Case</div>
            <div style={{ fontSize: '10px', color: '#888' }}>
              {isDemo ? <span style={{ color: '#f59e0b' }}>🎮 ДЕМО</span> : <>Твоя казна (прибыль): <span style={{ color: '#10b981' }}>{houseTreasury} ⭐</span></>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsDemo(!isDemo)}
            style={{
              background: isDemo ? '#f59e0b' : '#222',
              border: '1px solid #333',
              color: isDemo ? '#000' : '#aaa',
              padding: '6px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isDemo ? 'DEMO ON' : 'DEMO OFF'}
          </button>

          <div style={{ background: '#1a1a1e', border: '1px solid #2d2d35', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, color: isDemo ? '#f59e0b' : '#fff' }}>
            ⭐ {isDemo ? demoBalance : balance}
          </div>

          <button 
            onClick={() => isDemo ? setDemoBalance(prev => prev + 500) : setBalance(prev => prev + 250)}
            style={{ background: '#3b82f6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Пополнить баланс"
          >
            +
          </button>
        </div>
      </header>

      {/* LIVE-лента */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '10px 16px',
        overflowX: 'auto',
        backgroundColor: '#121216',
        borderBottom: '1px solid #1a1a1e',
        position: 'relative',
        zIndex: 2,
        scrollbarWidth: 'none'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#3b82f6', display: 'flex', alignItems: 'center' }}>LIVE</div>
        {liveDrops.map((drop, idx) => (
          <div key={idx} style={{ minWidth: '36px', height: '36px', backgroundColor: '#1a1a1e', border: '1px solid #2d2d35', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            {drop}
          </div>
        ))}
      </div>

      {/* Контент */}
      <main style={{ padding: '16px', position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto' }}>
        {activeTab === 'main' && (
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: '#aaa' }}>
              {isDemo ? '🎮 Демо-режим (проверка слива)' : 'Кейсы с защитой и процентом владельца'}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {casesList.map((caseBox) => (
                <div 
                  key={caseBox.id}
                  onClick={() => handleOpenCase(caseBox)}
                  style={{
                    backgroundColor: '#141418',
                    border: '1px solid #222228',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: caseBox.tagColor, color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                    {caseBox.tag}
                  </span>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{caseBox.name.includes('Cigar') ? '🚬' : caseBox.name.includes('Sakura') ? '🌸' : caseBox.name.includes('Snake') ? '🐍' : caseBox.name.includes('Rose') ? '🌹' : '💍'}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{caseBox.name}</div>
                  <div style={{ fontSize: '10px', color: '#777', marginBottom: '8px', lineHeight: '1.2' }}>{caseBox.themeDesc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 800, color: '#fbbf24' }}>
                    ⭐ {caseBox.price}
                  </div>
                </div>
              ))}
            </div>

            {/* Блок открытия кейса */}
            {selectedCase && (
              <div style={{
                marginTop: '20px',
                backgroundColor: '#141418',
                border: `1px solid ${isDemo ? '#f59e0b' : '#3b82f6'}`,
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>
                  {isDemo ? '🎮 [DEMO] ' : ''}Открытие: {selectedCase.name}
                </h3>
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '15px' }}>{selectedCase.themeDesc}</p>

                <div style={{ height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0c', borderRadius: '8px', marginBottom: '15px', border: '1px dashed #333', padding: '0 10px' }}>
                  {opening ? (
                    <span style={{ color: '#888', fontSize: '13px' }}>Игрок сливает банк в твою пользу... 🎲</span>
                  ) : wonItem ? (
                    <>
                      <span style={{ fontSize: '11px', color: wonItem.color, fontWeight: 700, textTransform: 'uppercase' }}>Результат ({wonItem.rarity}):</span>
                      <span style={{ fontWeight: 800, color: '#fff', fontSize: '14px' }}>{wonItem.name} <span style={{ color: '#ef4444' }}>(+{wonItem.value} ⭐)</span></span>
                    </>
                  ) : (
                    <span style={{ color: '#666', fontSize: '13px' }}>Нажми, чтобы запустить слив</span>
                  )}
                </div>

                <button
                  onClick={() => handleOpenCase(selectedCase)}
                  disabled={opening}
                  style={{ width: '100%', padding: '12px', backgroundColor: isDemo ? '#f59e0b' : '#3b82f6', color: isDemo ? '#000' : '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {opening ? 'Крутим...' : `Открыть за ⭐ ${selectedCase.price} ${isDemo ? '(Демо)' : ''}`}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tasks' && <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Задания в разработке...</div>}
        {activeTab === 'crash' && <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Краш в разработке...</div>}
        {activeTab === 'pvp' && <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>PvP в разработке...</div>}
        {activeTab === 'modes' && <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Режимы в разработке...</div>}
        {activeTab === 'profile' && (
          <div style={{ backgroundColor: '#141418', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Кабинет владельца (Админка)</h3>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>
              Твоя чистая прибыль (Казна): <strong style={{ color: '#10b981', fontSize: '16px' }}>{houseTreasury} ⭐</strong>
            </p>
            <p style={{ color: '#666', fontSize: '11px', lineHeight: '1.4' }}>
              Игроки стабильно сливают баланс. Когда накопится достаточный процент, ты сможешь сделать выплату победителю или забрать звезды себе.
            </p>
          </div>
        )}
      </main>

      {/* Нижняя навигация */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(15, 15, 19, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #1a1a1e',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        zIndex: 10
      }}>
        {[
          { id: 'main', label: 'Главная', icon: '🎁' },
          { id: 'tasks', label: 'Задания', icon: '📋' },
          { id: 'crash', label: 'Краш', icon: '🚀' },
          { id: 'pvp', label: 'PVP', icon: '⚔️' },
          { id: 'modes', label: 'Режимы', icon: '🎲' },
          { id: 'profile', label: 'Профиль', icon: '👤' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab.id ? '#3b82f6' : '#666',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '18px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
