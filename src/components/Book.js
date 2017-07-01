import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Book extends Component {
    static PropTypes={
        data: PropTypes.object.isRequired

    }

    // this acts like a bridge from book object to actual rendering the book
    state={
        imgUrl: '',
        title: '',
        author: ''

    }

    // This acts like a View Model in MVVM design pattern
    componentDidMount() {
        console.log(this.props.data)
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
            if(this.props.data.imageLinks.smallThumbnail){
                this.setState({imgUrl:this.props.data.imageLinks.smallThumbnail})
            }
            // if failed, try to get the large thumbnail
            else if(this.props.data.imageLinks.thumbnail){
                this.setState({imgUrl:this.props.data.imageLinks.thumbnail})

            }
            // if still failed, leave it blank
        }

    }


    
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.state.imgUrl}")` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.title}</div>
                <div className="book-authors">{this.state.author}</div>
            </div>
        )
    }
}

export default Book;