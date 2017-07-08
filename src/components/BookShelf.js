import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired,
        getShelf: PropTypes.func.isRequired,
        comeFrom : PropTypes.string.isRequired
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {console.log(this.props.name)}
                        {this.props.books.map((book) => (
                            <li key={book.id}>
                                <Book data={book} comeFrom={this.props.comeFrom} 
                                onShelfChanged={this.props.onShelfChanged} 
                                getShelf={this.props.getShelf}/>
                            </li>
                        ))}
                        
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;