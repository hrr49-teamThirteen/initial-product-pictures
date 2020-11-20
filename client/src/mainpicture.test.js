require('babel-polyfill');
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
//import adapter from 'enzyme-adpater-react-16';
import Mainpic from './components/zoomableMainpic.jsx';
import Styled from './styledComponents/styles.jsx';


describe('Testing for Main Pic to be rendering properly', () => {
  it('Should render the app initially', () => {
    const mainpic = shallow(<Mainpic />);
    expect(mainpic).toMatchSnapshot();
  });
});