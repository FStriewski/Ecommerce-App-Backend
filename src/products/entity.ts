import { BaseEntity, ManyToOne, OneToMany, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNumber } from "class-validator";
import { Users }  from '../users/entity'

@Entity()
export class Products extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text')
    title: string

    @IsString()
    @Column('text')
    author: string

    @IsString()
    @Column('text')
    year: string

    @IsNumber()
    @Column('integer', {nullable: false})
    price: number

    @IsString()
    @Column('text', { nullable: true })
    description: string

    @Column('text', { nullable: true })
    imageurl: string

    @ManyToOne(_ => Users, user => user.products, { eager: true })
    user: Users
}