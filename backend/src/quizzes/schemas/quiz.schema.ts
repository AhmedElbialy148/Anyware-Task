import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ _id: false})
class QuestionSchema {
  @Prop({ type: String, required: true })
  questionText: string;
  
  @Prop({ type: [String], required: true })
  asnwers: string[];
  
  @Prop({ type: String, required: true })
  correctAnswer: string;

}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Quiz {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [QuestionSchema], required: true })
  questions: QuestionSchema[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
