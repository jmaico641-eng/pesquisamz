# 🔧 Configuração Persistente - PesquisaMZ

## 📋 Como Funciona

O sistema de configuração do PesquisaMZ tem **DUAS** opções:

---

### ✅ OPÇÃO 1: Atual (localStorage) - FUNCIONA AGORA

**Status:** ✅ 100% Funcional  
**Onde guardar:** Navegador do admin  
**Vantagem:** Simples, funciona imediatamente  
**Desvantagem:** Se limpar dados do navegador, perde configurações  

**Como usar:**
1. ⚙️ Admin → Configuração
2. Configurar Groq API, Anthropic API, Firebase
3. ✅ Guardar - Funciona imediatamente!

---

### 🚀 OPÇÃO 2: Servidor (Persistente) - RECOMENDADO

**Status:** ✅ Serverless function criada  
**Onde guardar:** Servidor Vercel (/tmp/pesquisamz-config.json)  
**Vantagem:** Configurações NÃO se perdem nunca  
**Desvantagem:** Requer configuração inicial  

### Como Ativar Opção 2 (Servidor):

#### Passo 1: Deploy da Serverless Function

```bash
cd /home/tiih/pesquisamz
chmod +x update-config.sh
./update-config.sh
```

#### Passo 2: Testar Endpoint

```bash
# Ver configurações
curl https://pesquisamz.vercel.app/api/config

# Guardar Groq API
curl -X POST https://pesquisamz.vercel.app/api/config \
  -H "Content-Type: application/json" \
  -d '{"adminPwd":"admin2024","groqKey":"gsk_TUA_CHAVE_AQUI"}'

# Guardar Anthropic API
curl -X POST https://pesquisamz.vercel.app/api/config \
  -H "Content-Type: application/json" \
  -d '{"adminPwd":"admin2024","anthropicKey":"sk-ant-TUA_CHAVE"}'

# Guardar Firebase
curl -X POST https://pesquisamz.vercel.app/api/config \
  -H "Content-Type: application/json" \
  -d '{
    "adminPwd":"admin2024",
    "firebase":{
      "apiKey":"AIzaSy...",
      "authDomain":"proj.firebaseapp.com",
      "projectId":"proj",
      "storageBucket":"proj.appspot.com",
      "messagingSenderId":"123",
      "appId":"1:123:web:abc"
    }
  }'
```

#### Passo 3: Verificar

```bash
curl https://pesquisamz.vercel.app/api/config
```

Deve retornar:
```json
{
  "success": true,
  "config": {
    "groq": { "enabled": true, "hasKey": true },
    "anthropic": { "enabled": true, "hasKey": true },
    "firebase": { "enabled": true, "hasKey": true, "projectId": "proj" },
    "whatsapp": { "adminPhone": "258856810532" },
    "lastUpdated": "2026-04-08T..."
  }
}
```

---

## 📁 Arquivos Criados

| Arquivo | Função |
|---------|--------|
| `api/config.js` | Serverless function para guardar/ler configs |
| `js/config-manager.js` | Cliente JavaScript para frontend |
| `update-config.sh` | Script de atualização |
| `CONFIGURACAO-SERVIDOR.md` | Este guia |

---

## 🎯 Recomendação

**Para agora:** Usa Opção 1 (localStorage) - já funciona!  
**Para produção:** Ativa Opção 2 (servidor) - configs persistentes  

---

## 🔒 Segurança

- Senha admin necessária para guardar configs (`admin2024`)
- Chaves API não são expostas no GET (apenas `enabled`/`hasKey`)
- Arquivo de config no servidor (/tmp) não é acessível publicamente

---

**Última atualização:** Abril 2026
