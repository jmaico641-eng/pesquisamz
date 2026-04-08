// Serverless Function - Proxy para Anthropic Claude API
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
  let apiKey = req.body?.apiKey || process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    res.status(500).json({ error: 'Anthropic API key not provided. Admin must configure it in ⚙️ Admin → Configuração.' });
    return;
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    // Timeout de 90 segundos (Claude pode demorar mais)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8192,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      res.status(response.status).json({ error: error.error?.message || 'Anthropic API error' });
      return;
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      res.status(500).json({ error: 'No content returned from Anthropic API' });
      return;
    }

    res.status(200).json({ content, provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' });

  } catch (error) {
    if (error.name === 'AbortError') {
      res.status(504).json({ error: 'Request timeout. Tente novamente.' });
    } else {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
};
