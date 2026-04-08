// Serverless Function - Proxy para Groq API
// Esta função esconde a chave API do cliente e contorna problemas de CORS

export default async function handler(req, res) {
  // Apenas permitir métodos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar se há uma secret key básica (opcional, para proteção extra)
  const clientSecret = req.headers.authorization;
  const expectedSecret = process.env.API_SECRET;
  
  if (expectedSecret && clientSecret !== `Bearer ${expectedSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Obter chave API do ambiente
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    return res.status(500).json({ error: 'Groq API key not configured' });
  }

  try {
    const { prompt, ...bodyParams } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Fazer chamada para Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: bodyParams.model || 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: bodyParams.temperature || 0.7,
        max_tokens: bodyParams.max_tokens || 8192
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ 
        error: error.error?.message || 'Groq API error' 
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No content returned from Groq' });
    }

    // Retornar apenas o conteúdo
    return res.status(200).json({ content });

  } catch (error) {
    console.error('Groq proxy error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
