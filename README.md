# Asset QR Code Management System

A web-based asset tracking system that allows users to scan QR codes and instantly retrieve detailed asset information.

## Features

- 📱 QR Code scanning using device camera
- 🔍 Fast asset lookup by QR code or asset tag
- 📊 Display comprehensive asset details
- 📱 Responsive mobile-first design
- 🎨 Modern, clean UI
- 💾 Offline-capable with local data storage

## Asset Information Displayed

- Full Unique Asset Tag
- Tag Type
- Quantity
- Portfolio Name
- District Name
- Building Name
- Building Area
- Floor Name
- Asset Type Name
- Description
- Country of Origin
- System Name

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) library for QR scanning
- JSON for data storage

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A device with a camera for QR code scanning
- HTTPS connection (required for camera access)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/asset-qr-system.git
cd asset-qr-system
```

2. Open `index.html` in your web browser, or serve it using a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

### For HTTPS (Required for Camera Access)

If testing locally, you can use:

```bash
npx http-server -S -C cert.pem -K key.pem
```

Or deploy to GitHub Pages (automatically HTTPS):
1. Go to repository Settings
2. Navigate to Pages
3. Select main branch
4. Save

Your app will be available at: `https://yourusername.github.io/asset-qr-system`

## Usage

### Scanning QR Codes

1. Click the "Scan QR Code" button
2. Allow camera permissions when prompted
3. Point your camera at the asset QR code
4. Asset information will automatically display

### Manual Search

1. Use the search bar to enter an asset tag
2. Click "Search" or press Enter
3. View the asset details

## Data Structure

Assets are stored in `assets.json` with the following structure:

```json
{
  "ASSET-TAG-QR-CODE": {
    "fullUniqueAssetTag": "WS-WSI-698-NGLA-AG-ZZZ-00000-LSSS-PLAT-PL0001",
    "tagType": null,
    "quantity": 16,
    "portfolioName": "Wadi Safar",
    "districtName": "WS Assets & Infrastructure",
    "buildingName": "NorthGate Landscape",
    "buildingArea": "Outside Building",
    "floorName": "Above Ground",
    "assetTypeName": "CEN SET-01",
    "description": "PLAT, CEN SET Located at Northgate Landscape, PL0001",
    "countryOfOrigin": "Saudi Arabia",
    "systemName": "Softscape"
  }
}
```

## Updating Asset Data

1. Edit `assets.json` with your asset data
2. Ensure each asset has a unique QR code identifier
3. Save and reload the application

## File Structure

```
asset-qr-system/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js             # Application logic
├── assets.json        # Asset database
├── data-converter.js  # Convert original JSON to optimized format
├── README.md          # This file
└── LICENSE            # MIT License
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: your-email@example.com

## Acknowledgments

- [html5-qrcode](https://github.com/mebjas/html5-qrcode) for QR code scanning functionality
- Asset data provided by Wadi Safar infrastructure team

## Roadmap

- [ ] Export asset data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Asset history tracking
- [ ] Multi-language support
- [ ] Offline mode with service workers
- [ ] Print asset labels
- [ ] Bulk QR code generation
