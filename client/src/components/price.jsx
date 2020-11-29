const {React} = window;

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  priceDefined() {
    if (this.props.price[0] !== undefined) {
      return (
        <a>{this.props.price[0].price}</a>

      );
    }
  }
  render() {
    return (
      <div align='right'>
        ${this.priceDefined()}.00
      </div>

    );
  }
}


export default Price;