import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
  height: 80vh;

  span {
    margin: 40px 0 30px 0;
    font-size: 20px;
    font-weight: bold;
    color: #444;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;

    svg {
      margin: 0 7px;
    }

    input {
      height: 36px;
      border: none;

      &::placeholder {
        color: #999;
        text-align: left;
      }

      &::-webkit-search-cancel-button {
        position: relative;
        right: 5px;
        cursor: pointer;
      }
    }
  }

  button {
    background: none;
    border: none;

    .add {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #7d40e7;
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
  }
`;

export const DeliveryTable = styled.table`
  position: relative;

  thead {
    th {
      font-size: 13px;
      color: #444;
      text-align: left;
      padding: 12px;
    }

    .actions {
      text-align: right;
    }
  }

  tbody {
    position: relative;

    tr {
      position: relative;
      font-size: 13px;
      color: #666;
      background: #fff;
    }

    .divisor {
      position: relative;
      background: #f5f5f5;
      height: 10px;
    }

    td {
      position: relative;
      padding: 12px;
    }

    div {
      display: flex;
      align-items: center;

      img {
        width: 25px;
        border-radius: 50%;
        margin-right: 10px;
      }

      span {
        margin: 0;
        font-size: 13px;
        font-weight: normal;
        color: #666;
      }
    }
  }
`;

export const MoreContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    align-items: center;
    padding-bottom: 6px;

    button {
      background: none;
      border: none;

      display: flex;
    }

    svg {
      margin-right: 8px;
    }

    span {
      font-size: 16px;
      color: #999;
    }

    :nth-last-child(-n + 2) {
      padding-top: 6px;
      border-top: 1px solid #eee;
    }

    :nth-last-child(1) {
      padding-bottom: 0;
    }
  }
`;

export const CanceledStatus = styled.div`
  width: 100px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background: #fab0b0;
  border-radius: 12px;

  span {
    width: 8px;
    height: 8px;
    background: #de3b3b;
    border-radius: 50%;
  }

  strong {
    margin-left: 4px;
    font-size: 11px;
    font-weight: bold;
    color: #de3b3b;
  }
`;

export const DeliveredStatus = styled.div`
  width: 100px;
  height: 22px;
  align-items: center;
  justify-content: center;
  background: #dff0df;
  border-radius: 12px;

  span {
    width: 8px;
    height: 8px;
    background: #2ca42b;
    border-radius: 50%;
  }

  strong {
    margin-left: 4px;
    font-size: 11px;
    font-weight: bold;
    color: #2ca42b;
  }
`;

export const WithdrawalStatus = styled.div`
  width: 100px;
  height: 22px;
  align-items: center;
  justify-content: center;
  background: #bad2ff;
  border-radius: 12px;

  span {
    width: 8px;
    height: 8px;
    background: #4d85ee;
    border-radius: 50%;
  }

  strong {
    margin-left: 4px;
    font-size: 11px;
    font-weight: bold;
    color: #4d85ee;
  }
`;

export const PendingStatus = styled.div`
  width: 100px;
  height: 22px;
  align-items: center;
  justify-content: center;
  background: #f0f0df;
  border-radius: 12px;

  span {
    width: 8px;
    height: 8px;
    background: #c1bc35;
    border-radius: 50%;
  }

  strong {
    margin-left: 4px;
    font-size: 11px;
    font-weight: bold;
    color: #c1bc35;
  }
`;

export const Pagination = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  strong {
    color: #333;
    font-size: 12px;
    margin: 0 7px;
  }
`;

export const ButtonPreviousPage = styled.button.attrs(props => ({
  disabled: props.page === 1,
}))`
  margin: 0 7px;
  border: 0;
  border-radius: 2px;
  height: 20px;
  background: none;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ButtonNextPage = styled.button.attrs(props => ({
  disabled: props.limit <= props.page * 6,
}))`
  margin: 0 7px;
  border: 0;
  border-radius: 2px;
  height: 20px;
  background: none;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
