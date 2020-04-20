import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import AvatarInput from '~/pages/Profile/AvatarInput';
import { Container, HeaderItems } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function DeliverymanForm({ match }) {
  const { id } = match.params;
  const [avatarValue, setAvatarValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  useEffect(() => {
    async function loadInitialData(deliverymanId) {
      if (id) {
        const response = await api.get(`/deliverymen/${deliverymanId}`);

        if (response.data?.avatar?.url) {
          setAvatarValue(response.data.avatar.url);
        }

        setNameValue(response.data.name);
        setEmailValue(response.data.email);
      }
    }
    loadInitialData(id);
  }, [id]);

  async function handleSubmit(data) {
    let response = {};
    if (id) {
      response = await api.put(`deliverymen/${id}`, data).catch(err => {
        const error = { ...err };
        if (error.response.status === 400) {
          toast.error('Erro de validação. Verifique seus dados!');
        } else {
          toast.error('Erro interno na aplicação. Tente novamente mais tarde.');
        }
      });
    } else {
      response = await api.post('deliverymen', data).catch(err => {
        const error = { ...err };
        if (error.response.status === 400) {
          toast.error('Erro de validação. Verifique seus dados!');
        } else {
          toast.error('Erro interno na aplicação. Tente novamente mais tarde.');
        }
      });
    }

    if (response) {
      toast.success('Entregador cadastrado com sucesso!');
    }

    setNameValue('');
    setEmailValue('');
  }

  return (
    <Container>
      <HeaderItems>
        <span>Cadastro de entregadores</span>
        <div>
          <button type="button" onClick={() => history.push('/deliverymen')}>
            <div>
              <MdChevronLeft size={20} color="FFF" />
              <span>VOLTAR</span>
            </div>
          </button>
          <button className="save" type="submit" form="add_deliveryman">
            <div>
              <MdDone size={20} color="FFF" />
              <span>SALVAR</span>
            </div>
          </button>
        </div>
      </HeaderItems>
      <Form id="add_deliveryman" onSubmit={handleSubmit}>
        <AvatarInput
          name="avatar_id"
          value={avatarValue}
          onChange={e => setAvatarValue(e.target.value)}
        />

        <div className="input">
          <span>Nome</span>
          <Input
            name="name"
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="input">
          <span>Email</span>
          <Input
            name="email"
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
            placeholder="username@example.com"
          />
        </div>
      </Form>
    </Container>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
