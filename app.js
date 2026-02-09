// Asset Management Application

class AssetManager {
    constructor() {
        this.assets = {};
        this.html5QrCode = null;
        this.isScanning = false;
        this.init();
    }

    async init() {
        await this.loadAssets();
        this.setupEventListeners();
        this.updateStatistics();
    }

    async loadAssets() {
        try {
            const response = await fetch('assets.json');
            if (!response.ok) {
                throw new Error('Failed to load assets');
            }
            this.assets = await response.json();
            console.log('Assets loaded:', Object.keys(this.assets).length);
        } catch (error) {
            console.error('Error loading assets:', error);
            this.showError('Failed to load asset database. Please refresh the page.');
        }
    }

    setupEventListeners() {
        // Search button
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchAsset();
        });

        // Enter key on search input
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchAsset();
            }
        });

        // Scan button
        document.getElementById('scanBtn').addEventListener('click', () => {
            this.startScanning();
        });

        // Stop scan button
        document.getElementById('stopScanBtn').addEventListener('click', () => {
            this.stopScanning();
        });

        // Close details button
        document.getElementById('closeDetails').addEventListener('click', () => {
            this.hideAssetDetails();
        });
    }

    searchAsset() {
        const searchTerm = document.getElementById('searchInput').value.trim();
        
        if (!searchTerm) {
            this.showError('Please enter an asset tag or QR code');
            return;
        }

        this.hideError();
        this.showLoading();

        // Simulate slight delay for better UX
        setTimeout(() => {
            const asset = this.findAsset(searchTerm);
            this.hideLoading();

            if (asset) {
                this.displayAssetDetails(asset);
            } else {
                this.showError(`Asset not found: "${searchTerm}"`);
            }
        }, 300);
    }

    findAsset(searchTerm) {
        const upperSearchTerm = searchTerm.toUpperCase();
        
        // First, try exact match as key
        if (this.assets[searchTerm]) {
            return this.assets[searchTerm];
        }

        // Try case-insensitive match as key
        const exactKey = Object.keys(this.assets).find(
            key => key.toUpperCase() === upperSearchTerm
        );
        if (exactKey) {
            return this.assets[exactKey];
        }

        // Search in asset tag values
        const foundKey = Object.keys(this.assets).find(key => {
            const asset = this.assets[key];
            return asset.fullUniqueAssetTag && 
                   asset.fullUniqueAssetTag.toUpperCase() === upperSearchTerm;
        });

        if (foundKey) {
            return this.assets[foundKey];
        }

        // Partial match search (contains)
        const partialKey = Object.keys(this.assets).find(key => {
            const asset = this.assets[key];
            return (key.toUpperCase().includes(upperSearchTerm)) ||
                   (asset.fullUniqueAssetTag && 
                    asset.fullUniqueAssetTag.toUpperCase().includes(upperSearchTerm));
        });

        return partialKey ? this.assets[partialKey] : null;
    }

    async startScanning() {
        this.hideError();
        
        try {
            const qrReader = document.getElementById('qr-reader');
            qrReader.style.display = 'block';
            document.getElementById('scannerControls').style.display = 'block';
            document.getElementById('scanBtn').style.display = 'none';

            this.html5QrCode = new Html5Qrcode("qr-reader");
            
            const config = { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            };

            await this.html5QrCode.start(
                { facingMode: "environment" },
                config,
                (decodedText, decodedResult) => {
                    this.onScanSuccess(decodedText);
                },
                (errorMessage) => {
                    // Ignore scanning errors - they happen frequently
                }
            );

            this.isScanning = true;
        } catch (err) {
            console.error('Error starting scanner:', err);
            this.showError('Unable to access camera. Please check permissions.');
            this.resetScanner();
        }
    }

    async stopScanning() {
        if (this.html5QrCode && this.isScanning) {
            try {
                await this.html5QrCode.stop();
                this.html5QrCode.clear();
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
        }
        this.resetScanner();
    }

    resetScanner() {
        document.getElementById('qr-reader').style.display = 'none';
        document.getElementById('scannerControls').style.display = 'none';
        document.getElementById('scanBtn').style.display = 'block';
        this.isScanning = false;
        this.html5QrCode = null;
    }

    onScanSuccess(decodedText) {
        console.log('QR Code scanned:', decodedText);
        
        // Stop scanning
        this.stopScanning();
        
        // Show loading
        this.showLoading();
        this.hideError();

        // Search for the asset
        setTimeout(() => {
            const asset = this.findAsset(decodedText);
            this.hideLoading();

            if (asset) {
                this.displayAssetDetails(asset);
                // Auto-fill search box
                document.getElementById('searchInput').value = decodedText;
            } else {
                this.showError(`Asset not found for QR code: "${decodedText}"`);
            }
        }, 300);
    }

    displayAssetDetails(asset) {
        // Populate fields
        document.getElementById('assetTag').textContent = 
            asset.fullUniqueAssetTag || 'N/A';
        document.getElementById('tagType').textContent = 
            asset.tagType || 'N/A';
        document.getElementById('quantity').textContent = 
            asset.quantity !== null && asset.quantity !== undefined ? asset.quantity : 'N/A';
        document.getElementById('portfolio').textContent = 
            asset.portfolioName || 'N/A';
        document.getElementById('district').textContent = 
            asset.districtName || 'N/A';
        document.getElementById('building').textContent = 
            asset.buildingName || 'N/A';
        document.getElementById('buildingArea').textContent = 
            asset.buildingArea || 'N/A';
        document.getElementById('floor').textContent = 
            asset.floorName || 'N/A';
        document.getElementById('assetType').textContent = 
            asset.assetTypeName || 'N/A';
        document.getElementById('description').textContent = 
            asset.description || 'N/A';
        document.getElementById('country').textContent = 
            asset.countryOfOrigin || 'N/A';
        document.getElementById('system').textContent = 
            asset.systemName || 'N/A';

        // Show the details section
        document.getElementById('assetDetails').style.display = 'block';
        
        // Scroll to details
        document.getElementById('assetDetails').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    hideAssetDetails() {
        document.getElementById('assetDetails').style.display = 'none';
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    showError(message) {
        const errorEl = document.getElementById('errorMessage');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        document.getElementById('errorMessage').style.display = 'none';
    }

    updateStatistics() {
        const totalAssets = Object.keys(this.assets).length;
        let totalQuantity = 0;

        Object.values(this.assets).forEach(asset => {
            const qty = asset.quantity || 0;
            totalQuantity += qty;
        });

        document.getElementById('totalAssets').textContent = totalAssets.toLocaleString();
        document.getElementById('totalQuantity').textContent = totalQuantity.toLocaleString();
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AssetManager();
});
