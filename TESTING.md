# Testing Guide

This document provides comprehensive testing procedures for the Asset QR System.

## Pre-Deployment Testing

### 1. Local Development Testing

#### Setup Local Server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Access at: `http://localhost:8000`

### 2. Data Validation

#### Check assets.json:
```bash
# Validate JSON syntax
cat assets.json | python -m json.tool > /dev/null && echo "Valid JSON" || echo "Invalid JSON"

# Count assets
node -p "Object.keys(require('./assets.json')).length"
```

#### Verify data structure:
- All required fields present
- Asset tags are unique
- No null/undefined in critical fields
- Quantities are numbers

### 3. Functionality Testing

#### Test Search:
1. Open application
2. Enter valid asset tag in search
3. Verify correct asset displays
4. Test partial search
5. Test invalid asset tag (should show error)

#### Test QR Scanner:
1. Click "Scan QR Code"
2. Allow camera permissions
3. Scan a test QR code
4. Verify asset details display
5. Test "Stop Scanning" button

#### Test UI:
- All buttons clickable
- Forms responsive
- No console errors
- Smooth animations
- Proper error messages

## Browser Compatibility Testing

### Desktop Browsers

#### Chrome:
- Version: Latest
- Test camera access
- Test search functionality
- Check responsive design
- Verify no console errors

#### Firefox:
- Version: Latest
- Test QR scanning
- Check layout
- Test file loading

#### Safari:
- Version: Latest (macOS/iOS)
- Test camera permissions
- Verify QR scanning
- Check styling

#### Edge:
- Version: Latest
- Full functionality test
- Performance check

### Mobile Browsers

#### iOS Safari:
- Camera access
- QR scanning
- Touch interactions
- Responsive layout

#### Chrome Mobile (Android):
- Camera permissions
- Scanning performance
- UI responsiveness

#### Samsung Internet:
- Basic functionality
- Camera support

## Performance Testing

### Load Time:
```javascript
// Open browser console and run:
performance.timing.loadEventEnd - performance.timing.navigationStart
```
Target: < 3 seconds

### Asset Search Speed:
- Single asset lookup: < 100ms
- Large dataset (3000+ assets): < 200ms

### QR Scanning:
- Scan-to-result time: < 2 seconds
- Camera initialization: < 3 seconds

## Security Testing

### HTTPS Verification:
1. Deploy to production
2. Verify HTTPS enabled
3. Check SSL certificate validity
4. Test camera access (requires HTTPS)

### Input Validation:
- Test XSS prevention in search
- Verify no code injection possible
- Check for SQL injection (if backend added)

### Privacy:
- No data sent to external servers
- Camera only used for scanning
- No tracking scripts

## Accessibility Testing

### Screen Reader:
- Test with NVDA (Windows)
- Test with VoiceOver (macOS/iOS)
- Verify ARIA labels

### Keyboard Navigation:
- Tab through all elements
- Enter key submits search
- Escape closes modals
- Focus indicators visible

### Color Contrast:
- Use browser accessibility tools
- Verify WCAG AA compliance
- Test with color blindness simulator

## Responsive Design Testing

### Breakpoints:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

### Test Viewports:
```
iPhone SE: 375x667
iPhone 12: 390x844
iPad: 768x1024
Desktop: 1920x1080
```

### Orientation:
- Portrait mode
- Landscape mode

## QR Code Testing

### Generate Test QR Codes:
Use `qr-generator.html` to create test codes

### Test Scenarios:
1. **Valid asset tag**: Should display details
2. **Invalid tag**: Should show error
3. **Malformed QR**: Should handle gracefully
4. **Different QR sizes**: All should scan
5. **Poor lighting**: Test scanning difficulty
6. **Angle scanning**: Test from different angles

### Print Testing:
- Print QR codes at different sizes
- Test scanning printed codes
- Verify print quality

## Data Integrity Testing

### Asset Data:
```javascript
// Console test to find issues
const assets = await fetch('assets.json').then(r => r.json());

// Find null values
Object.entries(assets).filter(([k,v]) => 
  Object.values(v).some(val => val === null)
).slice(0, 5);

// Check quantities
Object.entries(assets).filter(([k,v]) => 
  typeof v.quantity !== 'number'
);

// Find duplicates
const tags = Object.values(assets).map(a => a.fullUniqueAssetTag);
const duplicates = tags.filter((t, i) => tags.indexOf(t) !== i);
```

## Error Handling Testing

### Network Errors:
1. Disable network
2. Try loading page
3. Verify error message

### Camera Errors:
1. Deny camera permission
2. Verify error message
3. Test with no camera device

### Invalid Data:
1. Corrupt `assets.json`
2. Test with empty file
3. Test with invalid JSON

## Load Testing

### Large Dataset:
- Test with 10,000+ assets
- Measure search performance
- Check memory usage

### Concurrent Users:
- Simulate multiple users
- Check server capacity
- Monitor response times

## Pre-Release Checklist

- [ ] All tests pass on all browsers
- [ ] Mobile testing complete
- [ ] QR scanning works reliably
- [ ] No console errors
- [ ] HTTPS enabled
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Backup created

## Post-Deployment Testing

### Production Verification:
1. Visit production URL
2. Test core functionality
3. Check HTTPS certificate
4. Verify camera permissions
5. Test on mobile device
6. Check analytics (if implemented)

### Monitoring:
- Check error logs
- Monitor user feedback
- Track performance metrics
- Review browser compatibility reports

## Automated Testing (Future)

### Unit Tests:
```javascript
// Example test structure
describe('Asset Search', () => {
  it('should find asset by tag', () => {
    // Test implementation
  });
  
  it('should handle invalid search', () => {
    // Test implementation
  });
});
```

### E2E Tests:
- Use Playwright or Cypress
- Automate user flows
- Test critical paths

## Bug Reporting Template

When reporting bugs, include:
```
**Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop
- URL: https://...

**Screenshots:**
[Attach if applicable]

**Console Errors:**
[Paste any errors from console]
```

## Performance Benchmarks

Target metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Asset search: < 200ms
- QR scan time: < 2s
- Camera init: < 3s

## Continuous Testing

- Test after every deployment
- Weekly full regression test
- Monthly security audit
- Quarterly accessibility review
