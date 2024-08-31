import { IsArray, IsOptional, IsString, Min } from 'class-validator';

export class SearchCharactersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Min(1, { each: true })
  episodes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Min(1, { each: true })
  planets?: string[];

  @Min(1)
  @IsOptional()
  page: number = 1;

  @Min(1)
  @IsOptional()
  limit: number = 10;
}
