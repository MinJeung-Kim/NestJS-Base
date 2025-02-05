import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/api/categories/entities/category.entity';
import { Sale } from 'src/api/sales/entities/sale.entity';
import { Tag } from 'src/api/tags/entities/tag.entity';
import { User } from 'src/api/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldOut: boolean;

  // fk keys
  @JoinColumn()
  @OneToOne(() => Sale)
  @Field(() => Sale)
  saleId: Sale;

  @ManyToOne(() => Category)
  @Field(() => Category)
  categoryId: Category;

  @ManyToOne(() => User) // user 한명이 여러개의 상품을 등록할 수 있다.
  @Field(() => User)
  userId: User;

  @JoinTable() // tag와 product의 중간 테이블 생성
  @ManyToMany(() => Tag, (tag) => tag.products)
  @Field(() => [Tag])
  tags: Tag[];
}
