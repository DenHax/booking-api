import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from 'generated/prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({
      data: {
        name: createEventDto.name,
        totalSeats: createEventDto.total_seats,
      },
    });
  }

  findAll(): Promise<Event[]> {
    return this.prisma.event.findMany({
      include: {
        bookings: true,
      },
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });
    if (!event) {
      throw new NotFoundException(`Event with id "${id}" not found.`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException(`Event with id "${id}" not found.`);
    }
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException(`Event with id "${id}" not found.`);
    }
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
