// Serverless Function - Configuração Persistente
// Armazena e recupera configurações do servidor (APIs, Firebase, etc.)

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de configurações (no diretório /tmp na Vercel)
const CONFIG_PATH = '/tmp/pesquisamz-config.json';

// Configurações padrão
const DEFAULT_CONFIG = {
  groq: { apiKey: '', enabled: false },
  anthropic: { apiKey: '', enabled: false },
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    enabled: false
  },
  whatsapp: { adminPhone: '258856810532' },
  lastUpdated: null
};

// Carregar configurações
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Erro ao carregar config:', e.message);
  }
  return DEFAULT_CONFIG;
}

// Guardar configurações
function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    return true;
  } catch (e) {
    console.error('Erro ao guardar config:', e.message);
    return false;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Recuperar configurações
  if (req.method === 'GET') {
    const config = loadConfig();
    // Retornar sem expor chaves completas (segurança)
    const safeConfig = {
      groq: { enabled: config.groq.enabled, hasKey: !!config.groq.apiKey },
      anthropic: { enabled: config.anthropic.enabled, hasKey: !!config.anthropic.apiKey },
      firebase: { 
        enabled: config.firebase.enabled, 
        hasKey: !!config.firebase.apiKey,
        projectId: config.firebase.projectId
      },
      whatsapp: config.whatsapp,
      lastUpdated: config.lastUpdated
    };
    return res.status(200).json({ success: true, config: safeConfig });
  }

  // POST - Guardar configurações (requer senha admin)
  if (req.method === 'POST') {
    const { adminPwd, groqKey, anthropicKey, firebase, whatsapp } = req.body;
    
    // Verificar senha admin (padrão: admin2024)
    if (adminPwd !== 'admin2024') {
      return res.status(401).json({ success: false, error: 'Senha admin inválida' });
    }

    const config = loadConfig();

    // Atualizar Groq
    if (groqKey !== undefined) {
      config.groq.apiKey = groqKey;
      config.groq.enabled = groqKey.length > 0 && groqKey.startsWith('gsk_');
    }

    // Atualizar Anthropic
    if (anthropicKey !== undefined) {
      config.anthropic.apiKey = anthropicKey;
      config.anthropic.enabled = anthropicKey.length > 0 && anthropicKey.startsWith('sk-ant-');
    }

    // Atualizar Firebase
    if (firebase !== undefined) {
      config.firebase = {
        ...config.firebase,
        ...firebase,
        enabled: !!(firebase.apiKey && firebase.apiKey !== 'SUA_API_KEY')
      };
    }

    // Atualizar WhatsApp
    if (whatsapp !== undefined) {
      config.whatsapp = { ...config.whatsapp, ...whatsapp };
    }

    config.lastUpdated = new Date().toISOString();

    const saved = saveConfig(config);
    if (!saved) {
      return res.status(500).json({ success: false, error: 'Erro ao guardar configurações' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Configurações guardadas com sucesso!',
      config: {
        groq: { enabled: config.groq.enabled, hasKey: !!config.groq.apiKey },
        anthropic: { enabled: config.anthropic.enabled, hasKey: !!config.anthropic.apiKey },
        firebase: { 
          enabled: config.firebase.enabled, 
          hasKey: !!config.firebase.apiKey,
          projectId: config.firebase.projectId
        },
        whatsapp: config.whatsapp,
        lastUpdated: config.lastUpdated
      }
    });
  }

  return res.status(405).json({ success: false, error: 'Método não permitido' });
}
