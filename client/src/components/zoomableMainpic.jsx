import React from 'react';

class ZoomableMainPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { mainPhoto } = this.props;
    return (
      <div align='middle'>
        <img height='500px' width='500px' src={mainPhoto} />
      </div>
    );
  }
}

export default ZoomableMainPic;