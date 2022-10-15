import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
  this.title = title;
  this.year = year;
  this.publicationBy = publicationBy;
  this.authors = authors;
  this.likedUsers = [];

  publicationBy.myBooks.push(this);

  authors.forEach((author) => {
    author.books.push(this);
  });

  Object.defineProperty(this, 'suggestedBooks', {
    get() {
      return this
        .authors
        .reduce((accum, author) => {
          const nameBooks = author.books.map((book) => book);
          const uniqueBooks = new Set(nameBooks);
          return [...uniqueBooks];
        }, [])
        .filter((book) => book !== this)
        .map(({ title }) => title)
        .join(', ');
    },
  });

  Object.defineProperty(this, 'suggestedPublicators', {
    get() {
      return this
        .authors
        .reduce((accum, author) => {
          const publicators = author.books.map((book) => book.publicationBy);
          const uniquePublicators = new Set(publicators);
          return [...uniquePublicators];
        }, [])
        .filter((publicator) => publicator !== this.publicationBy)
        .map(({ name }) => name)
        .join(', ');
    },
  });
}
