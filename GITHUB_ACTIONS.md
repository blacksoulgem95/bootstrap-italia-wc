# GitHub Actions Workflow

Questo progetto utilizza diverse GitHub Actions per automatizzare il processo di build, test e deployment.

## Workflows Configurati

### 1. CI (Continuous Integration)
**File:** `.github/workflows/ci.yml`
**Trigger:** Push e Pull Request su `main`/`master`

- ✅ Lint del codice
- ✅ Esecuzione test
- ✅ Build del progetto
- ✅ Verifica artefatti di build

### 2. NPM Publish
**File:** `.github/workflows/npm-publish.yml`
**Trigger:** Creazione di tag (es. `v1.0.0`)

- ✅ Build del progetto
- ✅ Esecuzione test
- ✅ Pubblicazione su NPM
- ✅ Creazione GitHub Release

**Prerequisiti:**
- Configurare `NPM_TOKEN` nei secrets del repository

### 3. Latest Branch Update
**File:** `.github/workflows/latest-branch.yml`
**Trigger:** Push su `master`

- ✅ Build del progetto
- ✅ Creazione/aggiornamento branch `latest`
- ✅ Copia file compilati nel branch `latest`
- ✅ Creazione package.json per il branch `latest`

### 4. Documentation Update
**File:** `.github/workflows/update-docs.yml`
**Trigger:** Push su `master` o creazione tag

- ✅ Aggiornamento ricorsivo di tutti i file HTML
- ✅ Sostituzione link locali con CDN (jsdelivr)
- ✅ Aggiornamento README.md con versioni
- ✅ Commit automatico delle modifiche

### 5. GitHub Pages Deploy
**File:** `.github/workflows/deploy.yml`
**Trigger:** Push su `main`/`master`

- ✅ Build del progetto
- ✅ Preparazione documentazione
- ✅ Deploy su GitHub Pages
- ✅ Aggiornamento link CDN

## Configurazione Secrets

Per utilizzare tutte le funzionalità, configurare i seguenti secrets nel repository:

### NPM_TOKEN
```bash
# Ottenere il token da npmjs.com
# Settings > Access Tokens > Generate New Token (Automation)
```

### GITHUB_TOKEN
```bash
# Automaticamente fornito da GitHub Actions
# Non richiede configurazione manuale
```

## Flusso di Lavoro

### Sviluppo Normale
1. **Push su master** → CI + Latest Branch + Docs Update + GitHub Pages
2. **Pull Request** → CI

### Release
1. **Creare tag** (es. `git tag v1.0.0 && git push origin v1.0.0`)
2. **NPM Publish** → Pubblica su NPM + Crea GitHub Release
3. **Docs Update** → Aggiorna documentazione con link NPM

## Link CDN Automatici

### Per Tag (NPM)
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.js"></script>
```

### Per Master (GitHub)
```html
<script src="https://cdn.jsdelivr.net/gh/username/repo@latest/bootstrap-italia-wc.js"></script>
```

## Branch Struttura

- **`master`** - Codice sorgente principale
- **`latest`** - Build più recente (solo file compilati)
- **`gh-pages`** - Documentazione GitHub Pages (automatico)

## Monitoraggio

Tutti i workflow sono visibili nella tab **Actions** del repository GitHub.

## Troubleshooting

### Build Fallisce
- Verificare che tutti i test passino
- Controllare che il lint sia pulito
- Verificare dipendenze in `package.json`

### NPM Publish Fallisce
- Verificare che `NPM_TOKEN` sia configurato
- Controllare che la versione non esista già su NPM
- Verificare che il tag sia nel formato corretto (`v*`)

### GitHub Pages Non Aggiorna
- Verificare che il branch `gh-pages` sia abilitato
- Controllare che il workflow `deploy.yml` sia attivo
- Verificare che non ci siano errori nel workflow