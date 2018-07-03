import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import BooksShow from './components/books_show';
import BookNew from './components/book_new';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
        <div>
          <div className="header">
                <img src="http://www.cornwallpubliclibrary.org/wp-content/uploads/2014/04/Cornwall-Public-Library-Kids-Teens-Header.jpg" />
          </div>
          <div className="new-book-btn">
              <BookNew title='New Book' type='Add' />
          </div>
           <BooksShow />
      </div>
  </Provider>
  , document.querySelector('.container'));
