import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';

class BookPage extends Component {
    static PropTypes = {
        
    }

    state = {
        bookId: null
    }
    componentDidMount(){
        // get the id of the book
        this.setState({
            bookId : this.props.match.params.id
        })
    }
    render() {
        return (
            <div class="book-detail" >
                <div className="list-books-title">
                    <h1>{this.state.bookId}</h1>
                </div>
            </div>
        )
    }
}

export default BookPage;