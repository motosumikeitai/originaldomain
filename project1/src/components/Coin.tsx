import React from 'react';
import { Coin as CoinType } from '../types';

interface CoinProps {
  coin: CoinType;
  onClick?: () => void;
  draggable?: boolean;
  className?: string;
}

const Coin: React.FC<CoinProps> = ({ coin, onClick, draggable = false, className = '' }) => {
  return (
    <div
      className={`coin cursor-pointer transition-transform hover:scale-110 ${className}`}
      onClick={onClick}
      draggable={draggable}
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: coin.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #B8860B',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        margin: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000'
      }}
    >
      <div className="text-center">
        <div className="text-lg font-bold">{coin.name}</div>
        <div className="text-sm">{coin.value}円</div>
      </div>
    </div>
  );
};

export default Coin; 