import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/api/categories/entities/category.entity';
import { ProductLocation } from 'src/api/productLocation/entities/productLocation.entity';
import { Tag } from 'src/api/tags/entities/tag.entity';
import { User } from 'src/api/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @OneToOne(() => ProductLocation)
  @Field(() => ProductLocation)
  productLocation: ProductLocation;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;

  @ManyToOne(() => User) // user 한명이 여러개의 상품을 등록할 수 있다.
  @Field(() => User)
  user: User;

  @JoinTable() // tag와 product의 중간 테이블 생성
  @ManyToMany(() => Tag, { eager: true })
  @Field(() => [Tag])
  tags: Tag[];

  @CreateDateColumn() // 데이터 등록 시간 자동 추가
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() // 소프트 삭제 시간 기록을 위함
  deletedAt: Date;
}
