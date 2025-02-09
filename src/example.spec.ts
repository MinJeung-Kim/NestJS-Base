// $ npm run test

// 1개 테스트트
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 1개 이상
describe('그룹 테스트', () => {
  it('더하기', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('빼기', () => {
    const a = 4;
    const b = 2;

    expect(a - b).toBe(2);
  });
});

// 상품 구매하기 테스트 작성성
describe('상품 구매하기', () => {
  //   beforeAll(() => {}); // 모든 it 테스트 실행 전 1번 실행(로그인 등)
  //   beforeEach(() => {}); // 각각의 it 테스트 실행 전 매번 실행(초기값, 초기화 등)

  it('돈 검증', () => {
    const result = true; // 돈이 충분하다고 가정
    expect(result).toBe(true);
  });

  it('상품 구매', () => {
    const result = true; // 상품을 구매했다고 가정
    expect(result).toBe(true);
  });
});
