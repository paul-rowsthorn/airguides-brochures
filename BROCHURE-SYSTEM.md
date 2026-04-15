# Airguides Brochure System

## Purpose
Post-lead-capture sales brochure. Delivered to potential customers AFTER they've expressed interest and provided contact details. This is the final piece before they book. It needs to close.

## Design System

### Colours
- `--deep: #0a1628` (background, primary dark)
- `--ocean: #0d2847` (alternating section background)
- `--teal: #2dd4bf` (accent, CTAs, labels)
- `--sand: #f5f0eb` (highlighted body text)
- `--white: #ffffff` (headings)
- `--grey-light: #94a3b8` (body text)
- `--grey-mid: #64748b` (secondary text, labels)

### Typography
- **Headings:** Playfair Display (serif) - 600/700 weight
- **Body:** Inter (sans-serif) - 300-700 weight
- **Section labels:** Inter, 12px, 600 weight, 2px letter-spacing, uppercase, teal
- **Section titles:** Playfair Display, clamp(32px, 4vw, 48px), 600 weight

### Layout
- Max content width: 1100px
- Section padding: 100px vertical, 40px horizontal
- Mobile breakpoint: 768px
- Alternating backgrounds: deep / ocean / deep / ocean

### Logo
```
https://cdn.prod.website-files.com/618492b2c3bd4268f23ff521/674ea9b9030ce35fdba791a5_airguide-logo-01.svg
```

### Contact Details (standard across all brochures)
- Email: hello@airguides.com
- Phone/WhatsApp: (+61) 402 552 918

## Section Order (Sales Flow)

1. **Hero** - Full-screen dramatic photo, trip title, key facts bar (duration, location, group size, price)
2. **Highlights** - 6-card grid of the trip's selling points (emoji icons)
3. **About the Experience** - 2-column: narrative text + portrait image. Opens with the hook.
4. **Testimonial 1** - Centred quote, name, trip year
5. **Your Guide** - 2-column: portrait photo + bio. "Storyteller Guide" label.
6. **Why Book This Experience?** - Single-column narrative. The guide's story, what makes this different from competitors.
7. **Photo Gallery Strip** - 4 images, square crop, edge-to-edge
8. **Day-by-Day Itinerary** - Left column: day number (teal). Right column: title, subtitle, description.
9. **Full-Width Image** - Dramatic breaker image, 60vh height
10. **Accommodation** - 2-column: photo + description. Then 4-photo gallery strip.
11. **The Boat/Vehicle** - 2-column reversed layout: text left, photo right. (Or transport relevant to trip.)
12. **Testimonial 2** - Second review for reinforcement
13. **Your Crew** - 5-column grid of circular headshots with name, role, short bio
14. **What's Included** - 2-column: Included (teal dots) / Not Included (grey dots)
15. **FAQ** - Question/answer pairs, max-width 780px centred
16. **Pricing & Dates** - Large price display, deposit info, date cards, spots remaining
17. **CTA** - "Secure Your Spot", enquire button, email + WhatsApp
18. **Footer** - airguides.com, copyright

## Process for New Brochures

### 1. Gather Content
- Scrape trip page from airguides.com: `web_fetch https://www.airguides.com/product/[trip-slug]`
- Extract all image URLs from the page source
- Get guide bio from their website or Blue Vagabonds crew page
- Get testimonials from airguides.com homepage and trip page
- Paul provides: accommodation photos, boat/transport photos, pricing, dates, FAQs, crew details

### 2. Build HTML
- Copy the Tonga template as starting point
- Replace all content: hero image, trip details, guide, itinerary, etc.
- Adjust highlight cards to match the specific trip
- Update FAQ with trip-specific questions
- Update pricing, dates, deposit terms
- Upload trip-specific photos to github.com/paul-rowsthorn/airguides-brochures

### 3. Review
- Push HTML to airguides-brochures repo
- Share GitHub Pages link: `https://paul-rowsthorn.github.io/airguides-brochures/[filename].html`
- Iterate with Paul's feedback

### 4. Generate PDF
```bash
# Generate PDF with Chrome headless
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --print-to-pdf-no-header --no-margins \
  --print-to-pdf="[output-path].pdf" \
  "[input-html-path]"

# Compress with Ghostscript (80MB -> ~1.4MB)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
  -dNOPAUSE -dBATCH -dQUIET \
  -sOutputFile="[compressed-output].pdf" \
  "[input-pdf].pdf"
```

### 5. Deploy
- HTML lives on GitHub Pages for web viewing
- Compressed PDF for email delivery to leads
- Both stored in `brochures/` workspace folder and git repo

## File Structure
```
brochures/
  BROCHURE-SYSTEM.md          # This file
  tonga-humpbacks-jono-allen.html   # Template / reference brochure
  [trip-name].html             # Each trip gets its own HTML
  [trip-name]-photos/          # Or inline in root with prefixes
  accom-*.jpg                  # Accommodation photos
  boat-*.jpg                   # Boat/transport photos
```

## Git Repo
- **Repo:** github.com/paul-rowsthorn/airguides-brochures
- **GitHub Pages:** paul-rowsthorn.github.io/airguides-brochures/
- All brochure HTML + images committed here for hosting

## Writing Rules
- No em dashes (Airguides brand rule)
- Direct, specific language. No fluff, no generic travel-agency copy.
- Lead with what makes this trip different from a regular tour
- Social proof early (testimonial within first 3 scrolls)
- Scarcity: always mention max group size and spots
- The reader has already expressed interest. Job is to CLOSE, not attract.

## Template File
The Tonga brochure (`tonga-humpbacks-jono-allen.html`) is the canonical template. Copy it for new trips.
