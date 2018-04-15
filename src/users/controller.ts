import { JsonController, Get, Param, NotFoundError, Body, Post, Put, Delete } from "routing-controllers";
import {Users} from './entity'


@JsonController()
export default class UserController{

    @Get('/users')
        getAllUsers(){
            return Users.find()
        }
    @Get('/users/:id([0-9]+)')
        async getUser(
            @Param("id") id: number
        ){
            const user = await Users.findOneById(id)
            if(!user) throw new NotFoundError ('No user found')
            return user
        }

    @Post('/users')
        async createUser(
            @Body() body: Users
        ){
            try {
                const { password, ...rest } = body
                const entity = Users.create(rest)
                await entity.setPassword(password)
                return entity.save()
            }
            catch(error){
                return{error: error.message}
            }
        }

    @Put('/users/:id([0-9]+)')
        async updateUser(
            @Param("id") id:number,
            @Body() update: Users
        ){
            const user = await Users.findOneById(id)
            if(!user) throw new NotFoundError("User not found")

            return Users.merge(user,update).save()
        }

    @Delete('/users/:id([0-9]+)')
         deleteUser(
            @Param("id") id: number
        ) {
            return Users.removeById(id)
        }
   
}
