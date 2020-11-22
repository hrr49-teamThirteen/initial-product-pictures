import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styledComponents/styles.jsx';
import Title from './components/title.jsx';
import Price from './components/price.jsx';
import ReviewScore from './components/reviewScore.jsx';
import Questions from './components/questions.jsx';
import QuantitySelector from './components/quantitySelector.jsx';
import ColorSelector from './components/colorSelector.jsx';
import PictureCarousel from './components/pictureCarousel.jsx';
import PictureCarouselEntry from './components/pictureCarouselEntry.jsx';
import ZoomableMainPic from './components/zoomableMainpic.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      photos: [],
      photosRed: [],
      photosBlack: [],
      mainPhoto: undefined,
      photoColor: 'black',
      quantity: 1
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/api/products1',
      type: 'GET',
      success: (products) => {
        //console.log('products', products);
        this.setState({products: products});
      }
    });
    $.ajax({
      url: '/api/photos',
      type: 'GET',
      success: (photos) => {
        console.log('Photos', photos);
        let colorRed = [];
        let colorBlack = [];
        for (let photo of photos) {
          if (photo.colorID === 1) {
            colorRed.push(photo);
          } else {
            colorBlack.push(photo);
          }
        }
        console.log('Colorred', colorRed);
        console.log('ColorBlack', colorBlack);
        this.setState({photos: photos, photosRed: colorRed, photosBlack: colorBlack});
      }
    });
  }

  setPhotoColor(photoColor) {
    this.setState({photoColor: photoColor});
  }

  setMainPhoto(mainPhoto) {
    this.setState({mainPhoto: mainPhoto});
  }

  setQuantity(quantity) {
    this.setState({quantity: quantity});
  }

  render() {
    return (
      <div>
        <Title />
        <Style.MainDiv>
          <div>
            <PictureCarousel setMainPhoto={this.setMainPhoto.bind(this)} photos={this.state.photoColor === 'black' ? this.state.photosBlack : this.state.photosRed}/>
          </div>
          <div>
            <ZoomableMainPic mainPhoto={this.state.mainPhoto} />
          </div>
          <div>
            <Price />
            <div>
              <ReviewScore />
            </div>
            <QuantitySelector setQuantity={this.setQuantity.bind(this)}/>
            <ColorSelector setColor={this.setPhotoColor.bind(this)}/>
          </div>
        </Style.MainDiv>
      </div>
    );
  }
}
export default App;