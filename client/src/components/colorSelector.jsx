const {React} = window;
import Style from '../styledComponents/styles.jsx';

class ColorSeclector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  setPhotoColorRed() {
    this.props.setColor('red');
  }
  setPhotoColorBlack() {
    this.props.setColor('black');
  }


  render() {
    return (
      <div align='right'>
        <Style.ColorSelectB onClick={this.setPhotoColorBlack.bind(this)}>X</Style.ColorSelectB>
        <Style.ColorSelectR onClick={this.setPhotoColorRed.bind(this)}>X</Style.ColorSelectR>
      </div>
    );
  }
}

export default ColorSeclector;