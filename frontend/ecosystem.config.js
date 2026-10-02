module.exports = {
  apps: [
    {
      name: '10q-challenge-frontend',
      script: 'server.js',
      cwd: __dirname,
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
      }
    }
  ]
};
