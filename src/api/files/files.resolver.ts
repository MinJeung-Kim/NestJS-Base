import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  // @Mutation(() => String)
  // uploadFile(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  // ): Promise<string> {
  //   return this.filesService.upload(file);
  // }

  @Mutation(() => [String])
  uploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    return this.filesService.uploads(files);
  }
}
