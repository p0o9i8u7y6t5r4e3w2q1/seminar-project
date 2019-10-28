import {
  AfterLoad,
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Transform, Expose } from 'class-transformer';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @PrimaryColumn('varchar', {
    length: 9,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'password',
  })
  @Exclude()
  password: string;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 64,
    name: 'email',
  })
  @Expose({ groups: [] })
  email: string;

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  @Exclude()
  role: Role;

  @Column('tinyint', { name: 'role_id' })
  roleID: number;

  @Expose()
  get authIDs(): number[] {
    return this.role && this.role.auths ? this.role.authIDs : undefined;
  }

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  public checkPassword(password: string) {
    return this.password === password;
  }
}
