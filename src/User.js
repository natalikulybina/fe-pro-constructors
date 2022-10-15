import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {
  this.name = name;
  this.date = date;
  this.myBooks = [];
  this.friends = [];
  this.likes = [];

  this.addToFriends = function (user) {
    if (this.friends.includes(user)) {
      this.friends = this.friends.filter((friend) => friend !== user);
      user.friends = user.friends.filter((friend) => friend !== this)
    } 
    else {
      this.friends.push(user);
      user.friends.push(this);
    }
  };

  this.removeFriend = this.addToFriends;

  this.likeBook = function (book) {
    if (this.likes.includes(book)) {
      this.likes = this.likes.filter((user) => user !== book);
      book.likedUsers = book.likedUsers.filter((user) => user !== this);
    }
    else {
      this.likes.push(book);
      book.likedUsers.push(this);
    }
  };

  this.unlikeBook = this.likeBook;

  Object.defineProperty(this, 'friendsNames', {
    get() {
      return this.friends.map(({ name }) => name)
      .join(', ');
    }
  });

  Object.defineProperty(this, 'likedBooks', {
    get() {
      return this.likes.map(({ title }) => title)
      .join(', ');
    }
  });

  Object.defineProperty(this, 'publishedBooks', {
    get() {
        return this.myBooks.map(({ title }) => title)
        .join(', ');
    }
});
}
