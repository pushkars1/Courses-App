export const actionTypes = {
  SET_COURSES: 'SET_COURSES',
  SET_LOGIN: 'SET_LOGIN',
  CLOSE_MODAL: 'CLOSE_MODAL',
  OPEN_MODAL: 'OPEN_MODAL',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART' 
};

export const getCourses = () => {
  return dispatch => {
    fetch('courses.json')
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: actionTypes.SET_COURSES,
          payload: response[0].lessons
        });
      });
  };
};

export const setLogin = () => {
  return {
    type: actionTypes.SET_LOGIN
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  };
};

export const openModal = course => {
  return dispatch => {
    dispatch({ type: actionTypes.OPEN_MODAL });
    dispatch(addToCart(course));
  };
};

export const addToCart = course => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: course
  };
};

export const removeFromCart = id => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    }
}