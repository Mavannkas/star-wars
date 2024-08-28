import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CharacterModule,
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
