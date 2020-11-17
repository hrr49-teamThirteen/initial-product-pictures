import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title.jsx';
import Price from './components/price.jsx';
import ReviewScore from './components/reviewScore.jsx';
import Questions from './components/questions.jsx';
import QuantitySelector from './components/quantitySelector.jsx';
import ColorSelector from './components/colorSelector.jsx';
import PictureCarousel from './components/pictureCarousel.jsx';
import PictureCarouselEntry from './components/pictureCarouselEntry.jsx';


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
        <Price />
        <div>
          <ReviewScore />
          <span>
            <Questions />
            <QuantitySelector />
          </span>
          <div>
            <ColorSelector />
            <div>
              <PictureCarousel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));