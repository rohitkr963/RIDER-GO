const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

console.log("Trying to start server on port", PORT); // ✅ Add this log

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
