import React, { useState, useEffect } from 'react';
import { coins } from '../data/coins';
import { challenges } from '../data/challenges';
import { TrayItem } from '../types';
import Coin from '../components/Coin';
import Tray from '../components/Tray';

const ChallengeMode: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const totalAmount = trayItems.reduce((sum, item) => sum + item.coin.value, 0);

  useEffect(() => {
    // ランダムにチャレンジを選択
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randomIndex]);
  }, []);

  const handleAddToTray = (coinId: string) => {
    const coin = coins.find(c => c.id === coinId);
    if (coin) {
      const newItem: TrayItem = {
        id: `${coinId}-${Date.now()}`,
        coin,
        position: { x: 0, y: 0 }
      };
      setTrayItems(prev => [...prev, newItem]);
    }
  };

  const handleRemoveFromTray = (itemId: string) => {
    setTrayItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckAnswer = () => {
    const correct = totalAmount === currentChallenge.targetAmount;
    setIsCorrect(correct);
    setShowResult(true);
    setShowAnimation(true);

    // アニメーション効果
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  const handleNextChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randomIndex]);
    setTrayItems([]);
    setShowResult(false);
  };

  const handleDragStart = (e: React.DragEvent, coinId: string) => {
    e.dataTransfer.setData('text/plain', coinId);
  };

  return (
    <div className="challenge-mode p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        チャレンジモード
      </h2>
      
      <div className="max-w-6xl mx-auto">
        {/* チャレンジ表示 */}
        <div className="challenge-display bg-blue-500 text-white rounded-2xl p-6 shadow-2xl mb-8 text-center">
          <h3 className="text-2xl font-bold mb-2">お題</h3>
          <div className="text-3xl font-bold mb-4">{currentChallenge.description}</div>
          <div className="text-xl">目標: {currentChallenge.targetAmount}円</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 所持金エリア */}
          <div className="wallet-area">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              所持金
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-wrap justify-center gap-4">
                {coins.map((coin) => (
                  <div
                    key={coin.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, coin.id)}
                    onClick={() => handleAddToTray(coin.id)}
                    className="cursor-pointer"
                  >
                    <Coin coin={coin} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* トレーエリア */}
          <div className="tray-area">
            <Tray
              items={trayItems}
              onDrop={handleAddToTray}
              onRemove={handleRemoveFromTray}
              totalAmount={totalAmount}
            />
          </div>
        </div>

        {/* ボタンエリア */}
        <div className="mt-8 text-center">
          <button
            onClick={handleCheckAnswer}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl text-xl mr-4 transition-colors"
          >
            答え合わせ
          </button>
          <button
            onClick={handleNextChallenge}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-colors"
          >
            次の問題
          </button>
        </div>

        {/* 結果表示 */}
        {showResult && (
          <div className={`mt-8 text-center ${showAnimation ? 'animate-bounce' : ''}`}>
            <div className={`rounded-2xl p-6 shadow-2xl inline-block ${
              isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              <h3 className="text-2xl font-bold mb-2">
                {isCorrect ? '🎉 正解！' : '😅 もう一回チャレンジしてみよう'}
              </h3>
              <div className="text-xl">
                あなたの答え: {totalAmount}円
              </div>
              {!isCorrect && (
                <div className="text-lg mt-2">
                  正解: {currentChallenge.targetAmount}円
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeMode; 