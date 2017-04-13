import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Send from '../public/send/send';

describe('Send (Snapshot)', () => {
  it('Send renders new transaction page', () => {
    const component = renderer.create(<Send />);
    const send = component.toJSON();
    expect(send).toMatchSnapshot();
  });
});

xdescribe('Send', () => {
  let send;
  beforeEach(() => {
    send = mount(<Send />);
  });

  it('Input change calls changeHandler', () => {
    const textInput = send.find('TextInput').first();
    const form = textInput.find('input').first();
    form.simulate('change', { target: { value: 'z@s.com' } });
    send.update();
    const value = textInput.props().value;
    expect(value).toEqual('z@s.com');
  });
});
