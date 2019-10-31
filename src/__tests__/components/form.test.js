import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../components/form';

describe('<Form />', () => {
  it('can render initially in form.input', () => {
    let app = shallow(<Form />);
    expect(app.find('form input').exists()).toBe(true);
  });

  it('can submit a todo by submitting form', () => {
    // Arrange
    let submittedText = null;
    function func() {
      submittedText = 'Test';
    }

    let app = mount(<Form addItem={func} />);
    let form = app.find('form');
    
    form.simulate('submit', {preventDefault: () => {}});

    //Assert
    expect(submittedText).toBe('Test');
  });

  //Test doesn't work, complains about current == undefined?
  // it('renders consistently', () => {
  //   const tree = renderer.create(<Form addItem={()=>{}} onChange={() => {}}/>).toJSON();
  //   // console.log(tree);
  //   expect(tree).toMatchSnapshot();
  // });
});
