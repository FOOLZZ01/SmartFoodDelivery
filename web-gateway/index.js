const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy za User Service
app.use('/auth', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/auth': '/api/auth' },
}));

// Proxy za Restaurant Service
app.use('/restaurants', createProxyMiddleware({
  target: process.env.RESTAURANT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/restaurants': '/api/restaurants' },
}));

// Proxy za Order Service
app.use('/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/orders': '/api/orders' },
}));

app.listen(PORT, () => {
  console.log(`🌐 Web Gateway listening on port ${PORT}`);
});
