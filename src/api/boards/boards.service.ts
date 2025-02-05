import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  create(createBoardInput: CreateBoardInput): string {
    return 'This action adds a new board';
  }

  findAll(): Board[] {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다!!',
        contents: '내용입니다~',
      },
      {
        number: 2,
        writer: '영희',
        title: '제목입니다!!',
        contents: '내용입니다~',
      },
    ];
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardInput: UpdateBoardInput) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
