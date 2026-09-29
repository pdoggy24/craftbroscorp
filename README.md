# Craft Bros Corp — 3D Print Services Website

Simple, hand-coded service site for **Craft Bros Corp**.
No e-commerce, cart, payments, or backend.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — what Craft Bros Corp does + services overview |
| `services.html` | List of offerings (marked as placeholders where needed) |
| `about.html` | About Craft Bros Corp + contact |
| `quote.html` | Quote request form (mailto + copy-summary) |
| `css/styles.css` | Shared styles (navy / gold accents) |
| `js/quote.js` | Client-side form → email draft / clipboard |

## How to open

No server required. Open `index.html` in a browser:

- Double-click the file, or
- From a terminal: `open index.html` (macOS) / `xdg-open index.html` (Linux), or
- Drag `index.html` into a browser window

Navigate via the header: Home · Services · About · Request a Quote.

## Quote form behavior (no backend)

1. Visitor fills name, email, project description (required), plus optional phone,
   material/color, and quantity/size notes.
2. **Open email draft** builds a `mailto:Pwhitehead73@gmail.com` link with subject
   and body pre-filled from the form, then opens the visitor’s mail client.
3. **Copy summary** copies the same text to the clipboard if mailto doesn’t work
   (e.g. no mail app configured).
4. File uploads are **not** supported on a static site. The form tells visitors to
   attach STL/STEP/etc. when they send the email.

Customize the destination address in `js/quote.js` (`CONTACT`) and on the About page.

## What to customize

- **Business name:** already set to **Craft Bros Corp** in header/footer/titles.
  Change the logo text in each HTML file’s `<header>` if the name changes.
- **Email:** `Pwhitehead73@gmail.com` (About page, footer, `js/quote.js`).
- **Services copy:** items marked with a “Placeholder” badge on Home and Services.
- **About bio:** replace the placeholder paragraph on `about.html`.
- **Colors:** CSS variables at the top of `css/styles.css` (`--navy`, `--gold`, etc.).

## Obsolete shop pages

Previous product storefront files (`shop.html`, `product.html`, `cart.html`, and
related shop JS) were removed so they no longer appear in navigation or linger
as entry points.
