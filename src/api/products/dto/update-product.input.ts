import { CreateProductInput } from './create-product.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // CreateProductInput 내용을 상속 받음음
}

// PickType(CreateProductInput, ['name', 'price']); // 뽑기
// OmitType(CreateProductInput, ['description']); // description 빼기기
// PartialType(CreateProductInput); // 옵셔널
