export const setListData = (listItems) => {
  return {
     type: 'UPDATE_ITEMS',
     listItems
  }
}

export const setLoadingState = (loading) => {
  return {
     type: 'UPDATE_LOADING',
     loading
  }
}

export const toggleFormState = (val) => {
  return {
     type: 'TOGGLE_FORM',
     val
  }
}

export const addToListData = (val) => {
  return {
     type: 'ADD_ITEM',
     val
  }
}
