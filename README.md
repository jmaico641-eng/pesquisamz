# 📚 PesquisaMZ — Repositório Académico de Moçambique

> Plataforma completa para pesquisar, gerar e submeter trabalhos académicos com IA.

**Desenvolvedor:** Junir Maico Jorge  
**Versão:** 2.0  
**Licença:** MIT

---

## 🚀 Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔍 **Pesquisa Avançada** | Por título, autor, área, universidade, faculdade, nível |
| 📄 **Repositório** | Documentos de 9 universidades moçambicanas |
| 💰 **Pagamento WhatsApp** | M-Pesa, e-Mola, mKesh via WhatsApp Business |
| 🤖 **Gerador IA** | Claude Sonnet 4 para estruturas de trabalhos |
| 🎓 **Cursos Online** | 12 cursos com planos gerados por IA |
| 💼 **Carteira** | Autores ganham 30 MZN por download |
| ⚙️ **Painel Admin** | Dashboard, configurações, gestão completa |
| 📱 **100% Responsivo** | Android, Tablet, Laptop, Desktop |

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Base de Dados:** IndexedDB (local) + Supabase (cloud, opcional)
- **IA:** Anthropic Claude (Sonnet 4)
- **Deploy:** Vercel (automático via GitHub)
- **Analytics:** Google Analytics 4

---

## 📋 Configuração Inicial

### 1. Supabase (Backend Partilhado) — OPCIONAL mas RECOMENDADO

1. Cria conta em https://supabase.com
2. Cria novo projeto: `pesquisamz`
3. Vai a **SQL Editor** e executa:

```sql
-- Tabela de documentos
CREATE TABLE documents (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano INTEGER,
  nivel TEXT,
  area TEXT,
  uni TEXT,
  fac TEXT,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de utilizadores
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE,
  role TEXT DEFAULT 'user',
  balance NUMERIC DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura pública" ON documents FOR SELECT USING (true);
CREATE POLICY "Inserção pública" ON documents FOR INSERT WITH CHECK (true);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura próprios dados" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Inserção próprios dados" ON users FOR INSERT WITH CHECK (auth.uid() = id);
```

4. **Ativar Phone Auth:**
   - Vai a **Authentication → Providers**
   - Ativa **Phone** 
   - Em **Test mode** (para desenvolvimento, sem SMS real)

5. Vai a **Settings → API** e copia:
   - Project URL → `https://xxxxx.supabase.co`
   - anon public key → `eyJhbG...`

6. No ficheiro `index.html`, substitui:
```javascript
const SUPABASE_URL='https://SEU_PROJECTO.supabase.co';  // ← Teu URL
const SUPABASE_KEY='SUA_ANON_KEY';                      // ← Tua chave
```

### 2. Anthropic Claude API (Gerador IA)

1. Cria conta em https://console.anthropic.com
2. Vai a **Settings → API Keys**
3. Cria nova chave
4. No site: clica **⚙️ Admin** → aba **🤖 IA Config** → cola a chave

### 3. Google Analytics 4 (Opcional)

1. Cria conta em https://analytics.google.com
2. Cria propriedade: `PesquisaMZ`
3. Copia o Measurement ID (formato `G-XXXXXXX`)
4. No `index.html`, substitui `G-XXXXXXXXXX` pelo teu ID

### 4. Número WhatsApp

1. Abre o site → **⚙️ Admin** → aba **⚙️ Configurações**
2. Secção **💬 Pagamento via WhatsApp**
3. Insere teu número: `25884XXXXXXX`
4. Clica **💾 Guardar Número**

---

## 🗄️ Base de Dados

### Estrutura

| Store | Campos | Uso |
|---|---|---|
| `documents` | id, title, autor, ano, nivel, area, uni, fac | Documentos académicos |
| `settings` | key, value | Configurações do sistema |
| `users` | id, name, phone, role, balance | Utilizadores |
| `courses` | id, title, area, level, price | Cursos personalizados |
| `purchases` | id, userId, docId, createdAt | Histórico de compras |

### Backup / Restore

No painel admin → aba **⚙️ Configurações** → secção **🗄️ Base de Dados**:
- **📥 Exportar Dados** → Download JSON
- **📤 Importar Dados** → Upload JSON de backup

---

## 🌐 Deploy

### Via Vercel (Recomendado)

1. Push para GitHub já feito ✅
2. Vai a https://vercel.com → **Add New Project**
3. Seleciona `pesquisamz` → **Deploy**
4. Pronto! URL: `https://pesquisamz.vercel.app`

### Deploy automático

Cada push para `master` faz deploy automático na Vercel em ~1 minuto.

---

## 🔐 Painel Admin

**Acesso:** Clica em **⚙️ Admin** na navbar (texto dourado)  
**Password padrão:** `admin2024` (alterar nas configurações!)

### Abas disponíveis:

| Aba | Funcionalidades |
|---|---|
| 📊 Dashboard | Estatísticas, receita, actividade recente |
| ⚙️ Configurações | Nome, preço, WhatsApp, export/import DB |
| 📄 Documentos | Listar, eliminar documentos |
| 👤 Utilizadores | Listar, editar saldo, eliminar |
| 🎓 Cursos | Adicionar/eliminar cursos |
| 🤖 IA Config | Configurar chave Anthropic Claude |

---

## 💰 Modelo de Receita

| Item | Valor |
|---|---|
| Preço por documento | 50 MZN |
| Comissão do autor | 30 MZN |
| **Tua receita por venda** | **20 MZN** |

### Projeção:
- **10 vendas/dia** = 200 MZN/dia = **6,000 MZN/mês**
- **30 vendas/dia** = 600 MZN/dia = **18,000 MZN/mês**
- **100 vendas/dia** = 2,000 MZN/dia = **60,000 MZN/mês**

---

## 🎯 Checklist para Lançamento

- [ ] Configurar Supabase (URL + Key no index.html)
- [ ] Configurar chave Anthropic API (no painel admin)
- [ ] Inserir número WhatsApp (no painel admin)
- [ ] Configurar Google Analytics (trocar G-XXXXXXXXXX)
- [ ] Adicionar 50+ documentos reais
- [ ] Alterar password admin (padrão: admin2024)
- [ ] Testar fluxo de compra via WhatsApp
- [ ] Criar página Facebook/Instagram
- [ ] Partilhar em grupos de estudantes

---

## 📞 Suporte

- **GitHub Issues:** https://github.com/jmaico641-eng/pesquisamz/issues
- **WhatsApp:** Inserir teu número no painel admin

---

## 📝 Changelog

### v2.0 (Abril 2026)
- ✅ Painel Admin completo
- ✅ Base de dados IndexedDB
- ✅ Supabase como backend
- ✅ Pagamento via WhatsApp
- ✅ SEO otimizado (Open Graph, meta tags)
- ✅ Google Analytics 4
- ✅ 16 documentos de exemplo
- ✅ 100% responsivo (mobile-first)

### v1.0
- Plataforma básica
- Gerador IA (Groq → Claude)
- Cursos online
- Carteira de autor

---

## 📜 Licença

Desenvolvido por **Junir Maico Jorge**  
MIT License — uso livre com atribuição.
