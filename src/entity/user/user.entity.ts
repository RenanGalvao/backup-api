import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
    })
    firstName: string;

    @Column({
        length: 30,
    })
    lastName: string;

    @Column()
    age: number;

    @Column({
        length: 100,
    })
    email: string;

    @Column()
    hashedPassword: string;
}