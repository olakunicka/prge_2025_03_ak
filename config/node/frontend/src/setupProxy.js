const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/geoserver',
        createProxyMiddleware({
            target: 'http://geoserver:8080',
            changeOrigin: true
        })
    );
};