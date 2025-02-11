import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { ApiParam } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { QuizDocument } from './schemas/quiz.schema';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { UpdateQuizDto } from './dtos/update-quiz.dto';
import { FilterQuizzesDto } from './dtos/filter-quizzes.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async findAll(@Query() queryFilters: FilterQuizzesDto): Promise<PaginatedResponse<QuizDocument>> {
    return this.quizzesService.findAll(queryFilters);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Body() body: CreateQuizDto): Promise<QuizDocument> {
    return this.quizzesService.create(body);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  @ApiParam({ name: 'id', type: 'string', format: 'ObjectId' })
  async update(@Param('id') id: string, @Body() body: UpdateQuizDto): Promise<QuizDocument> {
    return this.quizzesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiParam({ name: 'id', type: 'string', format: 'ObjectId' })
  async delete(@Param('id') id: string): Promise<QuizDocument> {
    return this.quizzesService.delete(id);
  }
}
