// src/app/api/analyze/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Anthropic } from '@vercel/ai';

const ai = new Anthropic();

// Le prompt IA intégré pour PhishGuard Burundi
const SYSTEM_PROMPT = `Tu es "PhishGuard Burundi", un expert anti-phishing spécialisé dans les menaces ciblant les utilisateurs Burundais (SMS M-Pesa, E-mail urgent en Français, liens non burundais, etc.).

Ton objectif est d'analyser le texte soumis et de fournir un score de risque et des conseils de sécurité dans le format JSON *strictement* suivant :

{
  "risk": number, // Score de risque de phishing (0-100). Au-dessus de 50 = Phishing
  "type": string, // Type de menace (ex: 'M-Pesa fake', 'Urgence fiscale', 'Lien suspect')
  "reasons": string, // Explication concise des éléments suspects détectés (urgences, fautes, liens, etc.)
  "advice_fr": string, // Conseil de sécurité spécifique en français (ex: "Ne cliquez pas, appelez votre banque.")
  "advice_kirundi": string, // Conseil de sécurité spécifique en Kirundi (ex: "Gakuramye link, hamagara bank")
  "isPhishing": boolean // Déduis de 'risk': True si risk > 50.
}

Tu DOIS retourner le JSON uniquement. N'ajoute aucune autre explication ou texte avant ou après le JSON.`;

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input) {
      return new NextResponse(JSON.stringify({ error: 'Missing input text' }), { status: 400 });
    }

    const response = await ai.chat.completions.create({
      model: 'claude-3-5-sonnet', // Modèle performant pour le raisonnement et le JSON
      maxTokens: 512,
      temperature: 0.1,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analyse ce message pour détecter le phishing : "${input}"` },
      ],
      responseSchema: {
        type: 'json_object',
        properties: {
          risk: { type: 'number' },
          type: { type: 'string' },
          reasons: { type: 'string' },
          advice_fr: { type: 'string' },
          advice_kirundi: { type: 'string' },
          isPhishing: { type: 'boolean' },
        },
        required: ["risk", "type", "reasons", "advice_fr", "advice_kirundi", "isPhishing"],
      }
    });

    // Vercel AI SDK assure que la réponse est parsée
    const jsonText = response.choices[0].message.content;
    const result = JSON.parse(jsonText as string);

    // Ajout des données locales pour l'historique
    const finalResult = {
      ...result,
      originalInput: input,
      timestamp: Date.now(),
    };

    return NextResponse.json(finalResult);

  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
