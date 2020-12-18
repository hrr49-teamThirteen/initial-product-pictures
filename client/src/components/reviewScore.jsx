import React from 'react';
import StyledComponents from '../styledComponents/styles';

class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reviewScore} = this.props;
    return (
      <div>
        <StyledComponents.ReviewScore>
          {/* {this.props.reviewScore[0].reviewscore} || {this.props.reviewScore[0].questions} Questions */}
          Average Review Score : {reviewScore}
        </StyledComponents.ReviewScore>
        {/* {this.arePropsDefined()} */}
      </div>
    );
  }
}

export default ReviewScore;