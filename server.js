const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
require('dotenv').config();

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = require('cors');
const bodyPaser = require('body-parser');

const mongoose = require('mongoose');
const mongodbUrl = process.env.MONGODB_URL;

const expressServer = express();
const httpServer = createServer(expressServer);

mongoose.connect(mongodbUrl)
  .then(() => {
    app.prepare()
      .then(() => {
        
        const ws = new Server(httpServer);

        const userRouter = require('./src/server/routers/userRouter');
        const recordRouter = require('./src/server/routers/recordRouter');

        expressServer.use(cors());
        expressServer.use(bodyPaser.urlencoded({ extended: false }));
        expressServer.use(bodyPaser.json());

        expressServer.use(userRouter);
        expressServer.use(recordRouter);

        ws.on('connection', socket => {
          socket.on('message', message => {
            ws.emit('receive', message);
          });

          socket.on('disconnect', () => {
            console.log('Web Socket Closed.');
          });
        });

        expressServer.all('*', (req, res, next) => {
          return handle(req, res);
        });

        httpServer.listen(8080, err => {
          if (err) throw err;
          console.log(">Ready on http://localhost:8080");
        })
      })
      .catch(e => {
        throw new Error(e.message);
      });
  })
  .catch(e => {
    throw new Error(e.message);
  })
