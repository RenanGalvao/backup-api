import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './app-exception.filter';
import { ResponseInterceptor } from './response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('services')
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AppExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
