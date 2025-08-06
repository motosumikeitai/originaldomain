import React, { useState } from 'react';
import { coins } from '../data/coins';
import { TrayItem } from '../types';
import Coin from '../components/Coin';
import Tray from '../components/Tray';

const TrayMode: React.FC = () => {
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [availableCoins] = useState(coins);

  const totalAmount = trayItems.reduce((sum, item) => sum + item.coin.value, 0);

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

  const handleDragStart = (e: React.DragEvent, coinId: string) => {
    e.dataTransfer.setData('text/plain', coinId);
  };

  return (
    <div className="tray-mode p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        トレーモード
      </h2>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 所持金エリア */}
          <div className="wallet-area">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              所持金
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-wrap justify-center gap-4">
                {availableCoins.map((coin) => (
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
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  コインをクリックまたはドラッグしてトレーに置いてね！
                </p>
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

        {/* 合計表示 */}
        <div className="mt-8 text-center">
          <div className="bg-green-500 text-white rounded-2xl p-6 shadow-2xl inline-block">
            <h3 className="text-2xl font-bold mb-2">合計金額</h3>
            <div className="text-4xl font-bold">{totalAmount}円</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrayMode; 