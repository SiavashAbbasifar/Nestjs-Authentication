import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './../book/Schemas/bookSchema';
import { createABookDTO } from './DTO/create-book.dto';
import { updateABookDTO } from './DTO/update-book.dto';
import { query } from 'express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  //Get all books:
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  //create a book:
  @Post('newbook')
  @UseGuards(AuthGuard())
  async createABook(
    @Body()
    book: createABookDTO,
    @Req() req
    
  ): Promise<Book> {
    return this.bookService.create(book,req.user);
  }

  //upadte a book by id:
  @Put('update/:id')
  async updateABook(
    @Param('id')
    id: String,
    @Body()
    book: updateABookDTO,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  //delete a book by id:
  @Delete('delete/:id')
  async deleteABook(
    @Param('id')
    IdleDeadline: String,
    id: String,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
