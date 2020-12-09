import PictureCarouselEntry from './pictureCarouselEntry.jsx';
import Styled from '../styledComponents/styles.jsx';

const { React } = window;

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
        {photos.map((p, i) => (
          <PictureCarouselEntry key={i} setMainPhoto={setMainPhoto} photo={p} />
        ))}

        {/* //
        {' '}
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[0]} />
        //
        {' '}
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[1]} />
        //
        {' '}
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[2]} />
        //
        {' '}
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[3]} />
        //
        {' '}
        <PictureCarouselEntry setMainPhoto={this.props.setMainPhoto} photo={this.props.photos[4]} /> */}
      </Styled.PictureLeft>
    );
  }
}
export default PictureCarousel;
