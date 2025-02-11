import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

class QuestionDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty({ message: 'Question text is required' })
  questionText: string;
  
  @ApiProperty({ type: [String], required: true })
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Answers are required' })
  asnwers: string[];
  
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty({ message: 'Correct answer is required' })
  correctAnswer: string;
}

export class CreateQuizDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ type: [QuestionDto], required: true })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}