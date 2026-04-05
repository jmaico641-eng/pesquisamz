# 📋 Instruções para Push e Deploy - PesquisaMZ

## ✅ Bugs Corrigidos

Foram corrigidos os seguintes bugs no código:

1. **Mensagens de erro da IA** - Atualizado de "Gemini API" para "Groq API"
2. **Validação de índice** - Adicionada verificação em `openPay()` e `openPv()` para evitar erros de índice inválido
3. **Função rmF()** - Melhorada para remover checkboxes de faculdades corretamente
4. **UI da IA** - Atualizada para Groq AI (Llama 3.3 70B) com placeholders e URLs corretos

---

## 🚀 Passo 1: Fazer Push para GitHub

### Opção A: Usando GitHub CLI (Recomendado)

```bash
# Instalar GitHub CLI se não tiveres (Ubuntu/Debian)
sudo apt update
sudo apt install gh

# Autenticar
gh auth login
# Seguir as instruções no browser

# Fazer push
cd /home/tiih/pesquisamz
git push origin master
```

### Opção B: Usando Token de Acesso Pessoal

1. Vai a https://github.com/settings/tokens
2. Clica em "Generate new token (classic)"
3. Dá-lhe nome "PesquisaMZ Deploy"
4. Seleciona permissões: `repo` (todas as sub-opções)
5. Clica em "Generate token"
6. **Copia o token imediatamente** (não aparece novamente)
7. Faz push com:

```bash
cd /home/tiih/pesquisamz
git push https://SEU_USERNAME:SEU_TOKEN@github.com/jmaico641-eng/pesquisamz.git master
```

Substitui:
- `SEU_USERNAME` = teu username do GitHub
- `SEU_TOKEN` = token que acabaste de gerar

### Opção C: Usando SSH

```bash
# Gerar chave SSH se não tiveres
ssh-keygen -t ed25519 -C "teuemail@example.com"
# (prime Enter para localização padrão, depois 2x Enter sem passphrase)

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# Adicionar chave em https://github.com/settings/keys

# Mudar remote para SSH
cd /home/tiih/pesquisamz
git remote set-url origin git@github.com:jmaico641-eng/pesquisamz.git

# Fazer push
git push origin master
```

---

## 🌐 Passo 2: Deploy na Vercel

### Método 1: Via Interface Web (Mais Fácil)

1. **Acede a** https://vercel.com
2. **Faz login** com tua conta GitHub
3. **Clica em** "Add New..." → "Project"
4. **Seleciona** o repositório `pesquisamz` da lista
5. **Configura:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (diretório raiz)
   - **Build Command:** deixar vazio (projeto estático)
   - **Output Directory:** `.` (diretório raiz)
6. **Clica em** "Deploy"
7. **Aguarda** 1-2 minutos pelo deploy
8. **Recebes** URL do tipo: `https://pesquisamz.vercel.app`

### Método 2: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login
# Seguir instruções no browser

# Fazer deploy
cd /home/tiih/pesquisamz
vercel

# Para deploy de produção
vercel --prod
```

---

## 🔄 Deploy Automático (Push → Deploy)

Depois de configurares o deploy na Vercel (Método 1), **cada push para master faz deploy automático**!

Fluxo de trabalho:
```bash
# Fazer alterações ao código
git add .
git commit -m "tua mensagem"
git push origin master
# ↓ Automático ↓
# Vercel detecta o push e faz deploy em ~1 minuto
```

---

## 📝 Resumo dos Comandos

```bash
cd /home/tiih/pesquisamz

# Ver estado
git status

# Ver mudanças
git diff HEAD

# Adicionar ficheiros
git add index.html

# Commit
git commit -m "tua mensagem"

# Push (precisa de autenticação)
git push origin master
```

---

## ⚠️ Notas Importantes

1. **Firebase Configuration** - Substitui os valores em `FB_CONFIG` com as tuas credenciais reais do Firebase
2. **Groq API Key** - Os utilizadores precisam obter chave em https://console.groq.com/keys
3. **Arquivos PDF** - São armazenados em localStorage (máx ~5-10MB por ficheiro)
4. **Produção** - Para uso real, considera Firebase Storage para PDFs maiores

---

## 🎯 Próximos Passos Sugeridos

1. ✅ Configurar Firebase com credenciais reais
2. ✅ Testar funcionalidade de upload/download
3. ✅ Verificar que pagamentos funcionam
4. ✅ Testar geração de IA com Groq
5. ✅ Deploy na Vercel
6. ✅ Configurar domínio personalizado (opcional)

---

**Última atualização:** 5 de Abril de 2026
**Desenvolvedor:** Junir Maico Jorge
**Tech Stack:** HTML5, CSS3, JavaScript, Groq AI, Firebase
