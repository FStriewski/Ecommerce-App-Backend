import { JsonController, Get } from "routing-controllers";
import {Products} from './entity'


@JsonController()
export default class ProductController {

    @Get('/products')
        getAllProducts(){
            return Products.find()
        }

}