const {React} = window;

import Styled from '../styledComponents/styles.jsx';

class morePics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  isPhotoDefined() {
    if (this.props.photo !== undefined) {
      return (<img height='150px' width='150px' src={this.props.photo.photoURL} />);
    }
  }

  render() {
    return (
      <div>
        {this.isPhotoDefined()}
      </div>
    );
  }
}

export default morePics;