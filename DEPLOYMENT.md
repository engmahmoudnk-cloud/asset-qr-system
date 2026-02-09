# Deployment Guide

This guide covers different ways to deploy your Asset QR System.

## GitHub Pages (Recommended for Quick Deployment)

GitHub Pages provides free HTTPS hosting, which is required for camera access.

### Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/asset-qr-system.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings"
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"

3. **Access your site:**
   - Your site will be available at: `https://yourusername.github.io/asset-qr-system`
   - Wait a few minutes for initial deployment

### Custom Domain (Optional):
- In GitHub Pages settings, add your custom domain
- Update your DNS records as instructed
- Enable "Enforce HTTPS"

## Netlify

Netlify offers easy deployment with automatic HTTPS.

### Steps:

1. **Sign up at [Netlify](https://www.netlify.com)**

2. **Deploy:**
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

3. **Your site is live!**
   - Netlify provides a random URL
   - You can customize it or add a custom domain

## Vercel

Similar to Netlify with excellent performance.

### Steps:

1. **Sign up at [Vercel](https://vercel.com)**

2. **Deploy:**
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Other
     - Root Directory: `./`
   - Click "Deploy"

3. **Access your deployment:**
   - Vercel provides a URL
   - Configure custom domain if needed

## Self-Hosted Server

For full control over hosting.

### Requirements:
- Web server (Apache, Nginx, or similar)
- HTTPS certificate (required for camera access)
- Domain name

### Using Apache:

1. **Upload files to server:**
   ```bash
   scp -r * user@yourserver.com:/var/www/html/asset-qr-system/
   ```

2. **Configure Apache virtual host:**
   ```apache
   <VirtualHost *:443>
       ServerName assets.yourdomain.com
       DocumentRoot /var/www/html/asset-qr-system
       
       SSLEngine on
       SSLCertificateFile /path/to/cert.pem
       SSLCertificateKeyFile /path/to/key.pem
       
       <Directory /var/www/html/asset-qr-system>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Restart Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

### Using Nginx:

1. **Configure Nginx:**
   ```nginx
   server {
       listen 443 ssl;
       server_name assets.yourdomain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       root /var/www/html/asset-qr-system;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

2. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

## Docker (Optional)

For containerized deployment.

### Create Dockerfile:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

### Build and run:

```bash
docker build -t asset-qr-system .
docker run -d -p 80:80 asset-qr-system
```

## Environment Considerations

### HTTPS Requirement:
- Camera access requires HTTPS
- Use `localhost` for local testing (HTTPS not required)
- Production must have valid SSL certificate

### Browser Permissions:
- Users must grant camera permissions
- First-time users will see a permission prompt
- Denied permissions require manual browser settings change

### Performance:
- The `assets.json` file is loaded once on page load
- Large datasets (5000+ assets) work fine
- Consider implementing search indexing for 10,000+ assets

## Updating Assets

To update asset data after deployment:

1. **Modify local data:**
   - Edit `JSON-FILE.json` or `assets.json` directly

2. **Convert if needed:**
   ```bash
   npm run convert
   ```

3. **Commit and push:**
   ```bash
   git add assets.json
   git commit -m "Update asset data"
   git push
   ```

4. **Deployment:**
   - GitHub Pages: Updates automatically
   - Netlify/Vercel: Redeploys automatically
   - Self-hosted: Re-upload the file

## Monitoring

- Check browser console for errors
- Monitor GitHub/Netlify/Vercel deployment logs
- Test QR scanning regularly
- Verify mobile compatibility

## Support

For deployment issues:
- Check server logs
- Verify HTTPS is working
- Test camera permissions
- Review browser compatibility
