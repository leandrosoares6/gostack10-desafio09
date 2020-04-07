import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  img {
    max-width: 260;
    padding: 60px 30px 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 30px;

    div {
      display: flex;
      flex-direction: column;

      strong {
        display: block;
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        color: #444444;
        margin: 10px 0;
      }

      input {
        background: #fff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        margin: 0 0 10px;

        &::placeholder {
          color: #999999;
        }
      }

      span {
        color: #fb6f91;
        align-self: flex-start;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }

    button {
      margin: 5px 0 30px;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#7D40E7')};
      }
    }
  }
`;
