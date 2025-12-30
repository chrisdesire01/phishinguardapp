// src/components/HistoryList.tsx

import React from 'react';
import { AnalysisResult } from '@/types/analysis';
import { History, Clock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface HistoryListProps {
  history: AnalysisResult[];
  onSelect: (item: AnalysisResult) => void;
  onClearHistory: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="mt-8 p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
        <History className="w-6 h-6 mx-auto mb-2" />
        <p>Aka ni akabati k'amateka. Ibizoba vyasesenguwe bizokwama hano. (L'historique sera ici.)</p>
      </div>
    );
  }

  const getRiskIcon = (risk: number) => {
    if (risk >= 80) return <Zap className="w-4 h-4 text-red-600" />;
    if (risk >= 50) return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    return <CheckCircle className="w-4 h-4 text-green-600" />;
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <History className="w-5 h-5 mr-2" /> Amateka (Historique Local)
        </h2>
        <button 
          onClick={onClearHistory} 
          className="text-sm text-red-500 hover:text-red-700"
        >
          Gukuraho vyose (Effacer tout)
        </button>
      </div>
      <ul className="space-y-3">
        {history.map((item, index) => (
          <li
            key={index}
            onClick={() => onSelect(item)}
            className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-center"
          >
            <div>
              <div className="flex items-center font-semibold text-gray-900">
                {getRiskIcon(item.risk)}
                <span className="ml-2 truncate max-w-xs">{item.originalInput}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(item.timestamp).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
              </p>
            </div>
            <div className={`font-bold text-lg ${item.risk >= 50 ? 'text-red-600' : 'text-green-600'}`}>
              {item.risk}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
