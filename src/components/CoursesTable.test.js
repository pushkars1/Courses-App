import CoursesTable from './CoursesTable';
import {mount} from 'enzyme';
import React from 'react';
import {storeFactory} from '../testUtils';

const store = storeFactory({});
const wrapper = mount(<CoursesTable store={store}/>);

test("snapshot testing", () => {
    expect(wrapper).toMatchSnapshot();
})