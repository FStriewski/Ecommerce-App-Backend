import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError, useKoaServer } from "routing-controllers"
import setupDb from './db'
import UserController from './users/controller'
import ProductController from './products/controller'
import * as Koa from 'koa'

const port = process.env.PORT || 4008

const app = createKoaServer({
    controllers: [
        UserController,
        ProductController

    ]
})

setupDb()
    .then(_ => {
        app.listen(port, () => console.log(`Listening on port ${port}`))
    })
    .catch(err => console.error(err))


