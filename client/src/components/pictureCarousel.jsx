import React from 'react';
import PictureCarouselEntry from './pictureCarouselEntry.jsx';
import Styled from '../styledComponents/styles.jsx';

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Styled.PictureLeft>
        <PictureCarouselEntry />
        <PictureCarouselEntry />
        <PictureCarouselEntry />
      </Styled.PictureLeft>
    );
  }
}
export default PictureCarousel;

