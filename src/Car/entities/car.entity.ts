import { Owner } from 'src/Owner/entities/Owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column()
  color: string;

  @ManyToOne(() => Owner, (owner) => owner.cars)
  owner: Owner;
}
