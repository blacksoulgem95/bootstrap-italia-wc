# Bootstrap Italia WC

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Bootstrap Italia WC** è una libreria di Web Components in **vanilla JavaScript** che implementa i componenti della [libreria Bootstrap Italia](https://italia.github.io/bootstrap-italia/).

L'obiettivo è fornire componenti nativi e riutilizzabili che non dipendono da framework specifici (React, Vue, Angular), semplificando l'integrazione in qualsiasi progetto web o CMS.

## Caratteristiche

- Implementazione 1:1 dei componenti di Bootstrap Italia  
- Nessuna dipendenza da framework (vanilla JS)  
- Stili basati su Bootstrap Italia  
- Installazione semplice via npm o CDN  
- Compatibile con qualsiasi stack frontend (Next.js, Angular, Vue, CMS vari)  

## Installazione

### Via npm
    npm install bootstrap-italia-wc

### Via CDN
    <script type="module" src="https://unpkg.com/bootstrap-italia-wc/dist/index.js"></script>

## Utilizzo

Esempio con il componente `it-alert`:

    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8">
      <title>Esempio Bootstrap Italia WC</title>
      <link rel="stylesheet" href="https://italia.github.io/bootstrap-italia/dist/css/bootstrap-italia.min.css">
      <script type="module" src="https://unpkg.com/bootstrap-italia-wc/dist/index.js"></script>
    </head>
    <body>
      <it-alert type="success" dismissible>
        Operazione completata con successo!
      </it-alert>
    </body>
    </html>

## Documentazione

La documentazione dei componenti è basata su Bootstrap Italia.  
Ogni Web Component mantiene la stessa API concettuale, con adattamenti alle proprietà HTML.

## Contribuire

1. Fai un fork del progetto  
2. Crea un branch per la tua feature:  
       git checkout -b feature/nome-feature
3. Fai commit delle modifiche  
4. Apri una Pull Request  

Linee guida dettagliate → vedi [AGENT.md](./AGENT.md)

## Licenza

Distribuito sotto licenza MIT. Vedi [LICENSE](./LICENSE) per maggiori dettagli.
