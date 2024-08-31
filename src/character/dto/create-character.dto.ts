import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ type: String, description: 'Name of the character' })
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(20) // Should be amount of the episodes
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(255, { each: true })
  @ApiPropertyOptional({ type: [String], description: 'List of episodes' })
  episodes?: string[];

  @IsOptional()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiPropertyOptional({ type: String, description: 'Planet of the character' })
  planet?: string;
}
