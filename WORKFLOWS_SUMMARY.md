# GitHub Actions Workflows - Riepilogo Ottimizzato

## Repository: `blacksoulgem95/bootstrap-italia-wc`
**GitHub Pages:** `https://blacksoulgem95.github.io/bootstrap-italia-wc/`

### Workflow Configurati (5 totali)

#### 1. **CI** - `ci.yml`
- **Trigger:** Pull Request su `main`/`master`
- **Funzione:** Test, lint, build per PR
- **Scopo:** Validazione codice prima del merge

#### 2. **CI/CD and Deploy** - `deploy.yml`
- **Trigger:** Push su `main`/`master`
- **Funzione:** 
  - Test, lint, build
  - Aggiornamento link CDN
  - Deploy GitHub Pages
- **Scopo:** CI/CD completo per il branch principale

#### 3. **Update Latest Branch** - `latest-branch.yml`
- **Trigger:** Push su `master`
- **Funzione:** 
  - Build del progetto
  - Creazione/aggiornamento branch `latest`
  - Copia file compilati
- **Scopo:** Mantenere branch `latest` aggiornato

#### 4. **Publish to NPM** - `npm-publish.yml`
- **Trigger:** Creazione tag (es. `v1.0.0`)
- **Funzione:** 
  - Build, test
  - Pubblicazione su NPM
  - Creazione GitHub Release
- **Scopo:** Release automatiche su NPM

#### 5. **Setup Repository** - `setup-repo.yml`
- **Trigger:** Manuale (workflow_dispatch)
- **Funzione:** 
  - Setup iniziale repository
  - Creazione branch `latest`
  - Configurazione GitHub Pages
- **Scopo:** Setup iniziale del repository

## Flusso di Lavoro

### Sviluppo
```bash
# 1. Creare PR
git checkout -b feature/new-feature
git push origin feature/new-feature
# → Attiva CI workflow

# 2. Merge su master
git checkout master
git merge feature/new-feature
git push origin master
# → Attiva CI/CD and Deploy + Update Latest Branch
```

### Release
```bash
# 1. Creare tag
git tag v1.0.0
git push origin v1.0.0
# → Attiva Publish to NPM
```

## Link CDN Automatici

### Per Tag (NPM)
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.js"></script>
```

### Per Master (GitHub)
```html
<script src="https://cdn.jsdelivr.net/gh/blacksoulgem95/bootstrap-italia-wc@latest/bootstrap-italia-wc.js"></script>
```

## Configurazione Richiesta

### Secrets
- `NPM_TOKEN` - Token NPM per pubblicazione

### GitHub Pages
- Abilitare GitHub Pages
- Source: `gh-pages` branch
- Folder: `/ (root)`

## Ottimizzazioni Applicate

### ✅ Rimossi Doppioni
- ❌ `update-docs.yml` → Consolidato in `deploy.yml`
- ❌ `update-repo-info.yml` → Rimosso (non necessario)

### ✅ Consolidati Trigger
- **CI** → Solo PR (evita conflitti)
- **CI/CD and Deploy** → Push su master (include tutto)
- **Update Latest Branch** → Push su master (parallelo)

### ✅ Aggiornati Repository References
- Tutti i file aggiornati con `blacksoulgem95/bootstrap-italia-wc`
- Link CDN corretti
- GitHub Pages URL aggiornato

## Monitoraggio

Tutti i workflow sono visibili in:
- **Actions** tab del repository
- **Status checks** nelle PR
- **Releases** per i tag

## Troubleshooting

### Workflow Non Si Attiva
- Verificare trigger configurati
- Controllare branch name (`master` vs `main`)

### NPM Publish Fallisce
- Verificare `NPM_TOKEN` secret
- Controllare formato tag (`v*`)

### GitHub Pages Non Aggiorna
- Verificare abilitazione GitHub Pages
- Controllare branch `gh-pages`

### Latest Branch Non Si Aggiorna
- Verificare push su `master`
- Controllare permessi repository