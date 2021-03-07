import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

// Tem que ter o mesmo nome dado nas migrations/table
@Entity('adresses')
class Address {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;


  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
export { Address };

