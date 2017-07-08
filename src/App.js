import React from 'react'
import * as BooksAPI from './BooksAPI'
import './css/bootstrap.min.css';
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import BookShelf from './components/BookShelf'
import BookPage from './components/BookPage'
import DiscoverPage from './components/DiscoverPage'


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

  fetchBooksFromBackend() {
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
    BooksAPI.update(data, value).then((res) => {
      this.fetchBooksFromBackend()
    })
   
  }

  // get the shelf of that book
  getShelf = (book) => {
    let isInCurrentReading = this.state.currentlyReading.filter( b => b.id == book.id )
    let isInWantToRead = this.state.wantToRead.filter( b => b.id == book.id )
    let isInRead = this.state.Read.filter( b => b.id == book.id )

    if(isInCurrentReading.length > 0){
      return "currentlyReading"
    }
    else if(isInWantToRead.length > 0){
      return "wantToRead"
    }
    else if(isInRead.length > 0){
      return "read"
    }
    else{
      return "none"
    }
    

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
                <BookShelf name="Currently Reading" comeFrom="local" books={this.state.currentlyReading} 
                onShelfChanged={this.onShelfChanged} getShelf={this.getShelf} />
                <BookShelf name="Want to Read" comeFrom="local" books={this.state.wantToRead} 
                onShelfChanged={this.onShelfChanged} getShelf={this.getShelf}/>
                <BookShelf name="Read" comeFrom="local" books={this.state.Read} 
                onShelfChanged={this.onShelfChanged} getShelf={this.getShelf}/>
              </div>
            </div>

            <div className="open-discover">
              <Link to="/discover" >Discover A book</Link>
            </div>

            <div className="open-search">
              <Link to="/search" >Add A book</Link>
            </div>



          </div>
        )}>
        </Route>

        <Route path="/search" render={() => (
          <SearchPage onShelfChanged={this.onShelfChanged} getShelf={this.getShelf} />
        )}>
        </Route>

        <Route path="/book/:id" component={BookPage} />

        <Route path="/discover" render={() => (
          <DiscoverPage onShelfChanged={this.onShelfChanged} getShelf={this.getShelf}/>

        )} />


      </div>
    )
  }
}

export default BooksApp
