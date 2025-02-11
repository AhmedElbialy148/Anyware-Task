import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementDocument } from './schemas/announcement.schema';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FilterAnnouncementsDto } from './dtos/filter-announcements.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { UpdateAnnouncementDto } from './dtos/update-announcement.dto';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  async findAll(@Query() queryFilters: FilterAnnouncementsDto): Promise<PaginatedResponse<AnnouncementDocument>> {
    return this.announcementsService.findAll(queryFilters);
  }

  @Post()
  async create(@Body() body: CreateAnnouncementDto): Promise<AnnouncementDocument> {
    return this.announcementsService.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'ObjectId' })
  async update(@Param('id') id: string, @Body() body: UpdateAnnouncementDto): Promise<AnnouncementDocument> {
    return this.announcementsService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'ObjectId' })
  async delete(@Param('id') id: string): Promise<AnnouncementDocument> {
    return this.announcementsService.delete(id);
  }
}