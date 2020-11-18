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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  // async componentDidMount() {
  //   await $.ajax({

  //   })
  // }

  render() {
    return (
      <div>
        <Title />
        <Style.MainDiv>
          <div>
            <PictureCarousel />
          </div>
          <div>
            <ZoomableMainPic />
          </div>
          <div>
            <Price />
            <div>
              <ReviewScore />
            </div>
            <QuantitySelector />
            <ColorSelector />
          </div>
        </Style.MainDiv>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));