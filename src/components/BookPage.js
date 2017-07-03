import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';

class BookPage extends Component {

    state = {
        title : ""
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        // fetch the book from API
        BooksAPI.get(this.props.match.params.id).then((book) => {
            console.log(book)
            // parse the json object and populate the detail page

            // get the title
            if (book.title == null) {
                this.setState({ title: "Unknown Title" })
            }
            else {
                this.setState({ title: book.title })
            }
        })




    }


    render() {
        return (
            <div class="book-detail" >
                <div className="list-books-title">
                    <Link to="/" className="close-search">Close</Link>
                    <h1>{this.state.title}</h1>
                </div>
            </div>
        )
    }
}

export default BookPage;