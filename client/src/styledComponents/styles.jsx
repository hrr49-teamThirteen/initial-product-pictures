import styled from 'styled-components';

export default {
  MainDiv:
  styled.div`
    display: flex;
    justify-content: center;
    padding: 0px 20px;

    `,
  Title:
  styled.h1`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    font-family: 'Helvetica';
    `,
  ReviewScore:
  styled.span`
    font-size: 18px;
    `,
  PictureLeft:
  styled.div`
    align: left;
    padding-right: 20px;
  `,
  Photosize:
  styled.img`
    height: 100px;
    width: 100px;
    `,
  ColorSelectB:
  styled.button`
    background-color: black;
    text: black;
    `,
  ColorSelectR:
  styled.button`
    background-color: red;
    text: red;
    `,
  RightPanel:
  styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Helvetica';
  `,
  Header:
  styled.div`
  background-color: rgb(204, 0, 0);
  height: 60px;
  margin-top: -25px;
  margin-left: -25px;
  width: calc(100% + 33px);

  `,
  PictureCarouselStyle:
  styled.img`
    height:"110px";
    width:"110px";
  `,

};
