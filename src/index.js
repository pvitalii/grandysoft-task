const express = require('express');
const path = require('path')
require('dotenv').config({
    path: path.resolve('./', `${process.env.NODE_ENV}.env`)
});
const sequelize = require('./database/db');
const router = require('./router');

class Server {
    app = express();
    port = process.env.PORT;

    start() {
        this.initRoutes();
        this.initErrorHandling();
        this.startListening();
    }

    initRoutes() {
        this.app.use('', router);
    }

    initErrorHandling() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            res.status(statusCode).json({ ErrorMessage: err.message });
        });
    }

    async startListening() {
        try {
            await sequelize.sync();
            await sequelize.authenticate();
            this.app.listen(this.port, () => console.log(`Server started on port ${this.port}`));
        } catch (e) {
            console.log(e);
        }
    }
}

new Server().start();
