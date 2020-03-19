import * as actions from './';
import { mockStore } from '../testUtils';
import fetchMock from 'fetch-mock-jest';

describe('actions tests', () => {
  test('setLogin function', () => {
    const expectedAction = { type: actions.actionTypes.SET_LOGIN };
    expect(actions.setLogin()).toEqual(expectedAction);
  });
  test('closeModal function', () => {
    const expectedAction = { type: actions.actionTypes.CLOSE_MODAL };
    expect(actions.closeModal()).toEqual(expectedAction);
  });
  test('addToCart function', () => {
    const course = { name: 'test' };
    const expectedAction = {
      type: actions.actionTypes.ADD_TO_CART,
      payload: { name: 'test' }
    };
    expect(actions.addToCart(course)).toEqual(expectedAction);
  });
  test('removeFromCart function', () => {
    const id = 1;
    const expectedAction = {
      type: actions.actionTypes.REMOVE_FROM_CART,
      payload: 1
    };
    expect(actions.removeFromCart(id)).toEqual(expectedAction);
  });

  test('openModal function', async () => {
    const store = mockStore();
    await store.dispatch(actions.openModal({ name: 'xyz' }));
    const actions1 = store.getActions();
    expect(actions1[0]).toEqual({ type: 'OPEN_MODAL' });
    expect(actions1[1]).toEqual({
      type: 'ADD_TO_CART',
      payload: { name: 'xyz' }
    });
  });

  // describe('async operations', () => {
  //   // afterEach(() => {
  //   //   fetchMock.reset();
  //   //   fetchMock.restore();
  //   // });
  //   test('getCourses function', async () => {
  //     const users = [{ name: 'bob' }];
  //     fetchMock.get('courses.json', users);
      

  //   });
  // });
});
