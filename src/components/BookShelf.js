import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id}>
                                <Book data={book}/>
                            </li>
                        ))}
                        
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;