import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import BookShelf from './components/BookShelf'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    Read: [],
    books: []
  }

  // It seems that the backend database does not have any books at the beginning
  // we must deal with search feature first in order to figure out the correct datastructure

  fetchBooksFromBackend(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).then(() => {
      // Since the shelf data is already in the API, put them into the correct shelf
      this.setState({
        currentlyReading: this.state.books.filter((book) => book.shelf == "currentlyReading"),
        wantToRead: this.state.books.filter((book) => book.shelf == "wantToRead"),
        Read: this.state.books.filter((book) => book.shelf == "read")

      })
    })

  }
  componentDidMount() {
    this.fetchBooksFromBackend()
  }
  
  onShelfChanged = (data, value) => {
    // update the backend
    BooksAPI.update(data,value).then((res)=>{
      this.fetchBooksFromBackend()
    })
 
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                <div>
                  <BookShelf name="Currently Reading" books={this.state.currentlyReading} onShelfChanged={this.onShelfChanged}/>
                  <BookShelf name="Want to Read" books={this.state.wantToRead} onShelfChanged={this.onShelfChanged}/>
                  <BookShelf name="Read" books={this.state.Read} onShelfChanged={this.onShelfChanged}/>
                </div>
              </div>

              <div className="open-search">
                <Link to="/search" >Add A book</Link>
              </div>

            </div>
        )}>
        </Route>

        <Route path="/search" render={() => (
          <SearchPage onShelfChanged={this.onShelfChanged}/>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
