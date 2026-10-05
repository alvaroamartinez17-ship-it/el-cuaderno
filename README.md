# El Cuaderno

Phone app (PWA) for handwritten notes. Take a photo of a page, the app cleans it up and stores it small on the phone, turns the handwriting into text with the phone's own reader (Live Text on iPhone, Google Lens on Android), and exports a day or week of notes to OneNote.

Everything stays on the phone (IndexedDB). No server, no account.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app: screens, storage, photo cleanup, export, settings |
| `sw.js` | Offline support and updates |
| `manifest.json` | App name and icon for "Add to Home Screen" |
| `icon.svg`, `icon-180.png`, `icon-192.png`, `icon-512.png` | App icons (180 is the iPhone Home Screen icon) |

## Put it on GitHub Pages

1. Create a new repository called `el-cuaderno` on github.com.
2. **Add file → Upload files**, drop in all files from this folder, then **Commit changes**.
3. **Settings → Pages**: Source **Deploy from a branch**, branch **main**, folder **/ (root)**, **Save**.
4. After a minute the app is at `https://<your-github-name>.github.io/el-cuaderno/`.
5. Open that address on the phone and choose **Add to Home Screen** (iPhone: Share button; Android: browser menu).

## Publish an update

1. Change the files you need.
2. Raise the version number in **both** places, to the same value:
   - `sw.js`: `const VERSION = 'el-cuaderno-v1.1.1';`
   - `index.html`: `const APP_VERSION='1.1.1';`
3. Upload the changed files to the repository.
4. On the phone: open El Cuaderno → ⚙ Settings → **Check for update** → **Install update**. A banner also appears by itself when a new version has been found.

Notes are not touched by updates. If the version number is not raised, the phone keeps the old version.

## Delete the app

⚙ Settings → **Delete app and all data** removes all notes, photos, text and the offline files. Then remove the icon from the home screen by hand (press and hold → Remove). Export first if you want to keep anything.

## Handwriting reading

**Read handwriting** opens the photo large, with steps for your phone:

- **iPhone:** Apple Live Text. Press and hold on the writing, select, Copy, then tap **Paste copied text**. Runs on the phone and works offline. If Live Text does not react inside the app, **Open in Photos** → Save Image → Photos app → Live Text button → Select All → Copy.
- **Android:** **Open in Google Lens** → Text → Select all → Copy text, then **Paste copied text**. Google Lens usually needs internet.

Pasted text is added to the note, so you can copy a page in several parts. You can fix words by hand.

## Phones

| Phone | Works | Notes |
|---|---|---|
| iPhone 11, 13, SE 2nd/3rd gen | Everything, Live Text for handwriting | Photos are saved as JPEG (Safari cannot write WebP), about 1.5–2× bigger than on Android |
| iPhone SE 1st gen (2016) | Everything except Live Text | Live Text needs an iPhone XS/XR or newer; type the text instead |
| Android with current Chrome, Samsung Internet or Edge | Everything, Google Lens for handwriting | Install with the **Install** button in the app or the browser menu |

**iPhone:** install from Safari (Share → Add to Home Screen) and always open the app from the Home Screen icon. Safari and the Home Screen app keep separate notes, and Safari may clear website data after a few weeks without use; the Home Screen app does not.

On iPhone, **Download as file** opens the share sheet; choose **Save to Files**.
