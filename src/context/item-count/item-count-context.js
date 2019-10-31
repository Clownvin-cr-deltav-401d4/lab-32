import React from 'react';

export const ItemCountContext = React.createContext();

class ItemCountProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.default || 5,
      setCount: this.setCount,
    };
  }

  setCount = (count) => {
    this.setState({count});
  }

  render() {
    return (
      <ItemCountContext.Provider value={this.state}>
        {this.props.children}
      </ItemCountContext.Provider>
    );
  }
}

export default ItemCountProvider;
