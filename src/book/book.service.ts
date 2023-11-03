import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './Schemas/bookSchema';
import { NOTFOUND } from 'dns';
import { query } from 'express';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/Schemas/user.schemas';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  //Find all books:
  async findAll(query: Query): Promise<Book[]> {
    //Pagination:
    // const resPerPage=2;
    // const currentPage=Number (query.page) || 1;
    // const skip = resPerPage *(currentPage-1);
    const keyword = query.keyword
      ? {
          title: {
            //regex: for searching into the keyword
            $regex: query.keyword,
            //options: to make the information sensitive
            $options: 'i',
          },
        }
      : {}; //pagination:
    const books = await this.bookModel.find({ ...keyword }); //.limit(resPerPage).skip(skip);
    return books;
  }

  //Create a book:
  async create(book: Book,user:User): Promise<Book> {
    const data=Object.assign(book,{user:user._id})
    const existingBook = await this.bookModel.findOne({
      title: book.title,
      author: book.author
    });
    
    if(existingBook){
      throw new HttpException('Book already exists',HttpStatus.CONFLICT)
    }
      const res = await this.bookModel.create(book);
        return res;
      
    
  }

  //Find a book by id:
  async findById(id: String): Promise<Book> {
    const isValidId=mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException("Please enter a corred id");
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('This Book Does Not Exist');
    }
    return book;
  }

  //update a book by id:
  async updateById(id: String, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  //delete a book by id:
  async deleteById(id: String): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
