import React from 'react';
import axios from 'axios';
import Style from './styledComponents/styles';
import Title from './components/title';
import Price from './components/price';
import ReviewScore from './components/reviewScore';
import Questions from './components/questions';
import QuantitySelector from './components/quantitySelector';
import ColorSelector from './components/colorSelector';
import PictureCarousel from './components/pictureCarousel';
import PictureCarouselEntry from './components/pictureCarouselEntry';
import ZoomableMainPic from './components/zoomableMainpic';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      mainPhoto: undefined,
      quantity: 1,
      mainProductId: 9999994,
      avgReviewScore: 0,
      product: undefined,
    };

    this.getProducts = this.getProducts.bind(this);
    this.setMainPhoto = this.setMainPhoto.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getData();
  }

  handleIdChange(e) {
    e.preventDefault();
    this.setState({ mainProductId: e.target.value });
  }

  getData() {
    let prod;
    let avgRev;
    this.getProducts()
      .then((res) => {
        prod = res.data;
        return this.getAvgReview();
      })
      .then((res) => {
        avgRev = res.data.averagerating;
        return this.getPhotos();
      })
      .then((res) => {
        this.setState({
          avgReviewScore: avgRev,
          photos: res.data,
          mainPhoto: res.data[0].photourl,
          product: prod,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getAvgReview() {
    const { mainProductId } = this.state;
    return axios.get(`/api/initial/products/avgrating/id=${mainProductId}`);
  }

  getPhotos() {
    const { mainProductId } = this.state;
    return axios.get(`/api/initial/photos/forproductid/id=${mainProductId}`);
  }

  getProducts() {
    const { mainProductId } = this.state;
    return axios.get(`/api/initial/products/id=${mainProductId}`);
  }

  setPhotoColor(photoColor) {
    this.setState({ photoColor });
  }

  setMainPhoto(mainPhoto) {
    this.setState({ mainPhoto });
  }

  setQuantity(quantity) {
    this.setState({ quantity });
  }

  render() {
    const {
      mainPhoto,
      photos,
      product,
      avgReviewScore,
      mainProductId,
    } = this.state;
    return (
      <div>
        <Style.Header />
        <Title title={product ? product.title : ''} />
        <Style.MainDiv>
          <div>
            <PictureCarousel setMainPhoto={this.setMainPhoto} photos={photos} />
          </div>
          <div>
            { mainPhoto ? <ZoomableMainPic mainPhoto={mainPhoto} /> : null}
          </div>
          <Style.RightPanel>
            <Price price={product ? product.price : 0} />
            <ReviewScore reviewScore={avgReviewScore} />
            <QuantitySelector setQuantity={this.setQuantity} />
          </Style.RightPanel>
        </Style.MainDiv>
        <form onSubmit={this.handleSubmit}>
          productId:
          <input type="text" value={mainProductId} onChange={this.handleIdChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default App;
