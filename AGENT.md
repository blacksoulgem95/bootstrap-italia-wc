# Bootstrap Italia WC – AGENT

Questo documento descrive il dietro le quinte del progetto: architettura, convenzioni di sviluppo e il flusso di rilascio.

## Architettura

- Vanilla JS Web Components
  - Ogni componente è una classe ES6 che estende `HTMLElement`.
  - I template usano shadowRoot e CSS nativi.
- Stili
  - Basati su Bootstrap Italia (non duplicati, vanno inclusi dall’utente).
- Distribuzione
  - Bundle unico `dist/index.js` in formato ES Module.

## Struttura del progetto

    bootstrap-italia-wc/
    ├── src/                # Sorgente dei Web Components
    │   ├── it-alert.js
    │   ├── it-button.js
    │   └── ...
    ├── dist/               # Output buildato
    ├── examples/           # Demo HTML
    ├── tests/              # Unit test
    ├── package.json
    ├── README.md
    └── AGENT.md

## Build

Il progetto usa Rollup:

    npm run build

Output: `dist/index.js`

## Test

Con Jest:

    npm test

## Release Flow

1. Aggiorna versione in package.json  
2. Builda il pacchetto:  
       npm run build  
3. Pubblica su npm:  
       npm publish  
4. Tagga la release su GitHub:  
       git tag vX.Y.Z  
       git push origin vX.Y.Z  

## Convenzioni

- Tutti i componenti devono avere prefisso `it-` (es. `it-alert`, `it-button`)  
- API fedele a Bootstrap Italia (classi → attributi/proprietà, eventi → CustomEvent)  

## Roadmap

- [ ] Copertura completa dei componenti  
- [ ] Supporto a temi custom  
- [ ] Documentazione live con Storybook o VitePress
