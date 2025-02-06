import { Injectable } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(names: { name: string }[]) {
    return this.tagsRepository.insert(names);
  }

  findAll(tagNames: string[]) {
    return this.tagsRepository.find({
      where: { name: In(tagNames) },
    });
  }
}
