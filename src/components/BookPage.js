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

        // fetch the book from API

        // parse the json object and populate the detal page
    }
    render() {
        return (
            <div class="book-detail" >
                <div className="list-books-title">
                    <Link to="/" className="close-search">Close</Link>
                    <h1>{this.state.bookId}</h1>
                </div>
            </div>
        )
    }
}

export default BookPage;