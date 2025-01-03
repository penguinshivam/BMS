import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {Book, BookRelations} from '../models';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.title,
  BookRelations
> {
  constructor(
    @inject('datasources.PG') dataSource: PgDataSource,
  ) {
    super(Book, dataSource);
  }
}
