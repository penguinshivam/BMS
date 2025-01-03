import {Entity, model, property} from '@loopback/repository';
import {v4 as uuidv4} from 'uuid';
@model({settings:{
  postgresql: {table: 'Book'}
}})

export class Book extends Entity {
  @property({
    type: 'string',
    id: true,
    // generated: true,
    default : uuidv4,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  book_type: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
    required: true,
  })
  isbn: string;

  @property({
    type: 'string',
    required: true,
  })
  genre: string;

  @property({
    type: 'string',
    required: true,
  })
  publication_date: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
