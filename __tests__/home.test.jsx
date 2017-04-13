import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Home from '../public/home/home';

describe('Home (Snapshot)', () => {
  it('Home renders home page', () => {
    const component = renderer.create(<Home />);
    const home = component.toJSON();
    expect(home).toMatchSnapshot();
  });
});

describe('Home', () => {
  let home;
  let history;
  beforeEach(() => {
    history = [];
    home = mount(<Home history={history} />);
  });

  xit('Button click calls clickHandler', () => {
    const button = home.find('button').first();
    button.simulate('click');
    expect(home.clickHandler).toExist();
  });
});
