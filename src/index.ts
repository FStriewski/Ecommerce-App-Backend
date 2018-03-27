import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError, useKoaServer } from "routing-controllers"
import setupDb from './db'
import UserController from './users/controller'
import ProductController from './products/controller'
import { Server } from 'http'
import * as Koa from 'koa'

const app = new Koa()
const server = new Server(app.callback())
const port = process.env.PORT || 4008

useKoaServer(app, {
    cors: true,
    controllers: [
        UserController,
        ProductController,
    ]
})

setupDb()
    .then(_ => {
        server.listen(port)
        console.log(`Listening on port ${port}`)
    })
    .catch(err => console.error(err))

