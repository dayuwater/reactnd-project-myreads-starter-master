// perhaps only 1 step backend functions can be put into a separate file

const api = "https://reactnd-books-api.udacity.com"
// let's pretend this is in the backend server
export const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 
'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 
'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 
'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 
'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 
'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 
'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 
'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 
'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 
'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 
'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 
'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 
'Virtual Reality', 'Web Development', 'iOS']


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)





