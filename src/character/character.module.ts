import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './entities/character.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
  ],
  controllers: [CharacterController],
  providers: [],
})
export class CharacterModule {}
