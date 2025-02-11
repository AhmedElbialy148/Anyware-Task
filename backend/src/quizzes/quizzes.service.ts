import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { handleError } from 'src/common/helpers/error-handling';
import { FilterQuizzesDto } from './dtos/filter-quizzes.dto';
import { UpdateQuizDto } from './dtos/update-quiz.dto';
import { CreateQuizDto } from './dtos/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

  async findAll(queryFilters: FilterQuizzesDto): Promise<PaginatedResponse<QuizDocument>> {
    try {
      let {page = 1, perPage = 10} = queryFilters;
      let [quizzes, total] = await Promise.all([
        this.quizModel.find({}).sort({ createdAt: 1 }).skip((page - 1) * perPage).limit(perPage),
        this.quizModel.countDocuments()
      ]);
      return {data: quizzes, total, page, perPage, totalPages: Math.ceil(total / perPage)};
    } catch (error) {
      handleError(error);
    }
  }

  async create(body: CreateQuizDto): Promise<QuizDocument> {
    try {
      const newQuiz = new this.quizModel(body);
      return newQuiz.save();
      
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, body: UpdateQuizDto): Promise<QuizDocument> {
    try {
      let updatedQuiz = this.quizModel.findByIdAndUpdate(id, body, { new: true });
      if(!updatedQuiz) throw new NotFoundException('Quiz not found');
      return updatedQuiz;
      
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string): Promise<QuizDocument> {
    try {
      let deletedQuiz = this.quizModel.findByIdAndDelete(id);
      if(!deletedQuiz) throw new NotFoundException('Quiz not found');
      return deletedQuiz;
    } catch (error) {
      handleError(error);
    }
  }
}
