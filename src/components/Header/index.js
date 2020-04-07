import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MdExitToApp } from 'react-icons/md';
import { signOut } from '~/store/modules/auth/actions';

import Notifications from '~/components/Notifications';
import logo from '~/assets/fastfeet-logo.png';
import {
  Container,
  Content,
  Profile,
  SessionContainer,
} from '~/components/Header/styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="FastFeet" />
          </Link>
          <NavLink to="/deliveries" activeClassName="current">
            ENCOMENDAS
          </NavLink>
          <NavLink to="/deliverymen" activeClassName="current">
            ENTREGADORES{' '}
          </NavLink>
          <NavLink to="/recipients" activeClassName="current">
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problems" activeClassName="current">
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{profile.name}</strong>
              {/* <Link to="/profile">Meu perfil</Link> */}
              <SessionContainer>
                <span>Encerrar sessão</span>
                <button type="button">
                  <MdExitToApp onClick={handleSignOut} size={15} color="666" />
                </button>
              </SessionContainer>
            </div>
            {/* <img
              src={
                profile.avatar?.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={profile.name}
            /> */}
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
