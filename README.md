# Bootstrap Italia WC

[![npm version](https://badge.fury.io/js/bootstrap-italia-wc.svg)](https://badge.fury.io/js/bootstrap-italia-wc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue)](https://your-org.github.io/bootstrap-italia-wc/)

Componenti Bootstrap Italia implementati come Web Components nativi in JavaScript vanilla.

## 🚀 Demo Live

**👉 [Vedi la Demo Live su GitHub Pages](https://your-org.github.io/bootstrap-italia-wc/)**

## Panoramica

Bootstrap Italia WC fornisce una raccolta di Web Components nativi che implementano il sistema di design Bootstrap Italia. Ogni componente estende `HTMLElement` e utilizza Shadow DOM dove appropriato, garantendo incapsulamento e compatibilità con qualsiasi framework o applicazione JavaScript vanilla.

## Caratteristiche

- 🚀 **Web Components Nativi** - Costruiti con JavaScript vanilla, nessuna dipendenza da framework
- 🎨 **Design Bootstrap Italia** - Segue il sistema di design ufficiale Bootstrap Italia
- 📦 **Leggero** - Dimensioni del bundle minime con supporto tree-shaking
- 🔧 **Framework Agnostic** - Funziona con React, Vue, Angular o JavaScript vanilla
- ♿ **Accessibile** - Costruito con l'accessibilità in mente (EN 301 549, WCAG 2.1 AA)
- 🧪 **Ben Testato** - Suite di test completa con Jest
- 📚 **Ben Documentato** - Documentazione ed esempi estesi

## Installazione

### NPM

```bash
npm install bootstrap-italia-wc
```

### CDN

```html
<!-- Bootstrap Italia CSS (richiesto - assumiamo che sia già importato globalmente) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">

<!-- Bootstrap Italia WC JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.min.js"></script>
```

### Download

Scarica l'ultima release dalla [pagina delle release](https://github.com/your-org/bootstrap-italia-wc/releases) e includi i file nel tuo progetto.

## Guida Rapida

1. **Includi il CSS di Bootstrap Italia (se non già presente):**

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Bootstrap Italia CSS (richiesto - assumiamo che sia già importato globalmente) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">
    
    <!-- Bootstrap Italia WC JavaScript -->
    <script src="path/to/bootstrap-italia-wc.js"></script>
</head>
<body>
    <!-- I tuoi componenti qui -->
</body>
</html>
```

**Nota**: I Web Components assumono che il CSS di Bootstrap Italia sia già disponibile globalmente nella pagina. Se non lo hai ancora incluso, aggiungi il link CSS sopra.

2. **Usa i Web Components:**

```html
<!-- Alert base -->
<it-alert type="success">
    <strong>Successo!</strong> La tua azione è stata completata con successo.
</it-alert>

<!-- Alert dismissibile -->
<it-alert type="warning" dismissible>
    <strong>Attenzione!</strong> Questo alert può essere chiuso.
</it-alert>

<!-- Form Input -->
<it-form-input 
    type="email" 
    label="Email" 
    placeholder="nome@esempio.it"
    required
></it-form-input>

<!-- Button -->
<it-button type="primary" icon="it-check">
    Conferma
</it-button>
```

3. **Gestisci gli eventi (opzionale):**

```javascript
document.addEventListener('it-alert-dismiss', function(event) {
    console.log('Alert chiuso:', event.detail.type);
});

document.addEventListener('it-form-input-change', function(event) {
    console.log('Input cambiato:', event.detail.value);
});

document.addEventListener('it-button-click', function(event) {
    console.log('Button cliccato:', event.detail.type);
});
```

## 🎯 Demo Locale

Per vedere la demo localmente:

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

Questo comando:
1. Compila il progetto
2. Avvia un server HTTP sulla porta 3000
3. Apre automaticamente il browser

La demo sarà disponibile su `http://localhost:3000`

## Assunzioni sui CSS

I Web Components di Bootstrap Italia WC **assumono che il CSS di Bootstrap Italia sia già importato globalmente** nella pagina. Questo significa:

- ✅ **Non re-implementano** gli stili CSS di Bootstrap Italia
- ✅ **Usano SOLO** le classi CSS di Bootstrap Italia esistenti
- ✅ **Non aggiungono CSS custom** - tutto viene da Bootstrap Italia
- ✅ **Sono compatibili** con qualsiasi versione di Bootstrap Italia CSS
- ✅ **Bundle size minimo** - solo JavaScript, nessun CSS duplicato

Se stai già usando Bootstrap Italia nel tuo progetto, i Web Components funzioneranno immediatamente senza configurazione aggiuntiva.

## Componenti

### it-alert

Visualizza messaggi di feedback contestuali per le azioni dell'utente.

#### Utilizzo

```html
<it-alert type="success" dismissible>
    <strong>Successo!</strong> La tua azione è stata completata con successo.
</it-alert>
```

#### Attributi

| Attributo | Tipo | Default | Descrizione |
|-----------|------|---------|-------------|
| `type` | string | `"info"` | Tipo di alert: `"info"`, `"success"`, `"warning"`, `"danger"` |
| `dismissible` | boolean | `false` | Se l'alert può essere chiuso |
| `dismissed` | boolean | `false` | Se l'alert è attualmente chiuso |

### it-form-input

Input di testo, email, password, numero, telefono, URL e ricerca.

#### Utilizzo

```html
<it-form-input 
    type="email" 
    label="Email" 
    placeholder="nome@esempio.it"
    required
    validation="valid"
    validation-message="Email valida"
></it-form-input>
```

### it-form-textarea

Aree di testo multilinea con validazione.

#### Utilizzo

```html
<it-form-textarea 
    label="Messaggio" 
    placeholder="Inserisci il tuo messaggio"
    rows="4"
    maxlength="500"
    required
></it-form-textarea>
```

### it-form-select

Menu a tendina standard e multipli.

#### Utilizzo

```html
<it-form-select label="Scegli un'opzione" required>
    <option value="">Seleziona...</option>
    <option value="1">Opzione 1</option>
    <option value="2">Opzione 2</option>
</it-form-select>
```

### it-form-checkbox

Checkbox con supporto stato indeterminato.

#### Utilizzo

```html
<it-form-checkbox 
    label="Accetto i termini e condizioni" 
    value="accepted"
    required
></it-form-checkbox>
```

### it-form-radio

Radio button con gestione gruppi.

#### Utilizzo

```html
<it-form-radio 
    name="gender"
    label="Maschio" 
    value="male"
    required
></it-form-radio>
```

### it-form-file

Upload file singoli e multipli.

#### Utilizzo

```html
<it-form-file 
    label="Carica un file" 
    accept=".pdf,.doc,.docx"
    multiple
    required
></it-form-file>
```

### it-form-toggle

Interruttori toggle con animazioni.

#### Utilizzo

```html
<it-form-toggle 
    label="Abilita notifiche" 
    value="notifications"
    help-text="Ricevi notifiche via email"
></it-form-toggle>
```

### it-form-group

Raggruppamento e validazione di campi form.

#### Utilizzo

```html
<it-form-group 
    label="Informazioni Personali" 
    help-text="Inserisci le tue informazioni personali"
>
    <it-form-input type="text" label="Nome" required></it-form-input>
    <it-form-input type="text" label="Cognome" required></it-form-input>
</it-form-group>
```

### it-button

Bottoni con diversi tipi, dimensioni e stati.

#### Utilizzo

```html
<it-button type="primary" size="lg" icon="it-check">
    Conferma
</it-button>
```

### it-button-group

Raggruppamento di bottoni orizzontali e verticali.

#### Utilizzo

```html
<it-button-group>
    <it-button type="primary">Primo</it-button>
    <it-button type="secondary">Secondo</it-button>
    <it-button type="success">Terzo</it-button>
</it-button-group>
```

## Supporto Browser

Bootstrap Italia WC supporta tutti i browser moderni che implementano gli standard Web Components:

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

Per browser più vecchi, potrebbe essere necessario includere polyfill per Custom Elements e Shadow DOM.

## Sviluppo

### Prerequisiti

- Node.js 16+
- npm 8+

### Setup

```bash
# Clona il repository
git clone https://github.com/your-org/bootstrap-italia-wc.git
cd bootstrap-italia-wc

# Installa le dipendenze
npm install

# Compila il progetto
npm run build

# Avvia la demo locale
npm start

# Esegui i test
npm test

# Esegui il linter
npm run lint

# Avvia il server di sviluppo
npm run dev
```

### Struttura del Progetto

```
bootstrap-italia-wc/
├── src/                    # Codice sorgente
│   ├── it-alert.js        # Componente Alert
│   ├── it-form-*.js       # Componenti Form
│   ├── it-button*.js      # Componenti Button
│   └── index.js           # Punto di ingresso principale
├── dist/                  # File compilati
├── examples/              # Esempi di utilizzo
├── docs/                  # Documentazione per GitHub Pages
├── tests/                 # File di test
├── .github/workflows/     # GitHub Actions
├── package.json           # Configurazione del package
├── rollup.config.js       # Configurazione Rollup
├── jest.config.js         # Configurazione Jest
├── README.md              # Questo file
└── AGENT.md               # Documentazione interna
```

## GitHub Pages

Il progetto è configurato per essere pubblicato automaticamente su GitHub Pages:

1. **Push su main/master** - Attiva automaticamente il deploy
2. **GitHub Actions** - Compila e pubblica su GitHub Pages
3. **URL Live** - `https://your-org.github.io/bootstrap-italia-wc/`

### Configurazione GitHub Pages

1. Vai su Settings > Pages nel tuo repository
2. Seleziona "GitHub Actions" come source
3. Il workflow `.github/workflows/deploy.yml` si occuperà del resto

## Contribuire

Accogliamo i contributi! Vedi la nostra [Guida ai Contributi](CONTRIBUTING.md) per i dettagli.

### Workflow di Sviluppo

1. Fork del repository
2. Crea un branch per la feature
3. Fai le tue modifiche
4. Aggiungi test per le nuove funzionalità
5. Assicurati che tutti i test passino
6. Invia una pull request

## Licenza

Questo progetto è licenziato sotto la Licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

## Ringraziamenti

- [Bootstrap Italia](https://italia.github.io/bootstrap-italia/) per il sistema di design
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) per la tecnologia
- Tutti i contributori che aiutano a migliorare questo progetto

## Supporto

- 📖 [Documentazione](https://github.com/your-org/bootstrap-italia-wc#readme)
- 🐛 [Issue Tracker](https://github.com/your-org/bootstrap-italia-wc/issues)
- 💬 [Discussioni](https://github.com/your-org/bootstrap-italia-wc/discussions)
- 🚀 [Demo Live](https://your-org.github.io/bootstrap-italia-wc/)

## Changelog

Vedi [CHANGELOG.md](CHANGELOG.md) per un elenco delle modifiche e della cronologia delle versioni.