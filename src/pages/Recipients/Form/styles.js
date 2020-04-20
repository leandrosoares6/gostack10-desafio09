import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 30px;
    border-radius: 4px;

    .input {
      padding-top: 20px;
      margin: 0 10px;
      display: flex;
      flex-direction: column;

      span {
        padding-bottom: 10px;
        font-size: 13px;
        font-weight: bold;
        color: #444;
      }

      input {
        padding-left: 10px;
        border: 1px solid #ddd;
        height: 40px;
        border-radius: 4px;
      }
    }

    .content1 {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
    }

    .content2 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 100%;
    }
  }
`;

export const HeaderItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 30px 0;

  span {
    font-size: 20px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    align-items: center;

    button {
      margin: 0 5px;
      align-items: center;
      justify-content: center;
      background: #ccc;
      border: none;
      border-radius: 4px;
      height: 36px;

      svg {
        margin-left: 7px;
      }

      span {
        margin: 0 10px 0 5px;
        text-align: center;
        font-size: 11px;
        font-weight: bold;
        color: #fff;
      }
    }

    .save {
      background: #7d40e7;
    }
  }
`;
