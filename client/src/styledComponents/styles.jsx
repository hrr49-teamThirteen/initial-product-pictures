import Style from 'styled-components';

export default {
  MainDiv:
  Style.div`
    display: flex;
    justify-content: space-between;
    `,
  Title:
  Style.h1`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    `,
  ReviewScore:
  Style.span`
    font-size: 18px;
    `,
  PictureLeft:
  Style.div`
    align: left;
  `,
  Photosize:
  Style.img`
    height: 100px;
    width: 100px;
    `,
  ColorSelectB:
  Style.button`
    background-color: black;
    text: black;
    `,
  ColorSelectR:
  Style.button`
    background-color: red;
    text: red;
    `
};