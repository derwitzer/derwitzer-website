# Dokumentation: derwitzer-website

Stand: 1. Oktober 2026. Die Analyse bezieht sich auf Commit `016526a`; spätere Änderungen stehen im [Änderungsprotokoll](#änderungsprotokoll).

## Überblick

Das Repository enthält die persönliche Website von Thomas Witzer unter <https://der-witzer.at/>. Sie stellt die Bereiche Podcast, Bier, Coding und Content Creation vor.

| Eigenschaft | Wert |
| --- | --- |
| Generator | [Hugo](https://gohugo.io/) (statische Website, extended-Variante) |
| Theme | [Blowfish](https://blowfish.page/) v2.95.0, eingebunden als Git-Submodul |
| Sprache | nur Deutsch (`de`) |
| Startseite | Blowfish-Layout `profile` (Autorenbild, Headline, Bio, Social Links) |
| Cookie-Consent | [Klaro](https://klaro.org/), lokal ausgeliefert |
| Webanalyse | Google Analytics 4 (`G-JXLW1D20TW`), über Klaro gesteuert |
| Redaktion | [Front Matter CMS](https://frontmatter.codes/) (VS-Code-Erweiterung) |
| Remote | `git@github.com:derwitzer/derwitzer-website.git`, Branch `main` |

Ein Build erzeugt 32 Seiten und 20 statische Dateien. Eine README, ein Deployment-Skript oder eine CI-Konfiguration gibt es im Repository nicht; wie die Seite auf den Server kommt, ist hier nicht festgehalten.

## Verzeichnisstruktur

```
derwitzer-website/
├── archetypes/default.md        Vorlage für neue Inhalte (TOML-Front-Matter, draft = true)
├── config/_default/             Hugo- und Theme-Konfiguration
│   ├── hugo.toml                Basis: baseURL, Sprache, Taxonomien, Sitemap, Outputs
│   ├── languages.de.toml        Seitentitel, Autor, Bio, Social Links
│   ├── menus.de.toml            Haupt- und Footer-Menü
│   ├── params.toml              Blowfish-Optionen (Farbschema, Layouts, Anzeige)
│   ├── markup.toml              Goldmark, Syntax-Highlighting, Inhaltsverzeichnis
│   └── module.toml              leer
├── assets/css/custom.css        eigenes CSS, wird vom Theme automatisch eingebunden
├── content/                     Seiteninhalte (siehe unten)
├── layouts/partials/            eigene Erweiterungen des Themes
│   ├── extend-head.html         lädt Klaro und bindet analytics.html ein
│   ├── analytics.html           Google-Analytics-Snippet
│   └── extend-footer.html       öffnet den Klaro-Dialog über den Footer-Link
├── static/
│   ├── images/coding/           4 Illustrationen (PNG) für die Coding-Seite
│   ├── images/podcast/          4 Podcast-Logos (JPG)
│   └── klaro/                   klaro.js (236 KB) und config.js
├── themes/blowfish/             Git-Submodul (74 MB)
├── .frontmatter/, frontmatter.json   Konfiguration und Datenbank von Front Matter CMS
├── .vscode/settings.json        leere Markdown-Einstellungen
├── public/                      Build-Ausgabe (von Git ignoriert)
└── resources/                   Hugo-Cache (von Git ignoriert)
```

## Inhalte

Alle Seiten sind Abschnitts-Seiten (`_index.md`) mit dem Layout `simple`. Einzelne Artikel oder Blogbeiträge existieren noch nicht.

| Pfad | Menüeintrag | Umfang | Zustand |
| --- | --- | --- | --- |
| `content/podcasts/` | Podcast | ca. 700 Wörter | ausgearbeitet: Hopfologie (aktiv), Gabelbissen, Sprechgröstl, Nerdklärt, Gach und Guad (eingestellt) |
| `content/coder/` | Coder | ca. 500 Wörter | ausgearbeitet: Werdegang seit 1994, aktueller Stack, Projektidee Podcasting mit Hugo |
| `content/cc/` | Content Creator | ca. 150 Wörter | Kurztexte zu Portrait-Fotografie, Video, Audio |
| `content/cc/gallerie/` | – | leer | Platzhalter |
| `content/bier/` | Bier Sommelier | nur Überschrift | Platzhalter |
| `content/blog/` | Blog | leer | Platzhalter |
| `content/about/` | Über mich | 1 Satz | Platzhalter |
| `content/impressum/` | Impressum (Footer) | nur Überschrift | Platzhalter |
| `content/datenschutz/` | Datenschutz (Footer) | ca. 4.500 Wörter | vollständig, Stand 4. Januar 2026, erstellt mit datenschutz-generator.de |

Die Seiten Podcast und Coding nutzen die Blowfish-Shortcodes `lead`, `badge`, `figure` und `alert` sowie eingebettetes HTML für das Bild-Text-Layout. Das funktioniert, weil in `markup.toml` `unsafe = true` gesetzt ist. Die Coding-Seite verwendet dafür die eigene Klasse `media-row` (siehe [Eigenes CSS](#eigenes-css)), die Podcast-Seite noch Tailwind-Klassen direkt im HTML.

## Eigenes CSS

Blowfish liefert ein vorkompiliertes Stylesheet aus, das nur die Tailwind-Klassen enthält, die das Theme selbst verwendet. Klassen wie `gap-6`, `w-32`, `md:w-40` oder `mb-[10px]` existieren darin nicht und bleiben in eigenen Inhalten wirkungslos. Eigene Gestaltung gehört deshalb in `assets/css/custom.css`; das Theme hängt diese Datei automatisch an sein CSS-Bundle an.

**`.media-row`** setzt ein Bild neben einen Text:

- ab 768 px Breite nebeneinander, Bild 10 rem breit, Text füllt den Rest; darunter untereinander, Bild 8 rem breit
- die Reihenfolge im Markdown bestimmt, ob das Bild links oder rechts steht
- Bilder erhalten abgerundete Ecken; die Parameter `class` und `figureClass` am `figure`-Shortcode sind nicht nötig (`figureClass` kennt Blowfish ohnehin nicht)

```markdown
## Überschrift {{< badge >}}Hinweis{{< /badge >}} {#anker}
<div class="media-row">
{{< figure src="/images/coding/beispiel.png" alt="Beschreibung" >}}

Ein Absatz Text.
</div>
```

Dabei gilt:

- Zwischen Shortcode und Text muss eine Leerzeile stehen, sonst landet das Bild im Absatz.
- Mehrere Absätze kommen in ein eigenes `<div>` (mit Leerzeile nach `<div>` und vor `</div>`), damit sie eine gemeinsame Spalte bilden. Ein Beispiel steht im Abschnitt „Aktuelle Projekte“ der Coding-Seite.
- Überschriften mit Shortcode bekommen eine feste Anker-ID (`{#anker}`), weil Hugo sonst den Shortcode-Platzhalter in die ID schreibt.

**Badges in Überschriften** stehen durch eine zweite Regel neben dem Überschriftentext statt in einer eigenen Zeile. Die Regel gilt für alle Seiten, also auch für die Podcast-Seite.

## Konfiguration

**Navigation** (`menus.de.toml`)

- Hauptmenü: Podcast, Bier Sommelier, Coder, Content Creator, Blog, Über mich
- Footer: Impressum, Datenschutz, Cookie Einstellungen (`/#cookie-settings`)

**Theme** (`params.toml`)

- Farbschema `github`, helles Design als Standard, Umschalter im Footer, kein automatischer Wechsel
- Suche aktiv, Header-Layout `basic`
- Artikel zeigen Datum, Lesezeit und Wortanzahl; Autor, Breadcrumbs, Inhaltsverzeichnis, Taxonomien, Views und Likes sind aus
- Listen gruppieren nach Jahr; "Neueste Beiträge" auf der Startseite ist aus
- Firebase, Fathom, Umami, Seline, Buy Me a Coffee und AdSense sind nicht konfiguriert

**Hugo** (`hugo.toml`)

- `robots.txt` und Sitemap werden erzeugt, Startseite zusätzlich als RSS und JSON (für die Suche)
- Taxonomien: `tags`, `categories`, `authors`, `series` (noch ohne Einträge)
- Entwürfe und zukünftige Beiträge werden nicht gebaut

**Autor** (`languages.de.toml`)

- Name, Headline und Bio für die Startseite; Avatar wird von GitHub geladen
- Links: Bluesky, GitHub, Instagram, LinkedIn, Mastodon

## Cookie-Consent und Analytics

Der Ablauf ist so gedacht:

1. `extend-head.html` lädt `/klaro/config.js` und `/klaro/klaro.js` und bindet `analytics.html` ein.
2. `analytics.html` enthält das Google-Analytics-Snippet in einem `<script type="text/plain" data-klaro-service="google-analytics">`, das Klaro erst nach Einwilligung aktiviert.
3. `static/klaro/config.js` definiert einen Dienst (`google-analytics`, Zweck `statistics`, nicht erforderlich, standardmäßig aus). Die Einwilligung liegt 365 Tage im Cookie `klaro`.
4. `extend-footer.html` fängt Klicks auf Links ab, die auf `cookie-settings` enden, und öffnet den Klaro-Dialog.

## Arbeiten mit dem Projekt

```bash
# Klonen inklusive Theme
git clone --recurse-submodules git@github.com:derwitzer/derwitzer-website.git

# Theme nachträglich holen
git submodule update --init

# Lokale Vorschau unter http://localhost:1313
hugo server

# Produktions-Build nach public/
hugo
```

Neue Inhalte lassen sich mit `hugo new content <pfad>.md` oder über Front Matter CMS in VS Code anlegen. Bilder liegen unter `static/images/` und werden in den Inhalten als `/images/...` referenziert.

## Historie

| Datum | Commit | Inhalt |
| --- | --- | --- |
| 02.01.2026 | `a21016f`, `95a2f5f` | Projektstart, Grundgerüst |
| 04.01.2026 | `8574f23` | Datenschutz, Cookie-Banner, neue `_index.md`-Dateien |
| 18.08.2026 | `8349050`, `5da6e4d` | Umstrukturierung, erste Inhalte, Formatierung |
| 29.08.2026 | `016526a` | weitere Inhalte |

## Änderungsprotokoll

### 1. Oktober 2026: Formatierung der Coding-Seite

Ausgangslage: Die Bilder der Coding-Seite hatten keine feste Breite und erschienen je Abschnitt unterschiedlich groß, zwischen Bild und Text fehlte der Abstand, und im letzten Abschnitt lag das Bild innerhalb des Textabsatzes.

Ursachen:

- Der Parameter `figureClass` wird vom `figure`-Shortcode ignoriert.
- Die Klassen `gap-6`, `w-32` und `md:w-40` fehlen im CSS des Themes.
- Im Abschnitt „Aktuelle Projekte“ fehlte die Leerzeile vor dem Bild.

Änderungen:

| Datei | Änderung |
| --- | --- |
| `assets/css/custom.css` | neu: Klasse `.media-row` für das Bild-Text-Layout; Regel, die Badges in Überschriften in die Zeile setzt |
| `content/coder/_index.md` | Wrapper-Klassen durch `media-row` ersetzt |
| `content/coder/_index.md` | wirkungslose Parameter `figureClass` und `class="rounded-lg"` entfernt (die Rundung kommt jetzt aus dem CSS) |
| `content/coder/_index.md` | „Aktuelle Projekte“: Leerzeile vor dem Bild ergänzt, Text in zwei Absätze getrennt und in ein `<div>` gefasst |
| `content/coder/_index.md` | feste Anker-IDs: `#anfaenge`, `#web-aera`, `#aktuell`, `#projekte` (vorher z. B. `#die-anfänge-hahahugoshortcode11s1hbhb`) |
| `DOKUMENTATION.md` | neu angelegt, Abschnitte „Eigenes CSS“ und „Änderungsprotokoll“ ergänzt |

Der Text der Seite ist unverändert. Geprüft wurde das erzeugte HTML und das CSS-Bundle; eine Sichtprüfung im Browser steht noch aus.

Auswirkung auf andere Seiten: Die Badge-Regel wirkt auch auf der Podcast-Seite. Deren Bild-Text-Layout und Anker-IDs sind unverändert.

## Auffälligkeiten

### Funktional

1. **Google Analytics wird vermutlich nie geladen.** In `layouts/partials/analytics.html` stehen zwei `<script>`-Tags innerhalb des äußeren `<script type="text/plain">`. HTML erlaubt keine verschachtelten Script-Tags: Der äußere Block endet am ersten `</script>`. Folge laut gerendertem HTML:
   - Der Block, den Klaro nach Einwilligung aktiviert, enthält nur den Text `<script async src="…gtag/js…">` und damit kein gültiges JavaScript; `gtag.js` wird nicht nachgeladen.
   - Der zweite Block (`dataLayer`, `gtag('config', …)`) läuft bei jedem Seitenaufruf ohne Einwilligung, sendet aber nichts, weil die Bibliothek fehlt.
   - Am Ende bleibt ein überzähliges `</script>` im `<head>`.

   Das ist aus dem erzeugten HTML abgeleitet und nicht im Browser getestet. Korrekt wären zwei getrennte Tags, jeweils mit `type="text/plain"` und `data-klaro-service="google-analytics"` (das externe zusätzlich mit `data-src` statt `src`).
2. **Link zur Datenschutzerklärung im Klaro-Dialog ist relativ.** `privacyPolicyUrl: 'datenschutz'` führt auf Unterseiten zu `/podcasts/datenschutz` und damit ins Leere. Richtig wäre `/datenschutz/`.
3. **Hugo-Version und Theme passen nicht zusammen.** Blowfish v2.95.0 unterstützt Hugo 0.141.0 bis 0.154.0, installiert ist 0.167.0. Der Build läuft durch, meldet aber eine Kompatibilitätswarnung und die veraltete Verwendung von `.Site.LanguageCode`. Ein Theme-Update über das Submodul behebt das voraussichtlich.

4. **Podcast-Seite nutzt Klassen, die es nicht gibt.** `gap-6`, `mb-[10px]`, `md:mr-[10px]`, `md:ml-[10px]` und der Parameter `figureClass` haben dort keine Wirkung, und die Anker-IDs enthalten Shortcode-Platzhalter. Es fällt weniger auf, weil die Logos klein sind. Die Seite lässt sich wie die Coding-Seite auf `media-row` umstellen.

### Inhaltlich

5. **Impressum ist leer.** Die Seite ist im Footer verlinkt, enthält aber nur die Überschrift. Für eine öffentlich erreichbare österreichische Website besteht eine Offenlegungspflicht (§ 25 MedienG, ggf. § 5 ECG).
6. **Leere Menüpunkte.** Blog und Bier sind im Hauptmenü verlinkt, haben aber keinen Inhalt; "Über mich" besteht aus einem Satz.
7. **Uneinheitliche Benennung.** Menüeintrag "Coder", Seitentitel "Coding", Pfad `/coder/`. Der Ordner `gallerie` weicht von der deutschen Schreibweise "Galerie" ab und landet so in der URL.
8. **Front Matter uneinheitlich.** Fünf Seiten haben keinen `title` und schreiben `Layout` groß, zwei Seiten haben `title` und `layout`. Hugo behandelt beides gleich, aber ohne `title` fehlt der Seitentitel im Browser-Tab und in Suchergebnissen.

### Aufräumen

9. **`.DS_Store` und `.hugo_build.lock` sind eingecheckt.** Sechs `.DS_Store`-Dateien und die Lock-Datei gehören in die `.gitignore` und aus dem Index entfernt.
10. **Veraltete Build-Ausgabe.** `public/` enthält noch `coding/` und `fotografie/` aus der Struktur vor dem Umbau. Das Verzeichnis ist ignoriert; wer es direkt hochlädt, veröffentlicht die alten Seiten mit. `hugo --cleanDestinationDir` räumt auf.
11. **Bilder der Coding-Seite sind überdimensioniert.** Die PNGs sind 1.400 bis 1.920 px breit und werden mit 128 bis 160 px angezeigt. Da sie in `static/` liegen, verkleinert Hugo sie nicht.
12. **Leere Dateien.** `config/_default/module.toml` und `.vscode/settings.json` haben keinen wirksamen Inhalt.
