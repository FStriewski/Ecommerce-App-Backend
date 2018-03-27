import { PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Entity } from "typeorm";
import { IsString, IsEmail } from "class-validator";
import {Product} from '../products/entity'


@Entity()
export class User extends BaseEntity {

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

    @OneToMany(_ => Product, product => product.user )
    products: Product[]

}