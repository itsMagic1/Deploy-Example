import { Owner } from 'src/Owner/entities/Owner.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Owner, (owner) => owner.agency)
  owners: Owner[];
}
