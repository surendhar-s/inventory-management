import React from 'react';
import { shallow } from 'enzyme';
import ListAllProducts from './listAllProducts';

describe('ListAllProducts', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ListAllProducts />);
    expect(wrapper).toMatchSnapshot();
  });
});
