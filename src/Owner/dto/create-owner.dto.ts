import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  agencyid: number;
}
