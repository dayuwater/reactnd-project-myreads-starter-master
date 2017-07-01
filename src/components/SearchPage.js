import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';


class SearchPage extends Component {
    state ={
        query : ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        return (
        <div className= "search-books" >
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" 
                    onChange={(event) => this.updateQuery(event.target.value)} />
                </div>
                <button className="clear-search"> Clear </button>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                    <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                     <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                    <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                    <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                    <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                     <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                    <li>
                        <Book title="Test" author="Test" imgUrl="Test" />
                    </li>
                </ol>
            </div>
          </div>


        )
    
    }
}

export default SearchPage;
