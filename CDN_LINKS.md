# CDN Links - Bootstrap Italia WC

## Repository: `blacksoulgem95/bootstrap-italia-wc`

### Link CDN Automatici

I link CDN vengono aggiornati automaticamente dalle GitHub Actions:

#### Per Versioni Specifiche (NPM)
```html
<!-- CSS Bootstrap Italia -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">

<!-- JavaScript - Versione specifica -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.esm.js"></script>
```

#### Per Build Più Recente (GitHub)
```html
<!-- CSS Bootstrap Italia -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">

<!-- JavaScript - Build più recente -->
<script src="https://cdn.jsdelivr.net/gh/blacksoulgem95/bootstrap-italia-wc@latest/bootstrap-italia-wc.js"></script>
<script src="https://cdn.jsdelivr.net/gh/blacksoulgem95/bootstrap-italia-wc@latest/bootstrap-italia-wc.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/blacksoulgem95/bootstrap-italia-wc@latest/bootstrap-italia-wc.esm.js"></script>
```

### Esempi di Utilizzo

#### HTML Base
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Italia WC</title>
    
    <!-- CSS Bootstrap Italia -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">
    
    <!-- JavaScript Bootstrap Italia WC -->
    <script src="https://cdn.jsdelivr.net/gh/blacksoulgem95/bootstrap-italia-wc@latest/bootstrap-italia-wc.js"></script>
</head>
<body>
    <div class="container">
        <h1>Bootstrap Italia WC</h1>
        
        <!-- Esempio Alert -->
        <it-alert type="success" dismissible>
            <strong>Successo!</strong> I componenti sono caricati correttamente.
        </it-alert>
        
        <!-- Esempio Form Input -->
        <it-form-input 
            type="email" 
            label="Email" 
            placeholder="nome@esempio.it"
            required
        ></it-form-input>
        
        <!-- Esempio Button -->
        <it-button type="primary" size="lg">
            <i class="it-check me-2"></i> Test Button
        </it-button>
    </div>
</body>
</html>
```

#### ES Modules
```html
<script type="module">
    import { ItAlert, ItFormInput, ItButton } from 'https://cdn.jsdelivr.net/gh/blacksoulgem95/bootstrap-italia-wc@latest/bootstrap-italia-wc.esm.js';
    
    // I componenti sono disponibili come classi
    console.log(ItAlert, ItFormInput, ItButton);
</script>
```

### Aggiornamento Automatico

I link CDN vengono aggiornati automaticamente:

1. **Push su master** → Aggiorna link GitHub (`@latest`)
2. **Creazione tag** → Aggiorna link NPM (`@version`)

### Test CDN

Per testare i link CDN, visita:
- **Demo Live:** `https://blacksoulgem95.github.io/bootstrap-italia-wc/`
- **Test CDN:** `https://blacksoulgem95.github.io/bootstrap-italia-wc/cdn-test.html`

### Troubleshooting

#### CDN Non Funziona
1. Verificare che il repository sia pubblico
2. Controllare che il branch `latest` esista
3. Verificare che i file siano presenti nel branch `latest`

#### Versioni NPM Non Disponibili
1. Verificare che il tag sia stato creato
2. Controllare che il workflow NPM sia completato
3. Verificare che il pacchetto sia pubblicato su NPM

#### GitHub Pages Non Aggiorna
1. Verificare che GitHub Pages sia abilitato
2. Controllare che il workflow deploy sia completato
3. Verificare che il branch `gh-pages` sia aggiornato