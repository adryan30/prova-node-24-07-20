import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User as IUser } from '../../interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Column()
  name: string;

  @IsNotEmpty({ message: 'Username não pode ser vazio' })
  @Column()
  username: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail(null, { message: 'Email deve ser válido' })
  @Column()
  email: string;
}
