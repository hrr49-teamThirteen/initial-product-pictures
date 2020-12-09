import $ from 'jquery';
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
import axios from 'axios'

const { React } = window;
const { ReactDOM } = window;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      mainPhoto: undefined,
      quantity: 1,
      mainProductId: 9999997,
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
    return axios.get(`/api/products/avgrating/id=${mainProductId}`);
  }

  getPhotos() {
    const { mainProductId } = this.state;
    return axios.get(`/api/photos/forproductid/id=${mainProductId}`);
  }

  getProducts() {
    const { mainProductId } = this.state;
    return axios.get(`/api/products/id=${mainProductId}`);
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
        <Style.HeaderStuff />
        <Title title={product ? product.title : ''} />
        <Style.MainDiv>
          <div>
            <PictureCarousel setMainPhoto={this.setMainPhoto} photos={photos} />
          </div>
          <div>
            { mainPhoto ? <ZoomableMainPic mainPhoto={mainPhoto} /> : null}
          </div>
          <Style.RightSideStuff>
            <Price price={product ? product.price : 0} />
            <ReviewScore reviewScore={avgReviewScore} />
            <QuantitySelector setQuantity={this.setQuantity} />
          </Style.RightSideStuff>
        </Style.MainDiv>
        <form onSubmit={this.handleSubmit}>
          <label>
            productId:
            <input type="text" value={mainProductId} onChange={this.handleIdChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default App;
