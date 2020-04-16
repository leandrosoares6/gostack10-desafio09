import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
  height: 80vh;
  /* height: auto !important;
  min-height: 80vh; */

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

export const DeliverymenTable = styled.table`
  position: relative;

  thead th {
    font-size: 13px;
    color: #444;
    text-align: left;
    padding: 12px;
  }

  thead th.actions {
    text-align: center;
  }

  tbody {
    position: relative;
  }

  tbody tr {
    position: relative;
    font-size: 13px;
    color: #666;
    background: #fff;
  }

  tbody tr.divisor {
    position: relative;
    background: #f5f5f5;
    height: 10px;
  }

  tbody td {
    position: relative;
    padding: 12px;
  }

  tbody td.actions {
    position: relative;
    text-align: center;
  }

  tbody img {
    width: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const DeliveryOptions = styled.div`
  position: absolute;
  width: 130px;
  left: calc(50% - 65px);
  top: calc(100% + 30px);
  background: #fff;
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
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
