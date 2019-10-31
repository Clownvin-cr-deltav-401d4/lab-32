import React from 'react';
import renderer from 'react-test-renderer';
import TodoItem from '../../components/todo-item';

describe('<TodoItem />', () => {
  it('can render initially in li with span, button', () => {
    let app = shallow(<TodoItem item={({id: 0, text: 'Test', complete: false})} delete={()=>{}} toggleComplete={()=>{}} />);
    expect(app.find('li span').exists()).toBe(true);
    expect(app.find('li button').exists()).toBe(true);
  });

  it('can change completion status by click on span', () => {
    let toggled = false;
    let toggleComplete = () => {
      toggled = true;
    };
    let app = shallow(<TodoItem item={({id: 0, text: 'Test', complete: false})} delete={()=>{}} toggleComplete={toggleComplete} />);
    let span = app.find('li span');
    span.simulate('click', {preventDefault: () =>{}});
    expect(toggled).toBeTruthy();
  });

  it('can change "delete" item by click button', () => {
    let deleted = false;
    let deleteItem = () => {
      deleted = true;
    };
    let app = shallow(<TodoItem item={({id: 0, text: 'Test', complete: false})} deleteItem={deleteItem} toggleComplete={()=>{}} />);
    let button = app.find('li button.delete');
    button.simulate('click', {preventDefault: () =>{}});
    expect(deleted).toBeTruthy();
  });

  // it('renders consistently', () => {
  //   const tree = renderer.create(<TodoItem item={({id: 0, text: 'Test', complete: false})} delete={()=>{}} toggleComplete={()=>{}}/>).toJSON();
  //   // console.log(tree);
  //   expect(tree).toMatchSnapshot();
  // });
});
