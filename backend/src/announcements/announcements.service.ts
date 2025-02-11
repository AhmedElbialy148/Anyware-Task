import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement, AnnouncementDocument } from './schemas/announcement.schema';
import { handleError } from 'src/common/helpers/error-handling';
import { FilterAnnouncementsDto } from './dtos/filter-announcements.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { UpdateAnnouncementDto } from './dtos/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name) private announcementModel: Model<AnnouncementDocument>,
  ) {}

  async findAll(queryFilters: FilterAnnouncementsDto): Promise<PaginatedResponse<AnnouncementDocument>> {
    try {
      let {page = 1, perPage = 10} = queryFilters;

      let [announcements, total] = await Promise.all([
        this.announcementModel.find({}).sort({ createdAt: 1 }).skip((page - 1) * perPage).limit(perPage),
        this.announcementModel.countDocuments()
      ]);

      return {data: announcements, total, page, perPage, totalPages: Math.ceil(total / perPage)};
    } catch (error) {
      handleError(error);
    }
  }

  async create(announcement: CreateAnnouncementDto): Promise<AnnouncementDocument> {
    try {
      const newAnnouncement = new this.announcementModel(announcement);
      return newAnnouncement.save();
      
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, announcement: UpdateAnnouncementDto): Promise<AnnouncementDocument> {
    try {
      let updatedAnnouncement = this.announcementModel.findByIdAndUpdate(id, announcement, { new: true });
      if(!updatedAnnouncement) throw new NotFoundException('Announcement not found');
      return updatedAnnouncement;
      
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string): Promise<AnnouncementDocument> {
    try {
      let deletedAnnouncement = this.announcementModel.findByIdAndDelete(id);
      if(!deletedAnnouncement) throw new NotFoundException('Announcement not found');
      return deletedAnnouncement;
      
    } catch (error) {
      handleError(error);
    }
  }
}