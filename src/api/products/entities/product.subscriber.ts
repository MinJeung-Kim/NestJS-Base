import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  // Product 테이블을 구독하고 있는 함수
  listenTo() {
    return Product;
  }

  /**
   * 주의 사항
   * 1. 트랜잭션으로 연결된 중요한 내용들이 있을 경우 사용에 주의한다.
   * 2. 메인 로직에 큰 피해를 안끼치는 로직들 (예: 로그, 알림, 부분 통계 계산 등)만 사용을 권장 한다.
   *
   */

  // Product 테이블에 insert가 발생하면 실행되는 함수
  afterInsert(event: InsertEvent<Product>) {
    const { id, name, price, description, isSoldOut } = event.entity;
    console.log('afterInsert : ', id, name, price, description, isSoldOut);
  }

  beforeInsert(event: InsertEvent<Product>): Promise<any> | void {
    console.log(`BEFORE PRODUCT INSERTED: `, event.entity);
  }
}
