import { FETCH_BOOKS , ADD_BOOK , DELETE_BOOK , EDIT_BOOK } from '../actions';

export default function(state = [] , action){
  switch (action.type) {
    case FETCH_BOOKS:
         return  action.payload.data.concat(state);
    case ADD_BOOK:
         action.payload.id  = `${ state.length == 0 ? '1' : +state[state.length-1].id+1 }`;
         return state.concat([action.payload]);
    case DELETE_BOOK:
           return state.filter(  obj =>  {
                 return obj.id != action.payload.data.id;
            });
    case EDIT_BOOK:
              return state.map( book => {
                       if ( book.id == action.payload.id) return action.payload;
                       return book;
                  });
    default:
         return state;
  }
}
