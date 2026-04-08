#!/bin/bash
# Script para configurar variáveis de ambiente na Vercel
# Requer Vercel CLI instalado: npm i -g vercel

echo "🔧 Configurando PesquisaMZ na Vercel"
echo "====================================="
echo ""

# Fazer login na Vercel
echo "1️⃣  Fazendo login na Vercel..."
vercel login
echo ""

# Link do projeto
echo "2️⃣  Linkando projeto..."
vercel link
echo ""

# Adicionar variáveis de ambiente
echo "3️⃣  Configurando variáveis de ambiente..."
echo ""
echo "Por favor, insere as tuas chaves API:"
echo ""
read -p "Groq API Key (https://console.groq.com/keys): " GROQ_KEY
read -p "Anthropic API Key (https://console.anthropic.com/settings/keys): " ANTHROPIC_KEY
echo ""

# Adicionar variáveis
echo "Adicionando variáveis..."
vercel env add GROQ_API_KEY production <<< "$GROQ_KEY"
vercel env add ANTHROPIC_API_KEY production <<< "$ANTHROPIC_KEY"
vercel env add ANTHROPIC_VERSION production <<< "2023-06-01"

echo ""
echo "✅ Variáveis configuradas com sucesso!"
echo ""
echo "4️⃣  Fazendo deploy..."
vercel --prod

echo ""
echo "🎉 Configuração completa!"
echo "Acede o teu site em: https://pesquisamz.vercel.app"
echo ""
echo "Para testar as APIs:"
echo "  curl -X POST https://pesquisamz.vercel.app/api/groq -H 'Content-Type: application/json' -d '{\"prompt\": \"Olá\"}'"
echo "  curl -X POST https://pesquisamz.vercel.app/api/anthropic -H 'Content-Type: application/json' -d '{\"prompt\": \"Olá\"}'"
