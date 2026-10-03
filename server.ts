import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint: AI Tutor for French 5ème
app.post('/api/tutor/explain', async (req, res) => {
  const { question, subject, context } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'La question est requise.' });
  }

  // System instruction tailored for French 5ème (Cycle 4)
  const systemInstruction = `Tu es un professeur pédagogue, enthousiaste et bienveillant pour des collégiens en classe de 5ème en France (élèves de 12-13 ans, Cycle 4 de l'Éducation Nationale).
Matière concernée : ${subject || 'Général 5ème'}.

Consignes impératives :
1. Reste toujours simple, positif et encourageant.
2. Décompose ton explication en 2 ou 3 étapes claires avec des puces ou des numéros.
3. Utilise une analogie concrète tirée du quotidien des ados (sport, jeux vidéo, cuisine, météo, smartphones).
4. Termine par une petite phrase mémo ou une astuce pour ne plus hésiter en contrôle.
5. Ne fais pas de longs pavés : reste concis, dynamique et aéré.`;

  try {
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        explanation: `💡 Explication pédagogique pour la 5ème (${subject}) :
Pour bien réussir cette question, voici la méthode pas-à-pas :
1. Identifie d'abord les mots-clés et les données de l'énoncé.
2. Fais le lien avec la règle essentielle du cours.
3. Vérifie toujours le résultat avec du bon sens !

Astuce mémo : Pense à toujours écrire tes calculs ou schémas étape par étape sur ton brouillon avant de rédiger au propre !`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Question posée par un élève de 5ème : "${question}".
${context ? `Contexte supplémentaire : ${context}` : ''}
Explique-lui avec bienveillance, clarté et un exemple concret.`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const explanation = response.text || "Je n'ai pas pu formuler d'explication pour l'instant.";
    return res.json({ explanation });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Erreur lors de la génération de la réponse du tuteur.',
      details: error?.message || 'Erreur inconnue',
    });
  }
});

// Start Express Server
async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    // Mount Vite dev middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
