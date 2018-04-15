import { PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Entity } from "typeorm";
import { MinLength, IsString, IsEmail } from 'class-validator';
import {Products} from '../products/entity'
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt'

export type Role = 'customer' | 'admin'

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text')
    username: string
    
    @IsEmail()
    @Column('text', {nullable: true})
    email: string
    
    @Column('text', { default: 'admin' })
    role: Role
    
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

    @OneToMany(_ => Products, product => product.user )
    products: Products[]

}