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
                    <h4>By (AuthorList), published (date) </h4>
                    <h4> Rating: (rating) from (number of voters) votes </h4>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title"> Description </h2>
                    <h2 className="bookshelf-title"> Images </h2>
                    <h2 className="bookshelf-title"> Useful Links </h2>
                    <div className="row">
                        <p className="col-md-4 book-attribute"> Canonical Volumn on Android Market </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Google Play </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Preview On Google Books </p>
                        <p className="col-md-8"> value1 </p>
                    </div>
                    <h2 className="bookshelf-title"> Product Detail </h2>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Category </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Content Version </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> ISBN_13 </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> ISBN_10 </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Language </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Maturity Rating </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Page Count </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Print Type </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Publisher </p>
                        <p className="col-md-8"> value1 </p>
                    </div>
                </div>

                <div className="open-search">
                    <Link to="/" >Add A book</Link>
                </div>

            </div>

        )
    }
}

export default BookPage;