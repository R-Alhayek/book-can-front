import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';



class BookModalForm extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <div>
                {isAuthenticated &&
                    <>
                        <Modal show={this.props.show}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Your Favorite Book Here..</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form onSubmit={this.props.addBook}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Book Name" name="bookName" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Book Description" name="bookDescription" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Book Status" name="bookStatus" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="link" placeholder="Book Image" name="bookImg" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >Save</Button>
                                </Form>

                                <Button variant="primary" type="submit" onClick={this.props.onHide}>Close</Button>

                            </Modal.Body>

                        </Modal>



                    </>

                } </div>
        );
    }
}

export default withAuth0(BookModalForm);