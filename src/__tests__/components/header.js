import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../components/header';

describe('<Header />', () => {
  it('can render initially in header.h2', () => {
    let app = shallow(<Header />);
    expect(app.find('header h2').exists()).toBe(true);
  });

  it('can change the todo count by passing props', () => {

    let app = shallow(<Header count={20} />);
    let h2 = app.find('header h2').get(0);
    //Assert
    expect(h2.props.children[1]).toBe(20);
  });

  // it('renders consistently', () => {
  //   const tree = renderer.create(<Header />).toJSON();
  //   // console.log(tree);
  //   expect(tree).toMatchSnapshot();
  // });
});
