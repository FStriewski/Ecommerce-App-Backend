import { PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Entity } from "typeorm";
import { MinLength, IsString, IsEmail } from 'class-validator';
import {Product} from '../products/entity'
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt'


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

    @IsString()
    @MinLength(6)
    @Column('text')
    @Exclude({ toPlainOnly: true })
    password: string


    // class Methods to set/mask a password
    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10)
        this.password = hash
    }

    checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password)
    }

    @OneToMany(_ => Product, product => product.user )
    products: Product[]

}