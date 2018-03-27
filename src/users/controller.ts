import { JsonController, Get, Param, NotFoundError, Body, Post } from "routing-controllers";
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
                const newUser = await User.create(body).save()
                return newUser
            }
            catch(error){
                return{error: error.message}
            }
        }
}
