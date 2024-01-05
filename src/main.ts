import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

(async function start() {
  const PORT = process.env.PORT || 5004

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Elegant Shop')
    .setDescription('This Documentation Shop created for best friends')
    .setVersion('1.0')
    .addServer('http://localhost:5020', 'Local environment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on port ==> ${PORT}`)
  });
})()
