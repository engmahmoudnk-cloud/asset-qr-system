// Data Converter Script
// Converts original JSON format to optimized asset lookup format

const fs = require('fs');

function convertAssets(inputFile, outputFile) {
    try {
        // Read the original JSON file
        const rawData = fs.readFileSync(inputFile, 'utf8');
        const originalData = JSON.parse(rawData);
        
        // Check if data has Sheet1 wrapper
        const assets = originalData.Sheet1 || originalData;
        
        if (!Array.isArray(assets)) {
            throw new Error('Expected an array of assets');
        }

        // Convert to optimized format
        const optimizedAssets = {};
        
        assets.forEach((asset, index) => {
            // Use the full unique asset tag as the key (or generate one if missing)
            const key = asset['FULL UNIQUE ASSET TAG'] || `ASSET-${index}`;
            
            optimizedAssets[key] = {
                fullUniqueAssetTag: asset['FULL UNIQUE ASSET TAG'] || null,
                tagType: asset['Tag Type'] || null,
                quantity: asset['Qty.'] || 0,
                portfolioName: asset['Portfolio Name'] || null,
                districtName: asset['District Name'] || null,
                buildingName: asset['Building Name'] || null,
                buildingArea: asset['Building Area'] || null,
                floorName: asset['Floor Name'] || null,
                assetTypeName: asset['Asset Type Name'] || null,
                description: asset['Description'] || null,
                countryOfOrigin: asset['Country of Origin'] || null,
                systemName: (asset['System Name '] || asset['System Name'] || '').trim() || null
            };
        });

        // Write the optimized JSON
        fs.writeFileSync(
            outputFile, 
            JSON.stringify(optimizedAssets, null, 2),
            'utf8'
        );

        console.log('✅ Conversion complete!');
        console.log(`📊 Total assets: ${Object.keys(optimizedAssets).length}`);
        console.log(`💾 Output file: ${outputFile}`);
        
        // Calculate total quantity
        const totalQty = Object.values(optimizedAssets).reduce(
            (sum, asset) => sum + (asset.quantity || 0), 
            0
        );
        console.log(`📦 Total quantity: ${totalQty}`);

    } catch (error) {
        console.error('❌ Error converting assets:', error.message);
        process.exit(1);
    }
}

// Run the converter
if (require.main === module) {
    const inputFile = process.argv[2] || 'JSON-FILE.json';
    const outputFile = process.argv[3] || 'assets.json';
    
    console.log('🔄 Converting assets...');
    console.log(`📥 Input: ${inputFile}`);
    console.log(`📤 Output: ${outputFile}`);
    console.log('');
    
    convertAssets(inputFile, outputFile);
}

module.exports = { convertAssets };
