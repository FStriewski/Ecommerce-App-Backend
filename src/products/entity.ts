import { BaseEntity, ManyToOne, OneToMany, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import {User} from '../users/entity'

export default class Products extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text')
    name: string

    @IsNumber()
    @Column('integer', {nullable: false})
    price: number

    @IsString()
    @Column('text', { nullable: true })
    description: string

    @Column('text', { nullable: true })
    imageurl: string

    @ManyToOne(_ => User, user => user.products)
    user: User
}