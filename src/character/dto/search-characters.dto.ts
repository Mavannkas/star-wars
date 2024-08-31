import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

export class SearchCharactersDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiPropertyOptional({ type: String, description: 'Episode name' })
  episode: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiPropertyOptional({
    type: String,
    description: 'Planet name',
  })
  planet?: string;

  @IsOptional()
  @IsNumberString()
  //Min value 1
  @Validate((value) => +value >= 1, {
    message: 'Page number should be greater than or equal to 1',
  })
  @ApiPropertyOptional({ type: Number, description: 'Page number' })
  page?: string;

  @IsOptional()
  @IsNumberString()
  @Validate((value) => +value >= 1, {
    message: 'Page number should be greater than or equal to 1',
  })
  @ApiPropertyOptional({ type: Number, description: 'Limit of results' })
  limit?: string;
}
