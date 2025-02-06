import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// try-catch로 에러를 잡지 않고, 에러가 발생하면 이 필터로 에러를 처리한다.
// main.ts에 글로벌로 등록 필요.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 필수로 구현해야 되는 catch 함수
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('======================');
    console.log('예외가 발생했어요.');
    console.log('예외내용', message);
    console.log('예외코드', status);
    console.log('======================');
  }
}
