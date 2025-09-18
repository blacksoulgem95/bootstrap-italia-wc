# Bootstrap Italia WC

[![npm version](https://badge.fury.io/js/bootstrap-italia-wc.svg)](https://badge.fury.io/js/bootstrap-italia-wc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Componenti Bootstrap Italia implementati come Web Components nativi in JavaScript vanilla.

## Panoramica

Bootstrap Italia WC fornisce una raccolta di Web Components nativi che implementano il sistema di design Bootstrap Italia. Ogni componente estende `HTMLElement` e utilizza Shadow DOM dove appropriato, garantendo incapsulamento e compatibilità con qualsiasi framework o applicazione JavaScript vanilla.

## Caratteristiche

- 🚀 **Web Components Nativi** - Costruiti con JavaScript vanilla, nessuna dipendenza da framework
- 🎨 **Design Bootstrap Italia** - Segue il sistema di design ufficiale Bootstrap Italia
- 📦 **Leggero** - Dimensioni del bundle minime con supporto tree-shaking
- 🔧 **Framework Agnostic** - Funziona con React, Vue, Angular o JavaScript vanilla
- ♿ **Accessibile** - Costruito con l'accessibilità in mente
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
```

3. **Gestisci gli eventi (opzionale):**

```javascript
document.addEventListener('it-alert-dismiss', function(event) {
    console.log('Alert chiuso:', event.detail.type);
});
```

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

#### Proprietà

| Proprietà | Tipo | Descrizione |
|-----------|------|-------------|
| `type` | string | Ottieni/imposta il tipo di alert |
| `dismissible` | boolean | Ottieni/imposta se l'alert è dismissibile |
| `dismissed` | boolean | Ottieni/imposta se l'alert è chiuso |

#### Metodi

| Metodo | Descrizione |
|--------|-------------|
| `dismiss()` | Chiudi l'alert |
| `show()` | Mostra l'alert (se chiuso) |

#### Eventi

| Evento | Descrizione |
|--------|-------------|
| `it-alert-dismiss` | Emesso quando l'alert viene chiuso |

#### Esempi

```html
<!-- Alert base -->
<it-alert type="info">Messaggio informativo</it-alert>
<it-alert type="success">Messaggio di successo</it-alert>
<it-alert type="warning">Messaggio di avvertimento</it-alert>
<it-alert type="danger">Messaggio di pericolo</it-alert>

<!-- Alert dismissibili -->
<it-alert type="info" dismissible>Alert informativo dismissibile</it-alert>

<!-- Controllo programmatico -->
<it-alert type="success" dismissible id="my-alert">Alert controllato</it-alert>

<script>
const alert = document.getElementById('my-alert');
alert.dismiss(); // Chiudi l'alert
alert.show();    // Mostra l'alert
alert.type = 'warning'; // Cambia tipo
</script>
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
│   └── index.js           # Punto di ingresso principale
├── dist/                  # File compilati
├── examples/              # Esempi di utilizzo
├── tests/                 # File di test
├── package.json           # Configurazione del package
├── rollup.config.js       # Configurazione Rollup
├── jest.config.js         # Configurazione Jest
├── README.md              # Questo file
└── AGENT.md               # Documentazione interna
```

### Aggiungere Nuovi Componenti

1. Crea un nuovo file componente in `src/` (es. `it-button.js`)
2. Estendi `HTMLElement` e implementa il componente
3. Registra il componente con `customElements.define()`
4. Esporta il componente da `src/index.js`
5. Aggiungi test in `tests/`
6. Crea esempi in `examples/`
7. Aggiorna la documentazione

### Testing

```bash
# Esegui tutti i test
npm test

# Esegui i test in modalità watch
npm test -- --watch

# Esegui i test con coverage
npm test -- --coverage
```

### Build

```bash
# Build per produzione
npm run build

# Build in modalità watch
npm run dev
```

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

## Changelog

Vedi [CHANGELOG.md](CHANGELOG.md) per un elenco delle modifiche e della cronologia delle versioni.