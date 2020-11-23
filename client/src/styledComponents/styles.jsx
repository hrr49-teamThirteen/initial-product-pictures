const {styled} = window;

export default {
  MainDiv:
  styled.div`
    display: flex;
    justify-content: space-between;
    `,
  Title:
  styled.h1`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    `,
  ReviewScore:
  styled.span`
    font-size: 18px;
    `,
  PictureLeft:
  styled.div`
    align: left;
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
    `
};