import { JsonController, Get } from "routing-controllers";
import {Users} from './entity'


@JsonController()
export default class UserController{

    @Get('/users')
        getAllUsers(){
            return Users.find()
        }


}
