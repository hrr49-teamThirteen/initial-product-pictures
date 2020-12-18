import React from 'react';
import Styled from '../styledComponents/styles';


class PictureCarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
