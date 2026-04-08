// =====================================================
// SISTEMA DE CONFIGURAÇÃO PERSISTENTE - PesquisaMZ
// Configurações guardadas no SERVIDOR (não localStorage)
// =====================================================

let SERVER_CONFIG = {
  groq: { enabled: false, hasKey: false },
  anthropic: { enabled: false, hasKey: false },
  firebase: { enabled: false, hasKey: false, projectId: '' },
  whatsapp: { adminPhone: '258856810532' },
  lastUpdated: null
};

// Carregar configurações do servidor
async function loadServerConfig() {
  try {
    const r = await fetch('/api/config');
    if (r.ok) {
      const data = await r.json();
      if (data.success) {
        SERVER_CONFIG = data.config;
        console.log('✅ Configurações carregadas do servidor');
        return true;
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar config do servidor:', e.message);
  }
  return false;
}

// Guardar configurações no servidor
async function saveServerConfig(updates, adminPwd) {
  try {
    const r = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPwd, ...updates })
    });
    const data = await r.json();
    if (data.success) {
      SERVER_CONFIG = data.config;
      return { success: true, message: data.message, config: data.config };
    }
    return { success: false, error: data.error || 'Erro ao guardar' };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Obter IA disponível (prioridade: Anthropic > Groq)
function getAvailableAI() {
  if (SERVER_CONFIG.anthropic.enabled && SERVER_CONFIG.anthropic.hasKey) {
    return { provider: 'anthropic', name: 'Claude', enabled: true };
  }
  if (SERVER_CONFIG.groq.enabled && SERVER_CONFIG.groq.hasKey) {
    return { provider: 'groq', name: 'Llama', enabled: true };
  }
  return { provider: null, name: 'Nenhuma', enabled: false };
}
