import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({ imports: [ConfigModule], providers: [FilesResolver, FilesService] })
export class FilesModule {}
