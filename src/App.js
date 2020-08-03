import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class App extends Component {
  state = {
    books: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books: books,
        isLoading: false,
      });
    });
  };

  moveBooks = (bookid, fromShelf, toShelf) => {
    if (fromShelf !== toShelf) {
      const targetBook = this.state.books.filter((book) => book.id === bookid);
      BooksAPI.update(targetBook[0], toShelf).then((response) => {
        targetBook[0].shelf = toShelf;
        this.setState((currentState) => {
          return {
            books: currentState.books
              .filter((book) => book.id !== bookid)
              .concat(targetBook),
          };
        });
      });
    } else {
      alert('Same category');
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header__title">My Reads: A Book Tracking App</h1>
        </header>
        {this.state.isLoading === true ? (
          <main>Loading...</main>
        ) : (
          <main>
            <BookShelf
              shelfName="Currently Reading"
              bookList={this.state.books.filter(
                (book) => book.shelf === 'currentlyReading'
              )}
              onMoveBook={this.moveBooks}
            />
            <BookShelf
              shelfName="Want to Read"
              bookList={this.state.books.filter(
                (book) => book.shelf === 'wantToRead'
              )}
              onMoveBook={this.moveBooks}
            />
            <BookShelf
              shelfName="Read"
              bookList={this.state.books.filter(
                (book) => book.shelf === 'read'
              )}
              onMoveBook={this.moveBooks}
            />
          </main>
        )}
      </div>
    );
  }
}

export default App;
