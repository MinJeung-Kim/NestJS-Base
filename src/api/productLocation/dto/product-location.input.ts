import { InputType, OmitType } from '@nestjs/graphql';
import { ProductLocation } from '../entities/productLocation.entity';

// id 컬럼을 뺀 타입 생성
@InputType()
export class ProductLocationInput extends OmitType(
  ProductLocation,
  ['id'],
  InputType,
) {}
