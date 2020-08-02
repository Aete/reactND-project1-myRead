import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class App extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    console.log(BooksAPI.getAll);
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState(() => ({
        books: books,
      }));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header__title">My Reads: A Book Tracking App</h1>
        </header>
        <main></main>
      </div>
    );
  }
}

export default App;
