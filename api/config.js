// Serverless Function - Configuração do Sistema
// Usa variáveis de ambiente do Vercel (persistem para sempre)

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({ ok: true });
    return;
  }

  // GET - Retornar status das configurações
  if (req.method === 'GET') {
    const groqKey = process.env.GROQ_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const fbApiKey = process.env.FIREBASE_API_KEY;
    const fbProjectId = process.env.FIREBASE_PROJECT_ID;
    
    res.status(200).json({
      success: true,
      config: {
        groq: { 
          enabled: !!groqKey && groqKey.startsWith('gsk_'), 
          hasKey: !!groqKey,
          model: 'llama-3.3-70b-versatile'
        },
        anthropic: { 
          enabled: !!anthropicKey && anthropicKey.startsWith('sk-ant-'), 
          hasKey: !!anthropicKey,
          model: 'claude-3-5-sonnet-20241022'
        },
        firebase: { 
          enabled: !!fbApiKey && fbApiKey !== 'SUA_API_KEY', 
          hasKey: !!fbApiKey,
          projectId: fbProjectId || ''
        },
        whatsapp: {
          adminPhone: process.env.ADMIN_WHATSAPP || '258856810532'
        },
        lastUpdated: new Date().toISOString()
      },
      message: 'Configurações carregadas com sucesso'
    });
    return;
  }

  // POST - Atualizar variáveis de ambiente (requer senha admin)
  if (req.method === 'POST') {
    const { adminPwd } = req.body;
    
    // Verificar senha admin
    const expectedPwd = process.env.ADMIN_PASSWORD || 'admin2024';
    if (adminPwd !== expectedPwd) {
      res.status(401).json({ 
        success: false, 
        error: 'Senha admin inválida' 
      });
      return;
    }

    // Nota: As variáveis de ambiente no Vercel só podem ser alteradas via:
    // 1. Dashboard da Vercel
    // 2. Vercel CLI
    // 3. API da Vercel
    // 
    // Para simplicidade, as configs são guardadas no localStorage do admin
    // e o frontend envia as chaves diretamente para as funções proxy.
    //
    // Este endpoint serve apenas para verificar o status das configs.
    
    res.status(200).json({
      success: true,
      message: 'Para configurar APIs, usa o painel Admin → Configuração. As chaves são guardadas localmente e enviadas diretamente para os endpoints.',
      instructions: {
        groq: 'Obter em https://console.groq.com/keys',
        anthropic: 'Obter em https://console.anthropic.com/settings/keys',
        firebase: 'Obter em https://console.firebase.google.com'
      }
    });
    return;
  }

  // Método não permitido
  res.status(405).json({ success: false, error: 'Use GET ou POST' });
};
