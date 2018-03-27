import { PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { IsString, IsEmail } from "class-validator";
import {Products} from '../products/entity'


export class Users extends BaseEntity {


    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text')
    username: string
    
    @IsEmail()
    @Column('text', {nullable: true})
    email: string

    @Column('text')
    password: string  

    @OneToMany(_ => Products, product => product.user )
    products: Products[]

}