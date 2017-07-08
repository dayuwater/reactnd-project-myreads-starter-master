import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';

class Book extends Component {
    static PropTypes={
        data: PropTypes.object.isRequired,
        comeFrom: PropTypes.string.isRequired,
        onShelfChanged: PropTypes.func.isRequired,
        getShelf:PropTypes.func.isRequired

    }

    // this acts like a bridge from book object to actual rendering the book
    state={
        id: '',
        imgUrl: '',
        title: '',
        author: '',
        shelf: '',
        selections: ["currentlyReading", "wantToRead", "read"],
        selects: ["Currently Reading", "Want to Read", "Read"]
    }

    // This acts like a View Model in MVVM design pattern
    componentDidMount() {
        console.log(this.props.data)
        this.setState({id:this.props.data.id})
        // get the author
        // if there is only 1 author, get it directly
        // if there are more than 1 author, get the first one and append "et. al."
        if(this.props.data.authors == null){
            this.setState({author:"Unknown Author"})
        }
        else if(this.props.data.authors.length == 1){
            this.setState({author:this.props.data.authors[0]})
        }
        else{
            let author = this.props.data.authors[0] + " et.al."
            this.setState({author})
        }
        
        // get the title
        if(this.props.data.title == null){
            this.setState({title:"Unknown Title"})
        }
        else{
            this.setState({title:this.props.data.title})
        }

        // get the image url if it has link
        if(this.props.data.imageLinks != null){
            // try to get the small thumbnail first
            if(this.props.data.imageLinks.thumbnail){
                this.setState({imgUrl:this.props.data.imageLinks.thumbnail})
            }
            // if failed, try to get the large thumbnail
            else if(this.props.data.imageLinks.smallThumbnail){
                this.setState({imgUrl:this.props.data.imageLinks.smallThumbnail})

            }
            // if still failed, leave it blank
        }

        // // get the shelf data from App.js
        // if(this.props.data.shelf != null){
        //     this.setState({shelf:this.props.data.shelf})
        // }
        this.setState({shelf:this.props.getShelf(this.props.data)})
       

    }



    
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"  style={{ width: 128, height: 193, backgroundImage: `url("${this.state.imgUrl}")` }}>
                       
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.props.onShelfChanged(this.props.data, event.target.value)}>
                            <option value="none" disabled>Move to...</option>

                            {(this.props.comeFrom == "local") ? 
                                <option value="none">Delete</option> : 
                                <option value="none">None</option>}
                            {
                                this.state.selections.map((key, value) => (
                                    (this.state.shelf == key) ? 
                                        <option value={key} selected > {this.state.selects[value]} </option>
                                      : 
                                        <option value={key}>{this.state.selects[value]}</option>
                                    
                                ))
                                
                            }                  
                            
                        </select>
                    </div>
                </div>
                <Link to={`/book/${this.state.id}`} className="book-title">{this.state.title}</Link>
                <div className="book-authors">{this.state.author}</div>
                

            </div>
        )
    }
}

export default Book;