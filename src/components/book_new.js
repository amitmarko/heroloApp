import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addBook , editBook} from '../actions';
import { Modal , Button} from 'react-bootstrap';
import { SubmissionError } from 'redux-form'

class BookNew extends Component{

  constructor(props, context) {
      super(props, context);
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

  renderField(field){
    const { meta: { touched , error }  } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;
    const type = `${ field.label == 'Published Date' ?  'date' :  'text'}`;
    return(
      <div className={className} >
       <label>{field.label}</label>
        <input className="form-control" type={type} {...field.input} />
        <div className="text-help">
        { touched ? error : ''}
        </div>
      </div>
    );
  }



onSubmit(values){
    values=this.foramtValues(values);
    this.validate(values);
    if ( this.props.type == 'Edit'){
      values.id = this.props.book.id;
      this.props.editBook(values);
    } else this.props.addBook(values);
    this.closeModal();
  }

 foramtValues(values){
   values.publishedDate = this.formatDate(values.publishedDate);
   values.bookTitle = this.formatTitle(values.bookTitle);
   values.authorName = this.formatTitle(values.authorName);
   return values;
 }

  formatDate(date){
    date = date.split("-");
    return date[2]+"-"+date[1]+"-"+date[0];
  }

  formatTitle(str){
    return str.replace(/\W/g, ' ').replace(/^\s+|\s+$/g, "").split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }

  validate(values){
    const bookTitleMsg = `${ !values.bookTitle  ? 'Enter a book title please!' : '' }`;
    const authorNameMsg = `${ !values.authorName  ? 'Enter a author name please!' : '' }`;
    const publishedDateMsg = `${ values.publishedDate == 'undefined-undefined-' ||  values.publishedDate == '-undefined-undefined' ? 'Enter a published date please!' : '' }`;
    if(bookTitleMsg != '' || authorNameMsg != '' || publishedDateMsg != '' )
       throw new SubmissionError({ bookTitle: bookTitleMsg , authorName:authorNameMsg, publishedDate:publishedDateMsg });
     if ( this.props.type == 'Edit' && values.bookTitle == this.props.book.bookTitle ) return;
    this.props.books.map( book =>{
         if ( book.bookTitle == values.bookTitle )
          throw new SubmissionError({ bookTitle: 'The book title is already exist!' });
     });
  }

closeModal(){
  this.props.destroy();
  this.handleClose();
}

openModal(){
  if ( this.props.type == 'Edit')
          this.props.initialize({ bookTitle: this.props.book.bookTitle , authorName: this.props.book.authorName ,  publishedDate: this.formatDate(this.props.book.publishedDate)});
   else   this.props.initialize({ bookTitle: '' , authorName: '' ,  publishedDate: '' });
  this.handleShow();
}

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
      <button type="button" className="btn btn-primary btn-sm btn-block" onClick={this.openModal.bind(this)}>{this.props.title}</button>
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
             <Modal.Title>{this.props.type} Book</Modal.Title>
          </Modal.Header>
         <Modal.Body>
         <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='form-new'>
            <Field label="Book Title" name="bookTitle" component={this.renderField} />
            <Field label="Author Name" name="authorName" component={this.renderField} />
            <Field label="Published Date" name="publishedDate" component={this.renderField} />
            <Modal.Footer>
            <Button type="submit" bsStyle="success" bsSize="sm" id='btn-ok'>{this.props.type}</Button>
            <Button bsSize="sm" onClick={this.closeModal.bind(this)} id='btn-can'>Close</Button>
            </Modal.Footer>
         </form>
         </Modal.Body>
         </Modal>
      </div>
    );
  }
}

function mapStateToProps(state){
   return {books:state.books};
}


export default reduxForm({
  form:'BookNewFrom',
})(
  connect(mapStateToProps,{addBook,editBook})(BookNew)
);
