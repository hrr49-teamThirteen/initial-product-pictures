import React from 'react';
import PictureCarouselEntry from './pictureCarouselEntry';
import Styled from '../styledComponents/styles';

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { setMainPhoto, photos } = this.props;
    console.log(photos);
    return (
      <Styled.PictureLeft>
        {photos.map((p) => (
          <PictureCarouselEntry key={p} setMainPhoto={setMainPhoto} photo={p} />
        ))}
      </Styled.PictureLeft>
    );
  }
}
export default PictureCarousel;
