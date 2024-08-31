import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(20) // Should be amount of the episodes
  @Min(2, { each: true })
  @Max(255, { each: true })
  episodes?: string[];

  @IsOptional()
  @IsEmpty()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  planet?: string;
}
