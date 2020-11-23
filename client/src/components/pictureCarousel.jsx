const {React} = window;

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
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[0]}/>
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[1]}/>
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[2]}/>
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[3]}/>
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[4]}/>
      </Styled.PictureLeft>
    );
  }
}
export default PictureCarousel;

