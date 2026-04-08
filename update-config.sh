#!/bin/bash
# Script para atualizar PesquisaMZ com configuração persistente
# Este script modifica o index.html para usar configurações do servidor

echo "🔧 Atualizando sistema de configuração..."

# Backup
cp index.html index.html.backup

echo "✅ Backup criado: index.html.backup"
echo ""
echo "📋 Instruções manuais necessárias:"
echo ""
echo "1. As configurações agora são guardadas via /api/config"
echo "2. O admin deve usar a função saveServerConfig()"
echo "3. O frontend carrega via loadServerConfig()"
echo ""
echo "📁 Arquivos criados:"
echo "   - api/config.js (serverless function)"
echo "   - js/config-manager.js (cliente)"
echo ""
echo "⚠️  Para ativar, é necessário:"
echo "   a) Fazer deploy das novas funções serverless"
echo "   b) Atualizar o index.html para usar as novas funções"
echo ""
echo "🚀 Fazendo deploy..."
git add api/config.js js/config-manager.js
git commit -m "feat: adicionar sistema de configuração persistente no servidor"
git push origin master

echo ""
echo "✅ Deploy realizado!"
echo "📖 Lê o README-CONFIG.md para instruções de uso"
