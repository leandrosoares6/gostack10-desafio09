import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #dddddd;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      max-width: 135px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-size: 12px;
      font-weight: bold;
      padding: 0 10px;
      color: #999;
    }

    a.current {
      color: #444;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;

    strong {
      display: block;
      color: #666;
      font-size: 11px;
      font-weight: bold;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50px;
  }
`;

export const SessionContainer = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;

  span {
    font-size: 10px;
    color: #666;
  }

  button {
    margin: 2px 0 0 5px;
    border: none;
    background: none;
  }
`;
