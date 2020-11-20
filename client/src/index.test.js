require('babel-polyfill');
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
//import adapter from 'enzyme-adpater-react-16';
import App from './app.jsx';
import Styled from './styledComponents/styles.jsx';

describe('Testing Client', () => {
  it('Should render the app initially', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });

  it('Should Test other Title is in html', () => {
    const app = shallow(<App />);
    //console.log('app.html', app.html());
    expect(app.html().includes('Keurig K-Classic Single-Serve K-Cup Pod Coffee Maker - K50')).toBe(true);
  });

  it('Should Test state is initializing properly for starting color', () => {
    const app = shallow(<App />);
    console.log('app.html', app.state());
    expect(app.state().photoColor).toBe('black');
  });

  it('Should Test InitialQuantity is rendering properly', () => {
    const app = shallow(<App />);
    console.log('app.html', app.state());
    expect(app.state().quantity).toBe(1);
  });

  it('Should Test that the container for photos is rendering properly', () => {
    const app = shallow(<App />);
    console.log('app.html', app.state());
    expect(Array.isArray(app.state().photos)).toBe(true);
  });
});

