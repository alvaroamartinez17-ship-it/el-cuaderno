# El Cuaderno

Phone app (PWA) for handwritten notes. Take a photo of a page, the app cleans it up and stores it small on the phone, can read the handwriting on the phone itself, and exports a day or week of notes to OneNote.

Everything stays on the phone (IndexedDB). No server, no account.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app: screens, storage, photo cleanup, export, settings |
| `ocr-worker.js` | Handwriting reader that runs in the background on the phone |
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
   - `sw.js`: `const VERSION = 'el-cuaderno-v1.0.2';`
   - `index.html`: `const APP_VERSION='1.0.2';`
3. Upload the changed files to the repository.
4. On the phone: open El Cuaderno → ⚙ Settings → **Check for update** → **Install update**. A banner also appears by itself when a new version has been found.

Notes are not touched by updates. If the version number is not raised, the phone keeps the old version.

## Delete the app

⚙ Settings → **Delete app and all data** removes all notes, photos, read text, the reading model and the offline files. Then remove the icon from the home screen by hand (press and hold → Remove). Export first if you want to keep anything.

## Handwriting reading

Uses the TrOCR small handwriting model through Transformers.js. The model (about 60 MB) is downloaded once on first use and then works offline. Photos are never uploaded. The model was trained on English handwriting, so other languages need more manual correction.

## Phones

| Phone | Works | Notes |
|---|---|---|
| iPhone 11, 13, SE 2nd/3rd gen | Everything | Photos are saved as JPEG (Safari cannot write WebP), about 1.5–2× bigger than on Android |
| iPhone SE 1st gen (2016) | Everything except reading handwriting | Stops at iOS 15; the reader needs iOS 16.4+ |
| Android with current Chrome, Samsung Internet or Edge | Everything | Install with the **Install** button in the app or the browser menu |

**iPhone:** install from Safari (Share → Add to Home Screen) and always open the app from the Home Screen icon. Safari and the Home Screen app keep separate notes, and Safari may clear website data after a few weeks without use; the Home Screen app does not.

On iPhone, **Download as file** opens the share sheet; choose **Save to Files**.
