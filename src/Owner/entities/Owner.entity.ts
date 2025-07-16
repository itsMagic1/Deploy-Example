import { Agency } from 'src/Agency/entities/agency.entity';
import { Car } from 'src/Car/entities/car.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];

  @ManyToOne(() => Agency, (agency) => agency.owners)
  agency: Agency;
}
