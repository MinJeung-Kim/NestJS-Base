import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    // 필수 환경 변수 검증
    const region = this.configService.get<string>('AWS_REGION') ?? '';
    const accessKeyId = this.configService.get<string>(
      'AWS_ACCESS_KEY_ID',
    ) as string;
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    ) as string;
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') as string;

    if (!this.bucketName) {
      throw new Error('AWS_S3_BUCKET is not defined in environment variables.');
    }

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing required AWS credentials');
    }

    // 타입 안전성이 보장된 설정으로 S3Client 초기화
    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload(file: FileUpload): Promise<string> {
    const key = `images/${Date.now()}-${file.filename}`;
    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: file.createReadStream(),
        ContentType: file.mimetype,
      },
    });

    // 업로드 진행 상황을 모니터링
    upload.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    // 업로드 완료까지 대기
    await upload.done();

    console.log('파일 전송이 완료되었습니다.');

    // S3 URL 반환
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
