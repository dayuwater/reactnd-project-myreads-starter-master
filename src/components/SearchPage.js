import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';


class SearchPage extends Component {

    static PropTypes = {
        onShelfChanged: PropTypes.func.isRequired,
        getShelf: PropTypes.func.isRequired
    }

    state ={
        query : '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if(query != ''){
            BooksAPI.search(query, 30).then((books)=>{
                if(books.error != "empty query")
                    this.setState({books})
                else
                    this.setState({books:[]})
                
            })
            if(this.state.books["error"] == "empty query"){
                this.setState({books:[]})
            }
        }

        else
            this.setState({books:[]})
    }

    clearQuery = () => {
        this.setState({query: '', books:[]})
       
    }

    // because the returned book object is way more complicated than a simple data binding
    // we must pass the entire book object into subview and let the subview 
    // decide what to render
    render() {
        return (
        <div className= "search-books" >
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" value={this.state.query} placeholder="Search by title or author" 
                    onChange={(event) => this.updateQuery(event.target.value)} />
                </div>
                <button onClick={() => this.clearQuery()} className="clear-search"> Clear </button>
            </div>
           
            <div className="search-books-results">
                 
                <ol className="books-grid">
                    
                    {
                        this.state.books.map((book) => (
                        <li key={book.id}>
                            <Book data={book} comeFrom="server" 
                            onShelfChanged={this.props.onShelfChanged} getShelf={this.props.getShelf}/>
                        </li>
                    ))}
                    
                
                </ol>
            </div>
          </div>


        )
    
    }
}

export default SearchPage;
