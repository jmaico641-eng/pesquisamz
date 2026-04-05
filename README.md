# PesquisaMZ — Repositório Académico de Moçambique

Plataforma completa para pesquisar, gerar e submeter trabalhos académicos com IA.

**Desenvolvido por Junir Maico Jorge**

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- **Criar conta** com número M-Pesa/e-Mola/mKesh
- **Iniciar sessão** com número e palavra-passe
- **Terminar sessão** (logout)
- Dados guardados no localStorage

### 📚 Repositório Académico
- Pesquisar trabalhos por título, autor, área
- Filtros por universidade, faculdade e nível
- Pré-visualização de PDFs
- Compra de documentos (50 MZN)
- Submissão de trabalhos com upload

### 🤖 Gerador de Trabalhos com IA
- Gera trabalhos académicos completos automaticamente
- Suporta: Licenciatura, Mestrado, Doutoramento, Monografia
- Inclui: capa, resumo, introdução, metodologia, resultados, conclusão, referências
- **Custo: 50 MZN por trabalho gerado**
- Copiar ou descarregar o trabalho gerado

### 🎓 Cursos Gratuitos com IA Docente
- 6 cursos de nível básico disponíveis:
  - 📊 Introdução à Economia
  - ⚖️ Direito Constitucional
  - 🏥 Saúde Pública
  - 🏗️ Fundamentos de Engenharia
  - 📖 Ciências da Educação
  - 💻 Introdução à Programação
- **IA Qwen como docente virtual** — responde a perguntas em tempo real
- Chat interativo para aprender

### 💼 Carteira
- Saldo acumulado por downloads dos teus trabalhos (30 MZN/download)
- Levantamento via M-Pesa, e-Mola ou mKesh
- Mínimo: 100 MZN

## 🌐 Deploy na Vercel (Push Automático)

### Passo 1: Criar repositório no GitHub

```bash
cd /home/tiih/pesquisamz-v2
git init
git add .
git commit -m "feat: PesquisaMZ v2 com IA, auth e cursos"
```

No GitHub.com:
1. Cria um novo repositório (ex: `pesquisamz`)
2. Copia o URL do repositório

### Passo 2: Ligar ao GitHub

```bash
git remote add origin https://github.com/TEU_USERNAME/pesquisamz.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy na Vercel

1. Acede a [vercel.com](https://vercel.com)
2. Cria conta ou faz login
3. Clica em **"Add New Project"**
4. Importa o repositório `pesquisamz` do GitHub
5. Clica em **"Deploy"**
6. Pronto! Recebes um URL tipo: `https://pesquisamz.vercel.app`

### Passo 4: Push Deploy Automático

A partir de agora, sempre que fizeres:

```bash
git add .
git commit -m "descrição da mudança"
git push
```

A Vercel **detecta automaticamente** o push e faz deploy da nova versão em ~30 segundos.

**O teu site actualiza-se sozinho!**

## 📱 Como usar do telemóvel

1. Abre o browser (Chrome, Safari, etc.)
2. Digita o URL do teu site (ex: `https://pesquisamz.vercel.app`)
3. Cria conta com o teu número
4. Usa todas as funcionalidades:
   - 📚 Pesquisar trabalhos
   - 🤖 Gerar trabalhos com IA
   - 🎓 Fazer cursos grátis

## 🏫 Universidades Incluídas

UEM, UCM, ISRI, UniZambeze, UDM, UNILÚRIO, USTM, ISCTEM, UP

## 🛠 Tech Stack

- HTML5, CSS3, JavaScript (vanilla)
- localStorage para dados locais
- Vercel para hosting e deploy automático
- IA Qwen para geração de trabalhos e cursos

## 📄 Licença

Desenvolvido por **Junir Maico Jorge**
