// src/bookings/bookings.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'generated/prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { event_id, user_id } = createBookingDto;

    const user = await this.prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${user_id}" not found.`);
    }

    const event = await this.prisma.event.findUnique({
      where: { id: event_id },
    });
    if (!event) {
      throw new NotFoundException(`Event with id "${event_id}" not found.`);
    }

    const existingBooking = await this.prisma.booking.findUnique({
      where: {
        eventId_userId: {
          eventId: event_id,
          userId: user_id,
        },
      },
    });
    if (existingBooking) {
      throw new ConflictException(
        `User "${user_id}" has already booked a spot for event "${event_id}".`,
      );
    }

    const bookingCount = await this.prisma.booking.count({
      where: { eventId: event_id },
    });
    if (bookingCount >= event.totalSeats) {
      throw new ConflictException(
        `All seats for event "${event_id}" are already booked.`,
      );
    }

    return this.prisma.booking.create({
      data: {
        eventId: event_id,
        userId: user_id,
      },
    });
  }

  findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      include: {
        event: true,
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        event: true,
        user: true,
      },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id "${id}" not found.`);
    }
    return booking;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  async remove(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id "${id}" not found.`);
    }
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
