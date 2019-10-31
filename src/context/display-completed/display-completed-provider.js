import React from 'react';

export const DisplayCompletedContext = React.createContext();

class DisplayCompletedProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCompleted: props.default || true,
      toggleDisplayCompleted: this.toggleDisplayCompleted,
    };
  }

  toggleDisplayCompleted = () => {
    this.setState(state => state.displayCompleted = !state.displayCompleted);
  }

  render() {
    return (
      <DisplayCompletedContext.Provider value={this.state}>
        {this.props.children}
      </DisplayCompletedContext.Provider>
    );
  }
}

export default DisplayCompletedProvider;
