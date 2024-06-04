/**
 * An Express server for the settlements API
 */

const express = require('express');
const http = require('http');
const cors = require('cors');
const settlementsRouter = require('./api');
const delayMiddleware = require('./api/delay.js');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(delayMiddleware);
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  })
);

app.use('/settlements', settlementsRouter);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
