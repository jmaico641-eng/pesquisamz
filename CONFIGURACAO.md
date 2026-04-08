# 🔧 Guia de Configuração - PesquisaMZ

## 📋 Passo-a-Passo para Colocar em Produção

### 1️⃣ Configurar Variáveis de Ambiente na Vercel

1. **Acede ao dashboard da Vercel:**
   - https://vercel.com/dashboard
   - Seleciona o projeto `pesquisamz`

2. **Vai a Settings → Environment Variables**

3. **Adiciona estas variáveis:**

   | Variável | Onde Obter | Exemplo |
   |----------|------------|---------|
   | `GROQ_API_KEY` | https://console.groq.com/keys | `gsk_abc123...` |
   | `ANTHROPIC_API_KEY` | https://console.anthropic.com/settings/keys | `sk-ant-abc123...` |
   | `ANTHROPIC_VERSION` | (opcional) | `2023-06-01` |

4. **Para obter chaves API:**

   **Groq (Gratuito):**
   ```
   1. Cria conta em https://console.groq.com
   2. Vai a "API Keys"
   3. Clica "Create API Key"
   4. Copia a chave (começa com `gsk_`)
   ```

   **Anthropic (Requer conta):**
   ```
   1. Cria conta em https://console.anthropic.com
   2. Vai a "Settings" → "API Keys"
   3. Clica "Create Key"
   4. Copia a chave (começa com `sk-ant-`)
   ```

### 2️⃣ Fazer Deploy

```bash
cd /home/tiih/pesquisamz
git add .
git commit -m "feat: adicionar serverless functions para proxy de APIs"
git push origin master
```

O deploy automático da Vercel vai ativar as funções serverless.

### 3️⃣ Testar as Serverless Functions

Após o deploy, testa:

```bash
# Testar Groq proxy
curl -X POST https://pesquisamz.vercel.app/api/groq \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Diz olá"}'

# Testar Anthropic proxy
curl -X POST https://pesquisamz.vercel.app/api/anthropic \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Diz olá"}'
```

### 4️⃣ Configurar Firebase (Opcional)

Se quiseres usar Firebase para dados em cloud:

1. **Cria projeto em:** https://console.firebase.google.com

2. **Ativa Firestore Database:**
   - Vai a "Firestore Database"
   - Clica "Create Database"
   - Escolhe "Start in test mode"

3. **Ativa Storage:**
   - Vai a "Storage"
   - Clica "Get Started"

4. **Obtém credenciais:**
   - Vai a "Project Settings" (⚙️)
   - Scroll até "Your apps"
   - Clica no ícone web `</>`
   - Copia o `firebaseConfig`

5. **Adiciona variáveis na Vercel:**
   ```
   FIREBASE_API_KEY=...
   FIREBASE_AUTH_DOMAIN=...
   FIREBASE_PROJECT_ID=...
   FIREBASE_STORAGE_BUCKET=...
   FIREBASE_MESSAGING_SENDER_ID=...
   FIREBASE_APP_ID=...
   ```

### 5️⃣ Configurar Pagamentos (Futuro)

Para pagamentos automáticos com M-Pesa:

1. **Registar em:** https://developer.mpesa.vm.co.mz
2. **Obter API credentials**
3. **Criar serverless function** para processar pagamentos
4. **Adicionar webhook** para confirmações automáticas

---

## 🔒 Segurança

### ✅ O que está protegido:
- ✅ Chaves API escondidas no servidor
- ✅ CORS resolvido via serverless functions
- ✅ .env no .gitignore (nunca commitado)
- ✅ Requests validados antes de processar

### ⚠️ O que precisa melhorar:
- [ ] Adicionar autenticação no admin
- [ ] Rate limiting nas APIs
- [ ] Logging de erros (Sentry)
- [ ] Sistema de pagamentos real

---

## 📊 Estrutura de Arquivos

```
pesquisamz/
├── api/
│   ├── groq.js          # Proxy Groq API
│   └── anthropic.js     # Proxy Anthropic API
├── index.html           # Frontend completo
├── vercel.json          # Configuração deploy
├── .env.example         # Template variáveis
├── .gitignore           # Ignorar .env
└── CONFIGURACAO.md      # Este ficheiro
```

---

## 🚀 URLs Úteis

- **Site:** https://pesquisamz.vercel.app
- **API Groq:** https://pesquisamz.vercel.app/api/groq
- **API Anthropic:** https://pesquisamz.vercel.app/api/anthropic
- **GitHub:** https://github.com/jmaico641-eng/pesquisamz

---

## ❓ Resolução de Problemas

### Erro: "Groq API key not configured"
**Solução:** Adiciona `GROQ_API_KEY` nas variáveis de ambiente da Vercel

### Erro: "Anthropic API error"
**Solução:** Verifica se `ANTHROPIC_API_KEY` está correta e ativa

### Erro de CORS
**Solução:** As serverless functions já resolvem isto. Usa `/api/groq` e `/api/anthropic`

### Deploy falhou
**Solução:** Verifica os logs em Vercel → Deployments → View Build Logs

---

## 💰 Custos Estimados

| Serviço | Plano Gratuito | Custo Extra |
|---------|---------------|-------------|
| Vercel | ✅ Incluído | $0 |
| Groq API | 30 req/min | $0 (gratuito) |
| Anthropic | $5 crédito inicial | ~$0.02/trabalho |
| Firebase | 1GB storage | $0 até 50k utilizadores |

**Total estimado:** $0-5/mês para uso normal

---

**Última atualização:** Abril 2026
