import { JsonController, Get, NotFoundError, Param } from "routing-controllers";
import {Product} from './entity'


@JsonController()
export default class ProductController {

    @Get('/products')
        async getAllProducts(){
            const products =  await Product.find()
            return products
        }
    @Get('/products/:id([0-9]+)')
        async getSingleProduct(@Param("id") id: number){
            const product = await Product.findOneById(id)
            if(!product) throw new NotFoundError("No product found")
            return product
        }
}