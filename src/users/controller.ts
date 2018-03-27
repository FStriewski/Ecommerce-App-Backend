import { JsonController, Get } from "routing-controllers";
import User from './entity'


@JsonController()
export default class UserController{

    @Get('/users')
        getAllUsers(){
            return User.find()
        }


}
