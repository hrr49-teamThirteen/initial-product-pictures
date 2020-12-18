import React from 'react';
import StyledComponents from '../styledComponents/styles';

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
        <StyledComponents.Title>{title}</StyledComponents.Title>
    );
  }

}

export default Title;
