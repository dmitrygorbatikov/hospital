import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as bodyParser from 'body-parser'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)
   const PORT = process.env.PORT || 5000

   const config = new DocumentBuilder()
      .setTitle('Swagger documentation')
      .setDescription(
         'This is an application for a hospital that helps doctors in automating the dispensing of medicines and helping to keep track of their safety.',
      )
      .setVersion('1.0')
      .addTag('hospital')
      .build()
   const document = SwaggerModule.createDocument(app, config)
   SwaggerModule.setup('api', app, document)

   app.use(bodyParser.json({ limit: '50mb' }))
   app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
   app.enableCors()

   await app.listen(PORT, () => {
      console.log(`App has been started on PORT ${PORT}`)
   })
}

bootstrap()
