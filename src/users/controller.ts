import { JsonController, Get, Param, NotFoundError, Body, Post, Put, Delete } from "routing-controllers";
import {User} from './entity'


@JsonController()
export default class UserController{

    @Get('/users')
        getAllUsers(){
            return User.find()
        }
    @Get('/users/:id([0-9]+)')
        async getUser(
            @Param("id") id: number
        ){
            const user = await User.findOneById(id)
            if(!user) throw new NotFoundError ('No user found')
            return user
        }

    @Post('/users')
        async createUser(
            @Body() body: User
        ){
            try {
                const { password, ...rest } = body
                const entity = User.create(rest)
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
            @Body() update: User
        ){
            const user = await User.findOneById(id)
            if(!user) throw new NotFoundError("User not found")

            return User.merge(user,update).save()
        }

    @Delete('/users/:id([0-9]+)')
         deleteUser(
            @Param("id") id: number
        ) {
            return User.removeById(id)
        }
   
}
