const { React } = window;

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  // priceDefined() {
  //   if (this.props.price[0] !== undefined) {
  //     return (
  //       <a>{this.props.price[0].price}</a>

  //     );
  //   }
  // }
  render() {
    const { price } = this.props;

    return (
      <div align='right'>
        {/* ${this.priceDefined()}.00 */}
        <a>price: {price}</a>
      </div>

    );
  }
}


export default Price;