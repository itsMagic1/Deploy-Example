import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsDefined()
  modelo: string;

  @IsString()
  @IsDefined()
  marca: string;

  @IsString()
  @IsDefined()
  color: string;

  @IsInt()
  @IsDefined()
  ownerId: number;
}
