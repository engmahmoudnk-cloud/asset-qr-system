# Quick Start Guide

Get your Asset QR System up and running in 5 minutes!

## 🚀 Fast Track (GitHub Pages)

### Step 1: Fork or Clone
```bash
git clone https://github.com/yourusername/asset-qr-system.git
cd asset-qr-system
```

### Step 2: Push to Your GitHub
```bash
# If you cloned, change the remote:
git remote set-url origin https://github.com/YOUR-USERNAME/asset-qr-system.git
git push -u origin main

# If you're starting fresh:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/asset-qr-system.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings**
3. Click **Pages** (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 2-3 minutes

### Step 4: Access Your App
Visit: `https://YOUR-USERNAME.github.io/asset-qr-system`

✅ Done! Your app is live with HTTPS (required for camera).

---

## 💻 Local Testing

### Method 1: Python (Easiest)
```bash
python -m http.server 8000
```
Visit: `http://localhost:8000`

### Method 2: Node.js
```bash
npx http-server -p 8000
```
Visit: `http://localhost:8000`

### Method 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

⚠️ **Note:** Camera won't work on HTTP locally. Use GitHub Pages for full testing.

---

## 📱 Using the App

### Scan QR Code:
1. Click **"Scan QR Code"** button
2. Allow camera permissions
3. Point camera at QR code
4. Asset info appears automatically

### Manual Search:
1. Type asset tag in search box
2. Click **Search** or press Enter
3. View asset details

---

## 🔧 Customize Your Data

### Option 1: Use Your Existing Data

If you have a JSON file like the one provided:

```bash
# Convert your data
node data-converter.js YOUR-FILE.json assets.json
```

### Option 2: Edit Directly

Edit `assets.json`:
```json
{
  "ASSET-001": {
    "fullUniqueAssetTag": "ASSET-001",
    "tagType": "Equipment",
    "quantity": 1,
    "portfolioName": "Main Campus",
    "districtName": "North District",
    "buildingName": "Building A",
    "buildingArea": "Floor 2",
    "floorName": "2nd Floor",
    "assetTypeName": "Computer",
    "description": "Dell Laptop",
    "countryOfOrigin": "USA",
    "systemName": "IT Equipment"
  }
}
```

---

## 🏷️ Generate QR Codes

1. Open `qr-generator.html` in your browser
2. Load assets or enter asset tag
3. Click "Generate QR Code"
4. Download and print

---

## 🐛 Troubleshooting

### Camera Not Working:
- ✅ Must use HTTPS (deploy to GitHub Pages)
- ✅ Allow camera permissions in browser
- ✅ Check camera is not used by another app

### Assets Not Loading:
- ✅ Check `assets.json` is valid JSON
- ✅ Verify file is in same directory as `index.html`
- ✅ Check browser console for errors

### Search Not Finding Assets:
- ✅ Verify asset tag is in `assets.json`
- ✅ Check spelling matches exactly
- ✅ Try partial search

### Page Not Loading:
- ✅ Clear browser cache
- ✅ Check all files are uploaded
- ✅ Verify GitHub Pages is enabled

---

## 📊 File Structure

```
asset-qr-system/
├── index.html              ← Main app
├── app.js                  ← Logic
├── styles.css              ← Styling
├── assets.json             ← Your data (3359 assets)
├── qr-generator.html       ← QR code generator
├── data-converter.js       ← Data converter
├── README.md               ← Documentation
├── DEPLOYMENT.md           ← Deploy guide
├── TESTING.md              ← Test guide
└── .github/
    └── workflows/
        └── deploy.yml      ← Auto-deploy
```

---

## ⚡ Next Steps

### Add More Assets:
1. Edit `assets.json`
2. Commit and push
```bash
git add assets.json
git commit -m "Update assets"
git push
```

### Customize Appearance:
- Edit colors in `styles.css` (`:root` section)
- Modify layout in `index.html`
- Update header text

### Add Features:
- Export to Excel
- Asset history
- User authentication
- Analytics

---

## 🆘 Need Help?

- 📖 Read full [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md)
- 🧪 Review [TESTING.md](TESTING.md)
- 💬 [Open an issue](https://github.com/yourusername/asset-qr-system/issues)

---

## 🎉 You're Ready!

Your asset management system is now live. Share the URL with your team and start scanning!

**Production URL:** `https://YOUR-USERNAME.github.io/asset-qr-system`

---

### Common Commands Reference

```bash
# View assets
cat assets.json | python -m json.tool | less

# Count assets
node -p "Object.keys(require('./assets.json')).length"

# Convert data
npm run convert

# Start local server
npm run serve

# Push updates
git add .
git commit -m "Update"
git push
```

Happy asset tracking! 📦✨
