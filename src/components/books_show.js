import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import BookDelete from './book_delete';
import BookNew from './book_new';


class BooksShow extends Component{

  componentDidMount(){
     this.props.fetchBooks();
  }


    cellButton(cell, row, enumObject, rowIndex) {
      return (
        <div className='edit-del-btn'>
          <div className='edit'>
            <BookNew book={row} title='Edit' type='Edit' />
          </div>
        <div className='delete'>
            <BookDelete book={row}/>
        </div>
        </div>
      )
   }


  render(){
     return(
           <div>
            <BootstrapTable data={this.props.books} striped hover  condensed >
               <TableHeaderColumn isKey dataField='id' >Product ID</TableHeaderColumn>
               <TableHeaderColumn dataField='bookTitle' >Book Title</TableHeaderColumn>
               <TableHeaderColumn dataField='authorName' >Author Name</TableHeaderColumn>
               <TableHeaderColumn dataField='publishedDate' >Published Date</TableHeaderColumn>
               <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} />
            </BootstrapTable>
          </div>
     );
  }
}

function mapStateToProps(state){
   return {books:state.books};
}

export default connect(mapStateToProps,{fetchBooks})(BooksShow);
