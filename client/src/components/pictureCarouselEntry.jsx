const {React} = window;
import Styled from '../styledComponents/styles.jsx';

class PictureCarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  isPhotoDefined() {
    if (this.props.photo !== undefined) {
      return (<img height='110px' width='110px' src={this.props.photo.photoURL} onClick={e => this.onPhotoClick(this.props.photo.photoURL)}/>);
    }
  }

  onPhotoClick(photoURL) {
    console.log('photoURL', photoURL)
    this.props.setMainPhoto(photoURL);
  }

  render() {
    return (
      <div>
        {this.isPhotoDefined()}
      </div>
    );
  }
}

export default PictureCarouselEntry;