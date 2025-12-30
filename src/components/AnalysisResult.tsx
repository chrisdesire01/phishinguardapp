// src/components/AnalysisResult.tsx

import React from 'react';
import { AnalysisResult } from '@/types/analysis';
import { Zap, Shield, AlertTriangle, CheckCircle, Share2, Clipboard } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalysisResult | null;
  onClear: () => void;
  originalInput: string;
}

const getRiskColor = (risk: number) => {
  if (risk >= 80) return { bg: 'bg-red-600', text: 'text-red-600', icon: Zap };
  if (risk >= 50) return { bg: 'bg-orange-500', text: 'text-orange-500', icon: AlertTriangle };
  if (risk >= 20) return { bg: 'bg-yellow-500', text: 'text-yellow-500', icon: Shield };
  return { bg: 'bg-green-600', text: 'text-green-600', icon: CheckCircle };
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onClear, originalInput }) => {
  if (!result) return null;

  const { risk, type, reasons, advice_fr, advice_kirundi, isPhishing } = result;
  const { bg, text, icon: Icon } = getRiskColor(risk);

  const whatsappMessage = `🚨 PhishGuard Burundi 🚨
*Analyse d'un message suspect*
Score de Risque: ${risk}%
Type: ${type}
---
**🚨 IMENYETSO (ALERTE) :** ${isPhishing ? 'ICO NI PHISHING! USIBAMYE!' : 'Urukundo ruri hasi. Birashoboka cane.'}
---
**Ingingo zo kwitwararika (Conseils Kirundi):**
${advice_kirundi}

**Conseil (Français):**
${advice_fr}
---
*Texte original:* ${originalInput.substring(0, 100)}...
`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(whatsappMessage);
    alert('Rapport copié dans le presse-papiers !');
  };

  // Création du titre d'alerte en Kirundi/Français
  const alertTitle = isPhishing 
    ? "🚨 ICO NI PHISHING! USIBAMYE! (Ceci est un Phishing ! Ne cliquez pas !)"
    : "✅ Message Sûr Probable (Risk Faible)";

  return (
    <div className={`p-4 md:p-6 rounded-xl shadow-2xl mt-8 ${bg}/10 border-4 ${bg.replace('bg-', 'border-')}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-2xl font-extrabold flex items-center ${text}`}>
          <Icon className="w-6 h-6 mr-2" />
          {alertTitle}
        </h2>
        <button 
          onClick={onClear} 
          className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition"
        >
          &times; Nouveau
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-600">Score de Risque</p>
          <div className="text-5xl font-black mt-1" style={{ color: getRiskColor(risk).bg.split('-')[1] }}>
            {risk}%
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-medium text-gray-600">Type de Menace</p>
          <p className="text-xl font-semibold mt-1">{type}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span className={text}>Ibimenyetso (Raisons de la Détection)</span>
        </h3>
        <p className="text-gray-700 italic">{reasons}</p>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gray-50 border">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Ingingo zo Kwitwararika (Conseils)
        </h3>
        <p className="mt-1 text-gray-700">
          <strong className="text-blue-700">🇫🇷 Français :</strong> {advice_fr}
        </p>
        <p className="mt-2 text-gray-700">
          <strong className="text-green-700">🇧🇮 Kirundi :</strong> {advice_kirundi}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-150"
        >
          <Share2 className="w-4 h-4 mr-2" /> Partager (WhatsApp)
        </button>
        <button
          onClick={handleCopyReport}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-150"
        >
          <Clipboard className="w-4 h-4 mr-2" /> Copier Rapport
        </button>
        {/* L'export PDF est plus complexe et est laissé comme un 'futur' pour l'hackathon */}
      </div>
    </div>
  );
};

export default AnalysisResult;
