import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BackupExceptionFilter } from './backup/backup-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('services')
  app.enableCors();
  app.useGlobalFilters(new BackupExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
