import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnnouncementDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}