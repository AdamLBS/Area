/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { createServer } from "https";

import { Ignitor } from '@adonisjs/core/build/standalone'

sourceMapSupport.install({ handleUncaughtExceptions: false })

if (process.env.SSL_KEY !== undefined && process.env.SSL_KEY !== "") {
    new Ignitor(__dirname).httpServer().start((handle) => {
        return createServer({
            key: process.env.SSL_KEY,
            cert: process.env.SSL_CERT
        }, handle)
    });
} else {
    new Ignitor(__dirname).httpServer().start();
}