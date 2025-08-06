import React from 'react';
import { TrayItem } from '../types';
import Coin from './Coin';

interface TrayProps {
  items: TrayItem[];
  onDrop?: (coinId: string) => void;
  onRemove?: (itemId: string) => void;
  totalAmount: number;
}

const Tray: React.FC<TrayProps> = ({ items, onDrop, onRemove, totalAmount }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const coinId = e.dataTransfer.getData('text/plain');
    onDrop?.(coinId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="tray-container">
      <div
        className="tray bg-yellow-100 border-4 border-yellow-400 rounded-lg p-6 min-h-48 relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          border: '4px solid #F59E0B',
          borderRadius: '16px',
          minHeight: '200px',
          position: 'relative'
        }}
      >
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-yellow-800">トレー</h3>
          <div className="text-3xl font-bold text-green-600 mt-2">
            合計: {totalAmount}円
          </div>
        </div>
        
        <div className="coins-area flex flex-wrap justify-center items-center min-h-32">
          {items.length === 0 ? (
            <div className="text-gray-500 text-lg">コインをここに置いてね！</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="relative">
                <Coin
                  coin={item.coin}
                  onClick={() => onRemove?.(item.id)}
                  className="transform hover:scale-105"
                />
                <button
                  onClick={() => onRemove?.(item.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tray; 