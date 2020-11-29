const {React} = window;
import StyledComponents from '../styledComponents/styles.jsx';

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  isTitleDefined() {
    if (this.props.title[0] !== undefined) {
      return (<StyledComponents.Title>{this.props.title[0].title}</StyledComponents.Title>);
    }
  }

  render() {
    return (
      <div>
        {this.isTitleDefined()}
      </div>
    );
  }

}


export default Title;
