import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"string", unique: true})
    name!: string;

    @Column({type:"string", nullable: true})
    description!: string | null;

    @Column({type: "decimal"})
    price!: number;
}