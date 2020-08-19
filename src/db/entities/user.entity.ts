import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User as IUser } from '../../interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
}
