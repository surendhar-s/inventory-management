import React from 'react';
import { shallow } from 'enzyme';
import AddOrEditProduct from './addOrEditProduct';

describe('AddOrEditProduct', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<AddOrEditProduct />);
    expect(wrapper).toMatchSnapshot();
  });
});
