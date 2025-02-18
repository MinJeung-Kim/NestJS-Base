import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { BoardsModule } from './api/boards/boards.module';
import { ProductsModule } from './api/products/products.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './api/categories/categories.module';
import { ProductLocationModule } from './api/productLocation/productLocation.module';
import { TagsModule } from './api/tags/tags.module';
import { AuthModule } from './api/auth/auth.module';
import { FilesModule } from './api/files/files.module';

@Module({
  imports: [
    BoardsModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    ProductLocationModule,
    TagsModule,
    AuthModule,
    FilesModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      csrfPrevention: false, // ✨ 프로덕트 환경에서는 true로 변경해줘야함 (CSRF 공격 방지)
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/api/**/*.entity.*'],
      synchronize: true, // typeORM과 MySQL 동기화
      logging: true,
    }),
  ],
})
export class AppModule {}
