import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/api/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  @Field(() => [Product])
  products: Product[];
}
