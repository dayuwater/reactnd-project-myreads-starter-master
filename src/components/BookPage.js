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
        // it seems that array values need some special care
        title : "",
        authors: "",
        imgUrl: "",
        categories: "",
        ISBN_10: "",
        ISBN_13: ""
       

    }

    componentDidMount() {
        console.log(this.props)
        // fetch the book from API
        BooksAPI.get(this.props.match.params.id).then((book) => {
            // console.log(book)
            // parse the json object and populate the detail page
            this.setState({book})
            // get the title
            if (book.title == null) {
                this.setState({ title: "Unknown Title" })
            }
            else {
                this.setState({ title: book.title })
            }

            // get the authors
            if(book.authors == null){
                this.setState({authors:"Anonymous"})
            }
            else{
                var authors= ""
                book.authors.map((author) => {
                    authors = authors.concat(author + ", ")
                })
                authors = authors.slice(0,-2)
                this.setState({authors})
            }

            // get the categories
            if(book.categories == null){
                this.setState({categories:"Unknown"})
            }
            else{
                var categories= ""
                book.categories.map((c) => {
                    categories = categories.concat(c + ", ")
                })
                categories = categories.slice(0,-2)
                this.setState({categories})
            }

            // get the isbn
            if(book.industryIdentifiers == null){
                this.setState({
                    ISBN_10: "Unknown",
                    ISBN_13: "Unknown"
                })
            }
            else{
                if (book.industryIdentifiers[1].type == "ISBN_10") {
                    this.setState({
                        ISBN_10: book.industryIdentifiers[1].identifier,
                        ISBN_13: book.industryIdentifiers[0].identifier
                    })
                }
                else{
                    this.setState({
                        ISBN_10: book.industryIdentifiers[0].identifier,
                        ISBN_13: book.industryIdentifiers[1].identifier
                    })

                }
                
            }

            // get the image url
            if(book.imageLinks != null){
                this.setState({imgUrl:book.imageLinks.thumbnail})
            }

        })




    }

    


    render() {

        return (
            <div className="book-detail" >
                <div className="list-books-title">
                    <button onClick={() => this.props.history.goBack()} className="close-search">Close</button>
                    <h1>{this.state.title}</h1>
                    {/*{console.log(this.state.book)}*/}
                    {(this.state.book.publishedDate) ? (
                        <h4>By {this.state.authors}, published {this.state.book.publishedDate} </h4>
                    ) : (
                        <h4>By {this.state.authors}</h4>
                    )}
                    
                    {(this.state.book.averageRating) && (
                        <h4> Rating: {this.state.book.averageRating} from {this.state.book.ratingsCount} votes </h4>
                    )}
                    
                </div>

                <div className="bookshelf">
                    <div className="row">
                        <a href={this.state.book.infoLink} className="col-md-6 btn btn-success"> Buy </a>
                        <a href={this.state.book.previewLink} className="col-md-6 btn btn-primary"> Preview </a>
                    </div>
                    
                    <h2 className="bookshelf-title"> Description </h2>
                    <p> {this.state.book.description} </p>
                    <h2 className="bookshelf-title"> Images </h2>
                    <img src={this.state.imgUrl} alt={this.state.title}></img>
                    <h2 className="bookshelf-title"> Product Detail </h2>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Categories </p>
                        <p className="col-xs-8"> {this.state.categories} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Content Version </p>
                        <p className="col-xs-8"> {this.state.book.contentVersion} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> ISBN_13 </p>
                        <p className="col-xs-8"> {this.state.ISBN_13} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> ISBN_10 </p>
                        <p className="col-xs-8"> {this.state.ISBN_10} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Language </p>
                        <p className="col-xs-8"> {this.state.book.language} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Maturity Rating </p>
                        <p className="col-xs-8"> {this.state.book.maturityRating} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Page Count </p>
                        <p className="col-xs-8"> {this.state.book.pageCount} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Print Type </p>
                        <p className="col-xs-8"> {this.state.book.printType} </p>
                    </div>

                    <div className="row">
                        <p className="col-xs-4 book-attribute"> Publisher </p>
                        <p className="col-xs-8"> {this.state.book.publisher} </p>
                    </div>
                </div>

                
            </div>

        )
    }
}

export default BookPage;