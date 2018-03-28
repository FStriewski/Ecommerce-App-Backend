import { JsonController, Get, NotFoundError, Param, Post, Body, Put, Delete } from "routing-controllers";
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

        // Needs user connection
    @Post('/products')
        async createProduct(
            @Body() body: Product
        ){
                const product = await Product.create(body).save()
                return product
        }


    @Put('/products/:id([0-9]+)')
        async updateProduct(
            @Param("id") id:number,
            @Body() update: Product
        ){
            const product = await Product.findOneById(id)
            if(!product) throw new NotFoundError("Product not found")

            return Product.merge(product, update).save()    
        }

    @Delete('/products/:id([0-9]+)')
         deleteProduct(
            @Param("id") id: number
        ){
            try{
                console.log("Deleting...")
                return Product.removeById(id)
            }
            catch(e){return e.message}
        }
}