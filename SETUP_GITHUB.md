# Setup GitHub Repository

Questa guida spiega come configurare il repository GitHub per utilizzare tutte le GitHub Actions configurate.

## Prerequisiti

1. **Repository GitHub** creato
2. **Accesso amministratore** al repository
3. **NPM account** (per pubblicazione)

## Configurazione Secrets

### 1. NPM_TOKEN
Per pubblicare automaticamente su NPM quando viene creato un tag:

1. Vai su [npmjs.com](https://www.npmjs.com)
2. Accedi al tuo account
3. Vai su **Settings** > **Access Tokens**
4. Clicca **Generate New Token**
5. Seleziona **Automation** (per CI/CD)
6. Copia il token generato
7. Nel repository GitHub:
   - Vai su **Settings** > **Secrets and variables** > **Actions**
   - Clicca **New repository secret**
   - Nome: `NPM_TOKEN`
   - Valore: incolla il token NPM

### 2. GITHUB_TOKEN
Questo token è automaticamente fornito da GitHub Actions e non richiede configurazione manuale.

## Abilitazione GitHub Pages

1. Vai su **Settings** del repository
2. Scorri fino alla sezione **Pages**
3. In **Source**, seleziona **Deploy from a branch**
4. In **Branch**, seleziona **gh-pages**
5. In **Folder**, seleziona **/ (root)**
6. Clicca **Save**

## Configurazione Branch Protection

Per proteggere il branch `master`:

1. Vai su **Settings** > **Branches**
2. Clicca **Add rule**
3. In **Branch name pattern**, inserisci `master`
4. Abilita:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
5. In **Status checks**, seleziona:
   - `test` (dal workflow CI)
   - `build` (dal workflow CI)
6. Clicca **Create**

## Test Iniziale

### 1. Setup Repository
Esegui il workflow di setup:
1. Vai su **Actions** nel repository
2. Seleziona **Setup Repository**
3. Clicca **Run workflow**
4. Clicca **Run workflow** (conferma)

### 2. Test CI
1. Fai un push su `master`
2. Verifica che il workflow **CI** si attivi
3. Controlla che tutti i test passino

### 3. Test Latest Branch
1. Dopo il push su `master`
2. Verifica che il workflow **Latest Branch Update** si attivi
3. Controlla che il branch `latest` sia creato/aggiornato

### 4. Test GitHub Pages
1. Dopo il push su `master`
2. Verifica che il workflow **Deploy to GitHub Pages** si attivi
3. Controlla che la documentazione sia disponibile su GitHub Pages

### 5. Test NPM Publish
1. Crea un tag: `git tag v1.0.0`
2. Push il tag: `git push origin v1.0.0`
3. Verifica che il workflow **NPM Publish** si attivi
4. Controlla che il pacchetto sia pubblicato su NPM

## Verifica Funzionamento

### Link CDN
Dopo la configurazione, i seguenti link dovrebbero funzionare:

```html
<!-- Per tag (NPM) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.js"></script>

<!-- Per master (GitHub) -->
<script src="https://cdn.jsdelivr.net/gh/username/repo@latest/bootstrap-italia-wc.js"></script>
```

### GitHub Pages
La documentazione dovrebbe essere disponibile su:
`https://username.github.io/repository-name`

### NPM Package
Il pacchetto dovrebbe essere disponibile su:
`https://www.npmjs.com/package/bootstrap-italia-wc`

## Troubleshooting

### Workflow Non Si Attiva
- Verifica che i file `.github/workflows/*.yml` siano presenti
- Controlla che i trigger siano configurati correttamente
- Verifica che il branch sia `master` (non `main`)

### NPM Publish Fallisce
- Verifica che `NPM_TOKEN` sia configurato
- Controlla che la versione non esista già su NPM
- Verifica che il tag sia nel formato corretto (`v*`)

### GitHub Pages Non Funziona
- Verifica che GitHub Pages sia abilitato
- Controlla che il branch `gh-pages` sia creato
- Verifica che il workflow `deploy.yml` sia attivo

### Latest Branch Non Si Aggiorna
- Verifica che il workflow `latest-branch.yml` sia attivo
- Controlla che il push sia su `master`
- Verifica che il build sia completato con successo

## Monitoraggio

Tutti i workflow sono visibili nella tab **Actions** del repository GitHub. Ogni workflow mostra:
- ✅ **Status** (successo/fallimento)
- ⏱️ **Durata** di esecuzione
- 📋 **Log** dettagliati
- 🔄 **Trigger** che ha attivato il workflow

## Supporto

Per problemi o domande:
1. Controlla i log dei workflow in **Actions**
2. Verifica la configurazione dei secrets
3. Controlla che tutti i prerequisiti siano soddisfatti
4. Apri una issue nel repository per supporto