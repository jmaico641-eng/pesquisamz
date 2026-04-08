# 🔧 Configuração de APIs - Guia Definitivo

## ✅ Status: APIs Corrigidas e Funcionais

**Última atualização:** Abril 2026  
**Versão:** 2.0 - JSON válido garantido  

---

## 📋 Como Funciona Agora

### Fluxo de Configuração:

```
1. Admin configura chaves API no painel ⚙️ → Guardadas no localStorage
2. Utilizador faz pedido de trabalho via frontend
3. Frontend envia prompt + apiKey para /api/groq ou /api/anthropic
4. Serverless function processa com a chave recebida
5. Resposta JSON retorna com o conteúdo gerado
```

### Arquitetura:

```
Frontend (index.html)
  ↓ (prompt + apiKey do localStorage)
/api/groq ou /api/anthropic (serverless functions)
  ↓ (chave API + prompt)
Groq API ou Anthropic API
  ↓ (conteúdo gerado)
Frontend → Exibe trabalho ao utilizador
```

---

## 🚀 Configuração Rápida (5 minutos)

### 1. Obter Chave Groq (GRÁTIS)

```
1. Acede: https://console.groq.com/keys
2. Cria conta (email + password)
3. Clica "Create API Key"
4. Copia a chave → começa com gsk_
```

### 2. Obter Chave Anthropic (OPCIONAL)

```
1. Acede: https://console.anthropic.com/settings/keys
2. Cria conta (email + password)
3. Clica "Create Key"
4. Copia a chave → começa com sk-ant-
```

### 3. Configurar no PesquisaMZ

```
1. Abre: https://pesquisamz.vercel.app
2. Clica: ⚙️ Admin → Password: admin2024
3. Vai a: ⚙️ Configuração
4. Cola a chave Groq → 💾 Guardar
5. (Opcional) Cola a chave Anthropic → 💾 Guardar
```

### 4. Testar

```
1. Clica: 🤖 IA
2. Deve mostrar: "⚡ Llama 3.3 70B ativo" ou "🧠 Claude 3.5 Sonnet ativo"
3. Preenche tema + descrição
4. Clica: ✨ Gerar Trabalho Completo
5. ✅ Trabalho gerado com sucesso!
```

---

## 🔧 Endpoints da API

### GET /api/config

```bash
curl https://pesquisamz.vercel.app/api/config
```

**Resposta:**
```json
{
  "success": true,
  "config": {
    "groq": { "enabled": true, "hasKey": true, "model": "llama-3.3-70b-versatile" },
    "anthropic": { "enabled": true, "hasKey": true, "model": "claude-3-5-sonnet-20241022" },
    "firebase": { "enabled": false, "hasKey": false, "projectId": "" },
    "whatsapp": { "adminPhone": "258856810532" }
  }
}
```

### POST /api/groq

```bash
curl -X POST https://pesquisamz.vercel.app/api/groq \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Escreve um texto sobre educação", "apiKey": "gsk_TUA_CHAVE"}'
```

**Resposta:**
```json
{
  "content": "Texto gerado pela IA...",
  "provider": "groq",
  "model": "llama-3.3-70b-versatile"
}
```

### POST /api/anthropic

```bash
curl -X POST https://pesquisamz.vercel.app/api/anthropic \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Escreve um texto sobre educação", "apiKey": "sk-ant-TUA_CHAVE"}'
```

**Resposta:**
```json
{
  "content": "Texto gerado pela IA...",
  "provider": "anthropic",
  "model": "claude-3-5-sonnet-20241022"
}
```

---

## ❓ Resolução de Problemas

### Erro: "This page is not valid JSON"

**Causa:** Endpoints não estavam configurados corretamente  
**Solução:** ✅ JÁ CORRIGIDO - vercel.json atualizado com rotas explícitas

### Erro: "Groq API key not provided"

**Causa:** Chave não configurada no admin  
**Solução:** ⚙️ Admin → Configuração → Colar chave Groq → 💾 Guardar

### Erro: "Request timeout"

**Causa:** IA demorou mais que 60s (Groq) ou 90s (Anthropic)  
**Solução:** Tenta novamente com descrição mais curta

### Erro: "Nenhuma IA configurada"

**Causa:** Nenhuma chave API guardada  
**Solução:** Configurar pelo menos Groq API (grátis)

---

## 🔒 Segurança

- ✅ Chaves API enviadas via HTTPS
- ✅ Chaves não expostas no GET /api/config
- ✅ Chaves guardadas no localStorage do admin (não público)
- ✅ CORS configurado para todos os origens (necessário para frontend)
- ✅ Timeouts configurados para evitar pendura

---

## 📁 Arquivos

| Arquivo | Função |
|---------|--------|
| `api/groq.js` | Proxy para Groq API |
| `api/anthropic.js` | Proxy para Anthropic API |
| `api/config.js` | Status das configurações |
| `vercel.json` | Rotas e configuração |
| `index.html` | Frontend completo |

---

**Última atualização:** Abril 2026  
**Status:** ✅ APIs funcionais e retornando JSON válido
