import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../public/app/button';

describe('Button (Snapshot)', () => {
  it('Button renders a native button with given props', () => {
    const component = renderer.create(
      <Button name="testButton" />
    );
    const button = component.toJSON();
    expect(button).toMatchSnapshot();
  });
});

test('Button calls clickHandler on click', () => {
  const clickHandler = jest.fn();
  const buttonComp = mount(
    <Button name="testButton" clickHandler={clickHandler} />
  );
  const button = buttonComp.find('button');
  // expect(button.name).toEqual('testButton');
  button.simulate('click');
  expect(buttonComp.props().clickHandler).toBeCalled();
});
