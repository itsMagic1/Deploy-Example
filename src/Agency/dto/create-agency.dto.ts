import { IsDefined, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsDefined()
  @IsString()
  name: string;
}
