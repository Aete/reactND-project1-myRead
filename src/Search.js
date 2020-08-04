import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import './Search.css';

class Search extends Component {
  state = {
    query: [],
    books: [],
  };

  updateQuery = (query) => {
    this.setState({ query: query });
    this.props.onSearch(query).then((books) => {
      books !== undefined
        ? this.setState({ books: books })
        : this.setState({ books: [] });
    });
  };

  render() {
    return (
      <main>
        <div className="Search-input">
          <input
            type="text"
            placeholder="Search by a title, author, or category"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        {this.state.books.length > 0 && (
          <BookShelf
            shelfName="Results"
            bookList={this.state.books}
            onMoveBook={this.props.onMoveBook}
          />
        )}
        <Link to="/" className="App-home">
          <span>Home</span>
        </Link>
      </main>
    );
  }
}

export default Search;
