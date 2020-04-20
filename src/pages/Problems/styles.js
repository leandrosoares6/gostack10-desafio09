import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
  height: 80vh;

  > span {
    margin: 40px 0 30px 0;
    font-size: 20px;
    font-weight: bold;
    color: #444;
  }
`;

export const ProblemTable = styled.table`
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

    .actions {
      position: relative;
      text-align: center;
    }

    img {
      width: 25px;
      border-radius: 50%;
      margin-right: 10px;
    }
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

export const MoreContainer = styled.div`
  padding: 10px;

  > div {
    display: flex;
    align-items: center;

    button {
      background: none;
      border: none;

      display: flex;
    }

    svg {
      margin-right: 8px;
    }

    span {
      font-size: 14px;
      color: #999;
    }
  }

  > div:first-child {
    padding-bottom: 9px;
  }

  div:nth-last-child(1) {
    padding-top: 9px;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  strong {
    color: #444;
    font-size: 14px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 26px;
  }
`;
