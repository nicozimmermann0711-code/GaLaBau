#!/bin/bash
# =====================================================
# Push Becirovic GaLaBau Website to GitHub
# =====================================================

echo "🚀 Pushing to GitHub: nicozimmermann0711-code/GaLaBau"
echo ""

# Option 1: Mit GitHub CLI (gh)
if command -v gh &> /dev/null; then
    echo "GitHub CLI gefunden. Versuche Push..."
    gh auth status && git push -u origin main
    exit 0
fi

# Option 2: Mit Personal Access Token
echo "Für den Push brauchst du einen Personal Access Token:"
echo ""
echo "1. Gehe zu: https://github.com/settings/tokens"
echo "2. Generate new token (classic)"
echo "3. Scope: 'repo' aktivieren"
echo "4. Token kopieren"
echo ""
echo "Dann diesen Befehl ausführen:"
echo ""
echo "  git remote set-url origin https://YOUR_TOKEN@github.com/nicozimmermann0711-code/GaLaBau.git"
echo "  git push -u origin main"
echo ""
echo "Oder mit GitHub CLI:"
echo ""
echo "  gh auth login"
echo "  git push -u origin main"
