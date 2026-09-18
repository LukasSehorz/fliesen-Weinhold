# Fliesen &amp; Naturstein Weinhold – Landingpage

Entwurf für das Erstgespräch. Eine einzelne Landingpage, gebaut als statisches
HTML/CSS/JS ohne Framework und ohne Build-Schritt.

## Starten

```bash
cd site
python3 -m http.server 8777
# http://127.0.0.1:8777
```

Alternativ reicht ein Doppelklick auf `site/index.html` – nur der Google-Fonts-Import
braucht dann eine Internetverbindung.

## Aufbau

```
site/
├── index.html                 # die komplette Seite
└── assets/
    ├── css/style.css          # Design-System + alle Sektionen
    ├── js/main.js             # Diashow, Menü, Slider, Scroll-Reveal, Parallax
    └── img/                   # Bilder, Logo-SVGs, Favicon
Bilder/                        # Originalfotos des Kunden (unverändert)
```

## Design-System

Das Design ist 1:1 von der Referenz **brunoberger.at** übernommen. Die Token wurden
aus deren Stylesheet ausgelesen und unverändert eingesetzt:

| Token | Wert |
|---|---|
| Container | 1640 / 1364 / 1090 / 540 px |
| Sektionsabstand | 8.25 rem (ab 1400 px: 6.25 rem) |
| Elementabstand | 1.125 rem / 2.25 rem |
| Navigationshöhe | 6.65 rem |
| Basis-Schriftgröße | 16 px → 14.5 px (< 1600) → 13.75 px (< 1050) → 13.25 px (< 767) |
| Überschriften | h1 4.25 rem · h2 3.75 rem · h3 3 rem · h4 1.563 rem · h5 1.25 rem |
| Subline | 1 rem, Versalien, letter-spacing 0.05 em |
| Zitat | 1.75 rem, Lora |
| Schriften | Plus Jakarta Sans (Text) · Lora (Zitat, Wortmarke) |

**Farben:** Weiß `#ffffff` · Grauflächen `#ebebeb` · Text `#454545` ·
Akzent Weinhold-Blau `#0051a0` (aus dem Firmenschild ausgemessen).

**Animation:** Die Einblendung wurde auf der Referenzseite gemessen – Opazität 0 → 1
in **500 ms** mit **ease-out-quad**, zusätzlich 10 px Versatz nach oben. Dieselben
Werte sind hier gesetzt (`--reveal-duration`, `--ease`).

## Sektionen

1. **Header** – fixiert, halbtransparent, Logo links, Navigation mittig mit Trennstrichen, Burger rechts
2. **Hero** – vier KI-Bilder im 3-Sekunden-Wechsel (kein Video), Text unten links, rotierendes Siegel „seit 1978", Scroll-Pfeil
3. **Millimeterarbeit, die Jahrzehnte hält** – zentrierte Textspalte (Pendant zu „15 Handwerksbetriebe")
4. **Leistungen** – vier Bilder im Raster, Beschreibung erscheint beim Hovern
5. **Material, das den Raum trägt** – graue Sektion mit Linien-Dekor (Pendant zu „Design für das Zuhause-Gefühl")
6. **So läuft das bei uns ab** – vierstufiger Ablauf
7. **Zitat** – Lora, mit schwebenden Fliesen im Parallax (Pendant zu den Puzzleteilen)
8. **Referenzen** – Slider mit zwei sichtbaren Projekten
9. **Über uns** – Familie, Betrieb, Ausstellung + Kennzahlen
10. **Kontakt** – dunkle Sektion mit Formular
11. **Footer**

## Bilder

* **KI-generiert** (GPT Image 2 über kie.ai): `hero-1…4`, `leistung-1…4`, `ref-1…4`, `about`
* **Echte Kundenfotos**: `team.jpg` (Familie Weinhold), `firma.jpg` (Betriebsgebäude)

## Vor dem Livegang zu klären

* **Öffnungszeiten** aus Branchenverzeichnissen übernommen (Mo 9–12, Di–Fr 9–12 &amp; 14–18, Sa 9–12) – beim Kunden bestätigen lassen.
* **Referenzprojekte** – Titel und Orte sind Platzhalter, echte Projekte und Fotos ergänzen.
* **Kontaktformular** hat noch kein Backend; Versand (PHP-Mailer, Formspree o. Ä.) muss angebunden werden.
* **Impressum und Datenschutz** fehlen noch – rechtlich für den Livegang zwingend.
* **Logo** ist als SVG nachgezeichnet. Für die finale Seite die Originaldatei vom Kunden anfragen.
* **Kennzahl „5,0 / 5"** stammt aus den Google-Bewertungen (7 Bewertungen, Stand der Recherche) – vor Veröffentlichung prüfen.
