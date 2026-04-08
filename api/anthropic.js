// Serverless Function - Proxy para Anthropic Claude API
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
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    return res.status(500).json({ error: 'Anthropic API key not configured' });
  }

  // Obter versão da API do ambiente ou usar padrão
  const apiVersion = process.env.ANTHROPIC_VERSION || '2023-06-01';

  try {
    const { prompt, ...bodyParams } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Fazer chamada para Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': apiVersion
      },
      body: JSON.stringify({
        model: bodyParams.model || 'claude-3-5-sonnet-20241022',
        max_tokens: bodyParams.max_tokens || 8192,
        temperature: bodyParams.temperature || 0.7,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ 
        error: error.error?.message || 'Anthropic API error' 
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      return res.status(500).json({ error: 'No content returned from Anthropic' });
    }

    // Retornar apenas o conteúdo
    return res.status(200).json({ content });

  } catch (error) {
    console.error('Anthropic proxy error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
