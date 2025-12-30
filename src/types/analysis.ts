export interface AnalysisResult {
  risk: number; // Score de risque (0-100)
  type: string; // Type de menace (ex: 'M-Pesa fake', 'Facture urgente')
  reasons: string; // Raisons de la détection
  advice_fr: string; // Conseil en Français
  advice_kirundi: string; // Conseil en Kirundi
  isPhishing: boolean; // True si le score est > 50
  originalInput: string; // Le texte original analysé
  timestamp: number; // Date de l'analyse
}

export interface AnalysisResponse {
  json: AnalysisResult;
}
