import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import logo from './udacity.png';
import './App.css';
import Search from './Search';

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
      this.setState({
        books: books,
        isLoading: false,
      });
    });
  };

  moveBooks = (bookid, fromShelf, toShelf) => {
    if (fromShelf !== toShelf) {
      BooksAPI.get(bookid).then((targetBook) => {
        BooksAPI.update(targetBook, toShelf).then((response) => {
          targetBook.shelf = toShelf;
          this.setState((currentState) => {
            return {
              books: currentState.books
                .filter((book) => book.id !== bookid)
                .concat(targetBook),
            };
          });
        });
      });
    } else {
      alert('Same category');
    }
  };

  render() {
    let main =
      this.state.isLoading === false ? (
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
            bookList={this.state.books.filter((book) => book.shelf === 'read')}
            onMoveBook={this.moveBooks}
          />
          <Link to="/search" className="App-search">
            <span>Add a book</span>
          </Link>
        </main>
      ) : (
        <h1>Loading</h1>
      );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="udacity" />
          <h1 className="App-header__title">My Reads: A Book Tracking App</h1>
        </header>
        <Route
          exact
          path="/"
          render={() => {
            return main;
          }}
        />
        <Route
          exact
          path="/search"
          render={() => {
            return (
              <Search
                onSearch={(query) => BooksAPI.search(query)}
                onMoveBook={this.moveBooks}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
