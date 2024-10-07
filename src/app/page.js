

export default function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Next.js Server Setup in AWS (with MySQL and phpMyAdmin)</h1>
      
      <h2>Step-by-Step Instructions:</h2>
      
      <h3>1. Update the System</h3>
      <pre><code>sudo apt update</code></pre>
      
      <h3>2. Install Required Dependencies</h3>
      <p>Install essential build tools:</p>
      <pre><code>sudo apt install build-essential</code></pre>
      <p>Install Nginx (for reverse proxy):</p>
      <pre><code>sudo apt install nginx</code></pre>

      <h3>3. Install Node.js</h3>
      <p>Install Node.js:</p>
      <pre><code>sudo apt install nodejs<br />sudo apt install npm</code></pre>

      <h3>4. Create Next.js Project</h3>
      <p>Navigate to the directory where you want to create the project:</p>
      <pre><code>cd /path/to/your/project-directory</code></pre>
      <p>Create a new Next.js app:</p>
      <pre><code>npx create-next-app@latest</code></pre>
      
      <h3>5. Install MySQL and phpMyAdmin</h3>
      <p>Install MySQL server:</p>
      <pre><code>sudo apt install mysql-server</code></pre>
      <p>Secure MySQL installation and set root password:</p>
      <pre><code>sudo mysql_secure_installation</code></pre>
      <p>Install phpMyAdmin:</p>
      <pre><code>sudo apt install phpmyadmin</code></pre>

      <h3>6. Configure Nginx</h3>
      <p>Create a new configuration file for your site:</p>
      <pre><code>sudo nano /etc/nginx/sites-available/skidz-next</code></pre>
      <p>Add the following configuration:</p>
      <pre>
        <code>{`
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection &#39;upgrade&#39;;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /phpmyadmin {
        root /usr/share;
        index index.php index.html index.htm;

        location ~ ^/phpmyadmin/(.*\\.php)\$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            include fastcgi_params;
        }

        location ~ /\\.ht {
            deny all;
        }
    }
}
        `}</code>
      </pre>
      <p>Enable the site:</p>
      <pre><code>sudo ln -s /etc/nginx/sites-available/skidz-next /etc/nginx/sites-enabled/</code></pre>

      <h3>7. Set Correct Permissions for phpMyAdmin</h3>
      <pre><code>sudo chown -R www-data:www-data /usr/share/phpmyadmin</code></pre>

      <h3>8. Build and Deploy the Next.js App</h3>
      <pre><code>npm run build</code></pre>

      <h3>9. Manage Services</h3>
      <p>Stop Apache if it&apos;s running (it can conflict with Nginx):</p>
      <pre><code>sudo systemctl stop apache2</code></pre>
      <p>Restart Nginx:</p>
      <pre><code>sudo systemctl restart nginx</code></pre>

      <h3>10. Install pm2 and Start the Next.js Server</h3>
      <pre><code>sudo npm install pm2 -g</code></pre>
      <p>Start the Next.js server using pm2:</p>
      <pre><code>pm2 start npm --name &quot;next-server&quot; -- start</code></pre>

      <p><strong>These steps will ensure your Next.js app runs smoothly on an AWS instance with MySQL and phpMyAdmin, and Nginx acts as a reverse proxy.</strong></p>
    </div>
  );
};