const {React} = window;
import StyledComponents from '../styledComponents/styles.jsx';

class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
  }

  arePropsDefined() {
    if (this.props.reviewScore[0] !== undefined) {
      return (
        <StyledComponents.ReviewScore>
          {this.props.reviewScore[0].reviewscore} || {this.props.reviewScore[0].questions} Questions
        </StyledComponents.ReviewScore>
      );
    }
  }
  render() {
    return (
      <div>
        {this.arePropsDefined()}
      </div>
    );
  }
}


export default ReviewScore;