import {mount} from 'enzyme';
import App from './App';
import React from 'react';
import {storeFactory} from './testUtils';

describe('App component', () => {
    const store = storeFactory({});
    let app = mount(<App store={store}/>);

    test("renders without error", () => {
        const component = app.find('.App');
        expect(component.length).toBe(1);
    })

    test("snapshotTesting of App Component", () => {
        expect(app).toMatchSnapshot();
    })
})