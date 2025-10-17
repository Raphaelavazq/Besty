/**
 * PM2 Ecosystem Configuration for B1 Bestie
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 logs
 *   pm2 monit
 *   pm2 stop all
 *   pm2 restart all
 */

module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "./backend",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        PORT: 3001,
        NODE_ENV: "development",
      },
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
    {
      name: "frontend",
      script: "npm",
      args: "run dev",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        PORT: 3003,
        NODE_ENV: "development",
      },
      error_file: "./logs/vite-error.log",
      out_file: "./logs/vite-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
