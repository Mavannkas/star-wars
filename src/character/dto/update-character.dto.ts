import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCharacterDto {
  @IsOptional()
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
