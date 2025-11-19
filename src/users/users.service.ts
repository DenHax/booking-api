import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        bookings: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
