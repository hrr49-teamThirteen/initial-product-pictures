import Styled from '../styledComponents/styles.jsx';

const { React } = window;

class PictureCarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // isPhotoDefined() {
  //   if (this.props.photo !== undefined) {
  //     return (<img height="110px" width="110px" src={this.props.photo.photourl} onClick={(e) => this.onPhotoClick(this.props.photo.photoURL)} />);
  //   }
  // }

  onPhotoClick() {
    const { photo, setMainPhoto} = this.props;
    console.log('photourl', photo.photourl);
    setMainPhoto(photo.photourl);
  }

  render() {
    const { photo } = this.props;
    return (
      <div>
        <img
          height="110px"
          width="110px"
          src={photo.photourl}
          onClick={this.onPhotoClick.bind(this)}
        />
      </div>

    );
  }
}

export default PictureCarouselEntry;
