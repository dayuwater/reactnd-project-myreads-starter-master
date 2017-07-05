import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf'

class DiscoverPage extends Component{

    state = {
        displayMode : "categories",
        allBooks: [],
        discBooks: [],
        classifications: [],
        categorizedBooks: [] // array of arrays
    }

    loadBooks(){
        // I tried to load all the possible queries and my computer suddenly frozen
        // So I just use a small portion of queries
        // Nevertheless, this clearly shows how the discover page should work
        let start = Math.random() * (BooksAPI.searchTerms.length - 11)

        BooksAPI.searchTerms.slice(start,start+10).forEach((term) => {
            BooksAPI.search(term, 30).then((books) => {
                
                let allBooks = this.state.allBooks.concat(books)
                allBooks = Array.from(new Set(allBooks))
                this.setState({allBooks})
                
            }).then(() => {
 
            // step 2: Categorize the books into given categories
            this.categorizeBooks(this.state.displayMode)

            })

        })

    }

    componentDidMount(){
        // step 1: search all the books in the backend
        var allBooks = []
        var discBooks = []
        
        //BooksAPI.discover()
        var queue = Promise.resolve()
        this.loadBooks()

  
        // BooksAPI.search('a',30).then((books)=>{
        //     allBooks = allBooks.concat(books)
        // }).then(() => {
        //     this.setState({allBooks})
        //     console.log(this.state)
        // }).then(() => {
 
        //     // step 2: Categorize the books into given categories
        //     this.categorizeBooks(this.state.displayMode)

        // })

    }

    categorizeBooks = (mode) => {
        console.log(`categorize in ${mode}`)
        // get all the possible value of that category
        var allValues = new Set()
        var categorizedBooks = []
        var chosenBooks = []

        // this is a special case because it is not a singleton in the backend
        if(mode == "categories"){
            // get all the possible categories
            this.state.allBooks.map((book) => {
                if(book[mode] != null){
                    book[mode].map((value) => {
                        allValues = allValues.add(value)
                    })
                }
                
            })
            //console.log(allValues)

            // put all books in known categories
            // in this case, multiple classficiation are allowed
            allValues.forEach((value) => {
                // console.log(value)
                var filtered = this.state.allBooks.filter((book)=>(
                    // console.log(book[mode] == value)
                    (book[mode]) &&  (book[mode].indexOf(value) > -1)
                ))
                // console.log(filtered)
                categorizedBooks = categorizedBooks.concat([filtered])
                chosenBooks = chosenBooks.concat(filtered)
            })
            // put all books in missing categories
            var filtered = this.state.allBooks.filter((book)=>(
                // console.log(book[mode] == value)
                chosenBooks.indexOf(book) == -1

            ))
            categorizedBooks = categorizedBooks.concat([filtered])

           
            
        }
        else if(mode == "pageCount"){
            allValues = [200, 500, 800, Infinity]
            allValues.forEach((value) => {
                console.log(value)
                var filtered = this.state.allBooks.filter((book)=>(
                    // console.log(book[mode] == value)
                    (book[mode]) && (book[mode] < value) && (chosenBooks.indexOf(book) == -1)
                ))
                
                categorizedBooks = categorizedBooks.concat([filtered])
                chosenBooks = chosenBooks.concat(filtered)
            })
            // add all fall off books
            var filtered = this.state.allBooks.filter((book)=>(
                // console.log(book[mode] == value)
                chosenBooks.indexOf(book) == -1

            ))
            categorizedBooks = categorizedBooks.concat([filtered])

            allValues=["less than 200 pages" , "200 - 500 pages",
            "500 - 800 pages", "more than 800 pages"]

           
            

            

        }
        // for all singleton entries
        else{
            this.state.allBooks.map((book) => {
                allValues = allValues.add(book[mode])
            })
          
            allValues.forEach((value) => {
                // console.log(value)
                var filtered = this.state.allBooks.filter((book)=>(
                    // console.log(book[mode] == value)
                    book[mode] === value
                ))
                // console.log(filtered)
                categorizedBooks = categorizedBooks.concat([filtered])
                chosenBooks = chosenBooks.concat(filtered)
            })

            // add all fall off books
            var filtered = this.state.allBooks.filter((book)=>(
                // console.log(book[mode] == value)
                chosenBooks.indexOf(book) == -1

            ))
            categorizedBooks = categorizedBooks.concat([filtered])




            
        }

        allValues = Array.from(allValues)
        allValues = allValues.concat("Unknown")

        // filter allBooks into different categories, put them into categorized [[]]
        this.setState({classifications:allValues,
                        categorizedBooks:categorizedBooks
                    })
                    
        


    }

    



    onDisplayModeChange = (mode) =>{
        // recategorize the books
        
        this.setState({displayMode:mode})
        this.categorizeBooks(mode)
        console.log(this.state)
        
    }
    render(){
        return(
            <div className="list-books">
              <div className="list-books-title">
                <Link to="/" className="close-search">Close</Link>
                <h1>Discover Books</h1>
              </div>

              <header className="row">
                  <button onClick={() => this.onDisplayModeChange("categories")} className="col-sm-3 col-xs-6 btn btn-primary" type="button" > Category </button>
                  <button onClick={() => this.onDisplayModeChange("language")} className="col-sm-3 col-xs-6 btn btn-success" type="button" > Language </button>
                  <button onClick={() => this.onDisplayModeChange("maturityRating")} className="col-sm-3 col-xs-6 btn btn-info" type="button" > Maturity Rating </button>
                  <button onClick={() => this.onDisplayModeChange("pageCount")} className="col-sm-3 col-xs-6 btn btn-warning" type="button" > Page Count </button>

              </header>

              <div className="list-books-content">
                <div>
                    {this.state.categorizedBooks.map((shelf, index) => (
                        
                        <BookShelf comeFrom="server" name={this.state.classifications[index]} books={shelf} onShelfChanged={this.props.onShelfChanged}/>
                    ))}
                  
                  
                </div>
              </div>

            </div>
        )
    }
}

export default DiscoverPage;

