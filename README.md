# PesquisaMZ — Repositório Académico de Moçambique

Plataforma web para pesquisar, comprar e submeter trabalhos académicos de universidades moçambicanas.

## 🚀 Deploy Rápido

### Opção 1: Abrir localmente
```bash
# Simplesmente abre o ficheiro no browser:
xdg-open index.html
# ou
firefox index.html
```

### Opção 2: Servidor local (Python)
```bash
cd pesquisamz
python3 -m http.server 8080
# Acede a http://localhost:8080
```

### Opção 3: Deploy gratuito na internet

#### Netlify (Recomendado)
1. Cria conta em [netlify.com](https://netlify.com)
2. Arrasta a pasta `pesquisamz` para o dashboard
3. Pronto! URL público em segundos

#### GitHub Pages
1. Cria repositório no GitHub
2. Faz push do ficheiro `index.html`
3. Activa GitHub Pages nas settings

#### Vercel
1. Cria conta em [vercel.com](https://vercel.com)
2. Importa o projecto
3. Deploy automático

## ✨ Funcionalidades

- 🔍 **Pesquisa** por título, autor, área ou faculdade
- 🏫 **Filtros** por universidade, faculdade e nível académico
- 👁 **Pré-visualização** de documentos PDF
- 💰 **Pagamento** via M-Pesa, e-Mola ou mKesh
- 📤 **Submissão** de trabalhos com upload de PDF
- 💼 **Carteira** para autores receberem por downloads
- 📱 **Design responsivo** para mobile e desktop
- ⌨️ **Atalhos** (Enter para pesquisar, ESC para fechar modais)

## 🏫 Universidades Incluídas

- UEM — Universidade Eduardo Mondlane
- UCM — Universidade Católica de Moçambique
- ISRI — Instituto Superior de Relações Internacionais
- UniZambeze — Universidade Zambeze
- UDM — Universidade Daomés de Moçambique
- UNILÚRIO — Universidade Lúrio
- USTM — Universidade São Tomás de Moçambique
- ISCTEM — Instituto Superior de Ciências e Tecnologia
- UP — Universidade Pedagógica

## 🛠 Bugs Corrigidos

- ✅ XSS vulnerability — inputs agora escapados correctamente
- ✅ Pesquisa não incluía área e faculdade
- ✅ Mensagem de erro quando não há documentos vs sem resultados
- ✅ `dlv()` não prevenia comportamento padrão
- ✅ `rmF()` não removia checkbox correctamente
- ✅ Espaços no Google Fonts URL
- ✅ Conflito de nomes de classe CSS (`.flbl`)
- ✅ Fechar modais com ESC e clique fora
- ✅ Validação melhorada de uploads

## 🆕 Funcionalidades Novas

- ✅ Carteira do autor (30 MZN por download)
- ✅ Modal "Como funciona"
- ✅ Pesquisa com Enter
- ✅ Fechar modais com ESC
- ✅ Mensagens de erro mais claras
- ✅ HTML escaping para segurança

## 📝 Notas

- Dados guardados no `localStorage` do browser
- Limite de ~5-10MB dependendo do browser
- Para produção, recomenda-se backend com base de dados

## 📄 Licença

Desenvolvido por Nexus AI
