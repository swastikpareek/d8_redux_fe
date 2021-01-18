
const initialState = {
  "user": {},
  "loading": true,
  "listItems": [],
  "showAddFormPopup": false
};

const ListReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_ITEMS':
      return {
        ...state,
        listItems: action.listItems
      }
    case 'UPDATE_LOADING':
       return {
         ...state,
         loading: action.loading
       }
    case 'TOGGLE_FORM':
      return {
        ...state,
        showAddFormPopup: action.val
      }
    case 'ADD_ITEM':
      return{
        ...state,
        listItems: state.listItems.concat(action.val)
      }
    case 'ADD_USER':
      return{
        ...state,
        user: action.user
      }

     default:
       return state;
  }
}


export default ListReducer;
