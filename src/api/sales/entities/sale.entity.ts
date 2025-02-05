import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // 9자리 중에 소수점 6자리
  @Field(() => Float)
  lat: number; // 위도

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => Float)
  lng: number; // 경도

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
