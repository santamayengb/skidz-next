import React from "react";
import styles from "./Documentation.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Next.js Server Setup in AWS</h1>
      <p className={styles.description}>
        Follow these detailed step-by-step instructions for setting up a Next.js
        server on AWS with MySQL and phpMyAdmin.
      </p>

      <div className={styles.stepSection}>
        <h2>1. Update the System</h2>
        <pre className={styles.codeBlock}>
          <code>sudo apt update</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>2. Install Required Dependencies</h2>
        <p>Install essential build tools:</p>
        <pre className={styles.codeBlock}>
          <code>sudo apt install build-essential</code>
        </pre>
        <p>Install Nginx (for reverse proxy):</p>
        <pre className={styles.codeBlock}>
          <code>sudo apt install nginx</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>3. Install Node.js</h2>
        <pre className={styles.codeBlock}>
          <code>sudo apt install nodejs</code>
          <br />
          <code>sudo apt install npm</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>4. Create Next.js Project</h2>
        <p>Navigate to the directory where you want to create the project:</p>
        <pre className={styles.codeBlock}>
          <code>cd /path/to/your/project-directory</code>
        </pre>
        <p>Create a new Next.js app:</p>
        <pre className={styles.codeBlock}>
          <code>npx create-next-app@latest</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>5. Install MySQL and phpMyAdmin</h2>
        <p>Install MySQL server:</p>
        <pre className={styles.codeBlock}>
          <code>sudo apt install mysql-server</code>
        </pre>
        <p>Secure MySQL installation and set root password:</p>
        <pre className={styles.codeBlock}>
          <code>sudo mysql_secure_installation</code>
        </pre>
        <p>
          Set MySQL root password to <strong>root</strong>.
        </p>
        <p>Install phpMyAdmin:</p>
        <pre className={styles.codeBlock}>
          <code>sudo apt install phpmyadmin</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>6. Configure Nginx</h2>
        <p>Create a new configuration file for your site:</p>
        <pre className={styles.codeBlock}>
          <code>sudo nano /etc/nginx/sites-available/skidz-next</code>
        </pre>
        <p>Add the following configuration:</p>
        <pre className={styles.codeBlock}>
          <code>{`server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /phpmyadmin {
        root /usr/share;
        index index.php index.html index.htm;

        location ~ ^/phpmyadmin/(.*\\.php)$ {
            fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        }

        location ~ /phpmyadmin/(.*) {
            try_files $uri $uri/ /phpmyadmin/index.php?$args;
        }
    }
}`}</code>
        </pre>
        <p>Enable the site:</p>
        <pre className={styles.codeBlock}>
          <code>
            sudo ln -s /etc/nginx/sites-available/skidz-next
            /etc/nginx/sites-enabled/
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>7. Set Correct Permissions for phpMyAdmin</h2>
        <pre className={styles.codeBlock}>
          <code>sudo chown -R www-data:www-data /usr/share/phpmyadmin</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>8. Build and Deploy the Next.js App</h2>
        <pre className={styles.codeBlock}>
          <code>npm run build</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>9. Manage Services</h2>
        <p>Stop Apache if it's running:</p>
        <pre className={styles.codeBlock}>
          <code>sudo systemctl stop apache2</code>
        </pre>
        <p>Restart Nginx:</p>
        <pre className={styles.codeBlock}>
          <code>sudo systemctl restart nginx</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>10. Install pm2 and Start the Next.js Server</h2>
        <pre className={styles.codeBlock}>
          <code>sudo npm install pm2 -g</code>
          <br />
          <code>pm2 start npm --name "next-server" -- start</code>
        </pre>
      </div>
    </div>
  );
}
