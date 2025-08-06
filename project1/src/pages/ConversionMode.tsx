import React, { useState } from 'react';
import { coins } from '../data/coins';
import Coin from '../components/Coin';

const ConversionMode: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);

  const getConversionText = (baseCoin: typeof coins[0], targetCoin: typeof coins[0]) => {
    if (baseCoin.value === targetCoin.value) return '同じ金額です';
    if (baseCoin.value > targetCoin.value) {
      const count = Math.floor(baseCoin.value / targetCoin.value);
      return `${count}枚`;
    } else {
      const count = Math.floor(targetCoin.value / baseCoin.value);
      return `${count}枚`;
    }
  };

  return (
    <div className="conversion-mode p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        お金の換算モード
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-4 text-white">
            コインを選んでね！
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {coins.map((coin) => (
              <div
                key={coin.id}
                onClick={() => setSelectedCoin(coin)}
                className={`cursor-pointer transition-all ${
                  selectedCoin.id === coin.id ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <Coin coin={coin} />
              </div>
            ))}
          </div>
        </div>

        <div className="conversion-result bg-white rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {selectedCoin.name}は他のコインで何枚分？
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className={`text-center p-4 rounded-lg ${
                  coin.id === selectedCoin.id
                    ? 'bg-yellow-200 border-2 border-yellow-400'
                    : 'bg-gray-100'
                }`}
              >
                <Coin coin={coin} />
                <div className="mt-2 text-lg font-bold text-gray-700">
                  {getConversionText(selectedCoin, coin)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-xl font-bold text-green-600">
              {selectedCoin.name} = {selectedCoin.value}円
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionMode; 