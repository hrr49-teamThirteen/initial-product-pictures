const {React} = window;

class ZoomableMainPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // isMainDefined() {
  //   if (this.props.mainPhoto === undefined) {
  //     return (<img height='600px' width='600px' src="https://images.ctfassets.net/yr4qj72ki4ky/5gltqdfqQSQj1K9DPVMYWf/8e1ca3d632a440be80270f4952a878d0/hrhq-avatar.png" />);
  //   } else {
  //     return (<img height='500px' width='500px' src={this.props.mainPhoto} />);
  //   }
  // }

  render() {
    const { mainPhoto } = this.props;
    console.log('main photo', mainPhoto);
    return (
      <div align='middle'>
        {/* {this.isMainDefined()} */}
        <img height='500px' width='500px' src={mainPhoto} />
      </div>
    );
  }
}

export default ZoomableMainPic;