import React from 'react';
import styles from './Documentation.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Next.js Server Setup in AWS</h1>
      <p className={styles.description}>
        Follow these steps to set up your Next.js server on AWS:
      </p>

      <div className={styles.stepSection}>
        <h2>1. Update the System</h2>
        <pre className={styles.codeBlock}>
          <code>sudo apt update</code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>2. Install Required Dependencies</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`sudo apt install build-essential
sudo apt install nginx`}
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>3. Install Node.js</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`sudo apt install nodejs
sudo apt install npm`}
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>4. Create Next.js Project</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`cd /path/to/your/project-directory
npx create-next-app@latest`}
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>5. Install MySQL and phpMyAdmin</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`sudo apt install mysql-server
sudo mysql_secure_installation  // Set root password as root
sudo apt install phpmyadmin`}
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>6. Configure Nginx</h2>
        <p>Create a new configuration file for your site:</p>
        <pre className={styles.codeBlock}>
          <code>sudo nano /etc/nginx/sites-available/skidz-next</code>
        </pre>

        <p>Add the following configuration to handle Next.js and phpMyAdmin:</p>
        <pre className={styles.codeBlock}>
          <code>
            {`server {
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
}`}
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
          <code>
            {`cd /path/to/your/project-directory
npm run build`}
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>9. Manage Services</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`sudo systemctl stop apache2  // If Apache is running
sudo systemctl restart nginx`}
          </code>
        </pre>
      </div>

      <div className={styles.stepSection}>
        <h2>10. Install pm2 and Start the Next.js Server</h2>
        <pre className={styles.codeBlock}>
          <code>
            {`sudo npm install pm2 -g
pm2 start npm --name "next-server" -- start`}
          </code>
        </pre>
      </div>
    </div>
  );
};
