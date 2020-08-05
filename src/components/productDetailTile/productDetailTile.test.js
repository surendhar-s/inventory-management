import React from 'react';
import { shallow } from 'enzyme';
import ProductDetailTile from './productDetailTile';

describe('ProductDetailTile', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ProductDetailTile />);
    expect(wrapper).toMatchSnapshot();
  });
});
