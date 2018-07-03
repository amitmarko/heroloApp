import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { deleteBook } from '../actions';
import { Modal , Button} from 'react-bootstrap';

class BookDelete extends Component{

  constructor(props) {
      super(props);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        show: false,
      };
    }

    handleClose() {
        this.setState({ show: false });
      }

    handleShow() {
        this.setState({ show: true });
    }


   deleteBook(){
     console.log(this.props.book.id);
     this.props.deleteBook(this.props.book.id);
     this.handleClose();
   }

  render(){
    return(
      <div>
      <button type="button" className="btn btn-danger btn-sm btn-block" onClick={this.handleShow}>Delete</button>
      <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                  <Modal.Title>Delete Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 <div>
                    <h6>You are going to delete the book: <br /> <span className="del-book-title"> {this.props.book.bookTitle} </span> </h6>
                 </div>
            </Modal.Body>
            <Modal.Footer>
                  <div className="delete-btns">
                  <Button type="submit" bsStyle="success" bsSize="sm" id='btn-ok' onClick={this.deleteBook.bind(this)}>Ok</Button>
                  <Button bsSize="sm" onClick={this.handleClose} id='btn-can'>Close</Button>
                  </div>
            </Modal.Footer>
         </Modal>
      </div>
    );
  }
}

export default connect(null,{deleteBook})(BookDelete);
