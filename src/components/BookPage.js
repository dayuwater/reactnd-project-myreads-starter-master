import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';



class BookPage extends Component {

    state = {
        book: {}, // the book object retrieved from the server
        // use book object first
        // all of the keys below are used for fall back measures
        title : "",
        authors: [],
        publish_date: [],
        rating: 0 ,
        voters: 0,

    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        // fetch the book from API
        BooksAPI.get(this.props.match.params.id).then((book) => {
            console.log(book)
            // parse the json object and populate the detail page
            this.setState({book})
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
                    {console.log(this.state.book)}
                    <h4>By (AuthorList), published {this.state.book.publishedDate} </h4>
                    <h4> Rating: {this.state.book.averageRating} from {this.state.book.ratingsCount} votes </h4>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title"> Description </h2>
                    <p> {this.state.book.description} </p>
                    <h2 className="bookshelf-title"> Images </h2>
                    <h2 className="bookshelf-title"> Useful Links </h2>
                    <div className="row">
                        <p className="col-md-4 book-attribute"> Canonical Volumn on Android Market </p>
                        
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Google Play </p>
                        
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Preview On Google Books </p>
                        
                    </div>
                    <h2 className="bookshelf-title"> Product Detail </h2>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Category </p>
                        <p className="col-md-8"> value1 </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Content Version </p>
                        <p className="col-md-8"> {this.state.book.contentVersion} </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> ISBN_13 </p>
                        {/*<p className="col-md-8"> {this.state.book.industryIdentifiers} </p>*/}
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> ISBN_10 </p>
                        {/*<p className="col-md-8"> {this.state.book.industryIdentifiers} </p>*/}
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Language </p>
                        <p className="col-md-8"> {this.state.book.language} </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Maturity Rating </p>
                        <p className="col-md-8"> {this.state.book.maturityRating} </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Page Count </p>
                        <p className="col-md-8"> {this.state.book.pageCount} </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Print Type </p>
                        <p className="col-md-8"> {this.state.book.printType} </p>
                    </div>

                    <div className="row">
                        <p className="col-md-4 book-attribute"> Publisher </p>
                        <p className="col-md-8"> {this.state.book.publisher} </p>
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