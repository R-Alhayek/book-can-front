import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Card } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookModalForm from './components/BookModalForm';
import { Button } from 'react-bootstrap';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showModal: false,
      userEmail: '',
      server: process.env.REACT_APP_SERVER_URL,
      index: 0,
      bookName: '',
      bookDescription: '',
      bookStatus: '',
      bookImg: ''

    }
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;

    await this.setState({
      userEmail: `${user.email}`
    })

    //http://localhost:3003/books?userEmail=rafeefalhayek94@outlook.com
    let url = `http://localhost:3003/books?userEmail=${user.email}`

    let resData = await axios.get(url);
    await this.setState({
      bookData: resData.data
    })
  }

  addBook = async (event) => {
    event.preventDefault();

    const bookFormData = {
      userEmail: this.state.userEmail,
      bookName: event.target.bookName.value,
      bookDescription: event.target.bookDescription.value,
      bookStatus: event.target.bookStatus.value,
      bookImg: event.target.bookImg.value
    }

    let result = await axios.post(`${this.state.server}/addbook`, bookFormData)

    this.setState({
      bookData: result.data
    })

  }

  deleteBook = async (index) => {
    let paramsObj = {
      userEmail: this.state.userEmail
    }

    let deletedBook = await axios.delete(`${this.state.server}/deletebook/${index}`, { params: paramsObj })

    this.setState({
      bookData: deletedBook.data

    })
  }

  showModalHandler = () => {
    this.setState({
      showModal: true
    })
  }

  closeModalHandler = () => {
    this.setState({
      showModal: false
    })
  }













  render() {
    return (
      <div>

        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>


          {this.state.bookData.length && this.state.bookData.map((item, idx => {
            return (
              <card key={idx}>
                <Card.Body>Name: {item.name}</Card.Body>
                <Card.Body>Description: {item.description}</Card.Body>
                <Card.Body>Status: {item.status}</Card.Body>
                <img src={item.img} style={{ width: '200px', marginLeft: '500px' }}></img>

                <Button onClick={() => this.deletedBook(idx)}>Delete Book</Button>
              </card>
            )
          }),




            <div>

              <Button onClick={this.showModalHandler} variant="primary" type="submit" onClick={this.props.onHide}>Add Book</Button>
              <BookModalForm addBook={this.addBook} show={this.state.showModal} onHide={this.closeModalHandler} />
            </div>

    
     </Jumbotron>
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);