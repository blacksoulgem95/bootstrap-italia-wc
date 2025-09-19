# Setup e Deploy

## 🚀 Comando npm start

Per avviare la demo locale:

```bash
npm start
```

Questo comando:
1. Compila il progetto (`npm run build`)
2. Avvia un server HTTP sulla porta 3000
3. Apre automaticamente il browser su `http://localhost:3000`

## 📦 Installazione Dipendenze

```bash
npm install
```

## 🏗️ Build

```bash
npm run build
```

Genera i file compilati in `dist/`:
- `bootstrap-italia-wc.js` - Build UMD
- `bootstrap-italia-wc.min.js` - Build UMD minificato
- `bootstrap-italia-wc.esm.js` - Build ES Module

## 🌐 GitHub Pages Setup

### 1. Configurazione Repository

1. Vai su **Settings** > **Pages** nel tuo repository GitHub
2. Seleziona **"GitHub Actions"** come source
3. Il workflow `.github/workflows/deploy.yml` si occuperà automaticamente del deploy

### 2. URL Live

Dopo il primo push su `main` o `master`, la demo sarà disponibile su:
```
https://[TUO-USERNAME].github.io/bootstrap-italia-wc/
```

### 3. Workflow Automatico

Il workflow GitHub Actions:
- Si attiva su push su `main`/`master`
- Installa le dipendenze
- Compila il progetto
- Pubblica su GitHub Pages

## 📁 Struttura File

```
bootstrap-italia-wc/
├── src/                    # Codice sorgente
├── dist/                   # File compilati
├── examples/               # Demo locali
│   ├── index.html         # Demo principale
│   ├── form-components.html
│   ├── button-components.html
│   └── complete-form.html
├── docs/                   # Per GitHub Pages
│   └── index.html         # Demo pubblica
├── .github/workflows/      # GitHub Actions
└── package.json           # Scripts npm
```

## 🔧 Scripts Disponibili

```bash
npm start          # Demo locale (build + serve)
npm run build      # Compila il progetto
npm run serve      # Solo server HTTP
npm run dev        # Build in watch mode
npm test           # Esegui i test
npm run lint       # Esegui il linter
```

## 📱 Demo Disponibili

- **Demo Principale**: `examples/index.html`
- **Form Components**: `examples/form-components.html`
- **Button Components**: `examples/button-components.html`
- **Form Completo**: `examples/complete-form.html`

## 🌍 Deploy su GitHub Pages

1. **Push su main**:
   ```bash
   git add .
   git commit -m "Update components"
   git push origin main
   ```

2. **GitHub Actions** si attiva automaticamente

3. **Demo Live** disponibile su GitHub Pages

## 🔗 Link Utili

- **Repository**: `https://github.com/[TUO-USERNAME]/bootstrap-italia-wc`
- **Demo Live**: `https://[TUO-USERNAME].github.io/bootstrap-italia-wc/`
- **NPM Package**: `https://www.npmjs.com/package/bootstrap-italia-wc`

## ⚠️ Note Importanti

1. **CSS Bootstrap Italia**: Assicurati che sia incluso globalmente
2. **Porta 3000**: Se occupata, `http-server` userà la prossima disponibile
3. **GitHub Pages**: Richiede push su branch `main` o `master`
4. **HTTPS**: GitHub Pages usa sempre HTTPS per la demo live