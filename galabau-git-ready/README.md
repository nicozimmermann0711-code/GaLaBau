# Becirovic GaLaBau - Website

Moderne, conversion-optimierte One-Page Website für einen Garten- und Landschaftsbaubetrieb.

## Struktur

```
becirovic-website/
├── index.html              # Hauptseite
├── css/
│   └── styles.css          # Alle Styles
├── js/
│   └── main.js             # Navigation, Forms, Tracking
├── pages/
│   ├── impressum.html      # Impressum
│   └── datenschutz.html    # Datenschutzerklärung
└── images/                 # Bilder (manuell hinzufügen)
```

## Setup

### 1. Bilder hinzufügen

Füge folgende Bilder in den `/images/` Ordner ein:

- `hero-bg.jpg` - Hero-Hintergrundbild (1920x1080, Garten/Landschaft)
- `gartengestaltung.jpg` - Service-Bild (800x500)
- `pflasterarbeiten.jpg` - Service-Bild (800x500)
- `gartenpflege.jpg` - Service-Bild (800x500)
- `baumarbeiten.jpg` - Service-Bild (800x500)
- `projekt1-vorher.jpg` / `projekt1-nachher.jpg` - Vorher/Nachher (800x600)
- `projekt2-vorher.jpg` / `projekt2-nachher.jpg`
- `projekt3-vorher.jpg` / `projekt3-nachher.jpg`
- `team-inhaber.jpg` - Inhaber-Foto (600x800, Portrait)
- `og-image.jpg` - Social Media Preview (1200x630)

### 2. Platzhalter ersetzen

Suche nach `[[...]]` im Code und ersetze mit echten Daten:

- `[[VORNAME NACHNAME]]` - Name des Inhabers
- `[[STRASSE HAUSNUMMER]]` - Adresse
- `[[PLZ]]` `[[STADT]]` - PLZ und Ort
- `+49XXXXXXXXXXX` - Telefonnummer (z.B. +4923814567890)
- `[[GRÜNDUNGSJAHR]]` - Wann gegründet
- `[[XXX]]` - Projektanzahl, Preise etc.
- `[[FACEBOOK]]` `[[INSTAGRAM]]` - Social Media Handles

### 3. Formular konfigurieren

Option A: **FormSubmit.co** (kostenlos, kein Backend)
```javascript
// In js/main.js, Zeile ~195, ersetzen:
fetch('https://formsubmit.co/ajax/Info@becirovic-galabau.de', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
})
```

Option B: **Netlify Forms** (wenn auf Netlify gehostet)
```html
<form name="contact" method="POST" data-netlify="true">
```

Option C: **Eigenes Backend** (PHP, Node.js etc.)

### 4. Google Analytics (optional)

1. GTM Container erstellen: tagmanager.google.com
2. GA4 Property erstellen: analytics.google.com
3. Container-ID in `js/main.js` ersetzen:
   ```javascript
   const gtmId = 'GTM-XXXXXXX'; // Deine GTM-ID
   ```

### 5. Hosting

Upload per FTP oder Git:

- **Netlify**: Drag & Drop oder Git-Repo verbinden
- **GitHub Pages**: Repository erstellen, Settings → Pages
- **Traditionell**: FTP zu deinem Webspace

## Features

✅ Responsive Design (Mobile-First)
✅ Sticky Navigation mit Mobile-Menü
✅ Cookie-Consent Banner (DSGVO-konform)
✅ Smooth Scrolling
✅ Kontaktformular mit Validierung
✅ Telefon/WhatsApp Sticky Buttons (Mobile)
✅ Schema.org Markup (LocalBusiness + FAQ)
✅ Performance-optimiert
✅ Barrierefreiheit berücksichtigt

## Checkliste vor Go-Live

- [ ] Alle Platzhalter `[[...]]` ersetzt
- [ ] Bilder hochgeladen und komprimiert
- [ ] Telefonnummern getestet (klickbar)
- [ ] Formular getestet (E-Mail kommt an)
- [ ] Impressum vollständig
- [ ] Datenschutz vollständig
- [ ] Mobile getestet (iOS + Android)
- [ ] Schema-Markup validiert: https://validator.schema.org/

## Rechtlicher Hinweis

Die Impressum- und Datenschutz-Vorlagen sind Muster und ersetzen keine Rechtsberatung.
Bitte von einem Rechtsanwalt prüfen lassen!

---

Erstellt für Becirovic GaLaBau | Januar 2025
