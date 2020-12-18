import React from 'react';
import Style from '../styledComponents/styles';

class ColorSeclector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.setPhotoColorBlack = this.setPhotoColorBlack.bind(this);
    this.setPhotoColorRed = this.setPhotoColorRed.bind(this);
  }

  setPhotoColorRed() {
    const { setColor } = this.props;
    setColor('red');
  }

  setPhotoColorBlack() {
    const { setColor } = this.props;
    setColor('black');
  }

  render() {
    return (
      <div align="right">
        <Style.ColorSelectB onClick={this.setPhotoColorBlack}>X</Style.ColorSelectB>
        <Style.ColorSelectR onClick={this.setPhotoColorRed}>X</Style.ColorSelectR>
      </div>
    );
  }
}

export default ColorSeclector;
