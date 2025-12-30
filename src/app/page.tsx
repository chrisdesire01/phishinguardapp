// src/app/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnalysisResult } from '@/types/analysis';
import AnalysisResultComponent from '@/components/AnalysisResult';
import HistoryList from '@/components/HistoryList';
import { Search, Camera } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'phishGuardHistory';

const HomePage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Chargement de l'historique au montage
  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 2. Sauvegarde de l'historique
  const saveHistory = useCallback((newResult: AnalysisResult) => {
    setHistory(prevHistory => {
      const updatedHistory = [newResult, ...prevHistory].slice(0, 10); // Garder les 10 plus récents
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);

  // 3. Fonction d'analyse principale
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const newResult: AnalysisResult = await response.json();
      setResult(newResult);
      saveHistory(newResult); // Sauvegarder immédiatement
      setInput(''); // Effacer l'input
    } catch (err) {
      console.error('Analyse failed:', err);
      setError('Ikibazo mu gusesengura. (Erreur lors de l\'analyse par l\'IA). Vérifiez votre clé Anthropic.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Gestion de la caméra (Simulation mobile)
  const handleCameraCapture = () => {
    // Dans une vraie app mobile (React Native/Expo), on ouvrirait la caméra.
    // Ici, nous simulons l'intention d'uploader une capture d'écran.
    alert("Fonction de Caméra : Dans l'application mobile, elle permettrait de prendre une photo du SMS/E-mail à analyser.");
    // Vous pouvez ajouter un input file ici pour le support desktop.
  };

  // 5. Actions d'historique
  const handleSelectHistory = (item: AnalysisResult) => {
    setResult(item);
    // On ne met pas l'input pour ne pas le ré-analyser
  };

  const handleClearHistory = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setHistory([]);
    alert('Amateka yakuweho. (Historique effacé).');
  };

  const handleClearAnalysis = () => {
    setResult(null);
    setInput('');
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">🇧🇮 PhishGuard Burundi</h1>
        <p className="text-gray-600 mt-1 text-xl">
            Ikizigiti mu Kirundi (Votre bouclier anti-phishing)
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Formulaire de Saisie */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Copiez-collez ici le SMS, l'e-mail ou le lien suspect à analyser..."
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
            <div className='flex flex-col sm:flex-row gap-3'>
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex-grow flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 disabled:bg-blue-300"
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <Search className="w-5 h-5 mr-2" />
                    )}
                    Gusesengura (Analyser)
                </button>
                <button
                    type="button"
                    onClick={handleCameraCapture}
                    className="flex-shrink-0 flex justify-center items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-150"
                >
                    <Camera className="w-5 h-5 mr-2" /> Capturer (Mobile)
                </button>
            </div>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        </div>

        {/* Résultat de l'Analyse */}
        {result && (
          <AnalysisResultComponent 
            result={result} 
            onClear={handleClearAnalysis} 
            originalInput={result.originalInput} 
          />
        )}

        {/* Historique */}
        <HistoryList 
            history={history} 
            onSelect={handleSelectHistory} 
            onClearHistory={handleClearHistory} 
        />
      </main>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>Développé pour l'Hackathon Vercel AI par Team PhishGuard Burundi. Propulsé par Claude 3.5 Sonnet.</p>
      </footer>
    </div>
  );
};

export default HomePage;
