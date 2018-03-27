import { JsonController, Get, NotFoundError } from "routing-controllers";
import {Product} from './entity'


@JsonController()
export default class ProductController {

    @Get('/products')
        async getAllProducts(){
            const products =  await Product.find()
            return products
        }

}