import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    type: [String],
  })
  episodes?: string[];

  @Prop()
  planet?: string;
}

export const CatSchema = SchemaFactory.createForClass(Character);
