// Serverless Function - Proxy para Groq API
// Retorna JSON válido sempre

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({ ok: true });
    return;
  }

  // Apenas POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  // Obter chave API do corpo da requisição ou do ambiente
  let apiKey = req.body?.apiKey || process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    res.status(500).json({ error: 'Groq API key not provided. Admin must configure it in ⚙️ Admin → Configuração.' });
    return;
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    // Timeout de 60 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 8192
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      res.status(response.status).json({ error: error.error?.message || 'Groq API error' });
      return;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      res.status(500).json({ error: 'No content returned from Groq API' });
      return;
    }

    res.status(200).json({ content, provider: 'groq', model: 'llama-3.3-70b-versatile' });

  } catch (error) {
    if (error.name === 'AbortError') {
      res.status(504).json({ error: 'Request timeout. Tente novamente.' });
    } else {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
};
