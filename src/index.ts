import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError, useKoaServer } from "routing-controllers"
import setupDb from './db'
import UserController from './users/controller'
import ProductController from './products/controller'
import LoginController from './logins/controller'
import { Server } from 'http'
import * as Koa from 'koa'
import { verify } from './jwt'
import {Users} from './users/entity'

const app = new Koa()
const server = new Server(app.callback())
const port = process.env.PORT || 4009

useKoaServer(app, {
    cors: true,
    controllers: [
        UserController,
        ProductController,
        LoginController,
    ],
    authorizationChecker: (action: Action) => {
        const header: string = action.request.headers.authorization
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ')

            try {
                return !!(token && verify(token))
            }
            catch (e) {
                throw new BadRequestError(e)
            }
        }

        return false
    },
    currentUserChecker: async (action: Action) => {
        const header: string = action.request.headers.authorization
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ')

            if (token) {
                const { id,role } = verify(token)
                return { id, role };
                //A return User.findOneById(id)
            }
        }
        return undefined
    }
})




setupDb()
    .then(_ => {
        server.listen(port)
        console.log(`Listening on port ${port}`)
    })
    .catch(err => console.error(err))

