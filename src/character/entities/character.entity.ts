import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
@ApiExtraModels()
export class Character {
  @ApiProperty({ type: String, description: 'ID of the character' })
  _id: Types.ObjectId;

  @Prop({
    required: true,
  })
  @ApiProperty({ type: String, description: 'Name of the character' })
  name: string;

  @Prop({
    type: [String],
  })
  @ApiProperty({ type: [String], description: 'List of episodes' })
  episodes?: string[];

  @Prop()
  @ApiProperty({ type: String, description: 'Planet of the character' })
  planet?: string;

  @Exclude()
  __v?: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
