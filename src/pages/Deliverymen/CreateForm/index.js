import React from 'react';

import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import AvatarInput from '~/pages/Profile/AvatarInput';
import { Container, HeaderItems } from './styles';

import api from '~/services/api';

export default function CreateForm() {
  async function handleSubmit({ name, email, avatar_id }) {
    const response = await api
      .post('deliverymen', {
        name,
        email,
        avatar_id,
      })
      .catch(err => {
        const error = { ...err };
        if (error.response.status === 400) {
          toast.error('Erro de validação. Verifique seus dados!');
        } else {
          toast.error('Erro interno na aplicação. Tente novamente mais tarde.');
        }
      });

    if (response) {
      toast.success('Entregador cadastrado com sucesso!');
    }
  }

  function handleReturnButton() {
    window.location.reload();
  }

  return (
    <Container>
      <HeaderItems>
        <span>Cadastro de entregadores</span>
        <div>
          <button type="button" onClick={handleReturnButton}>
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
        <AvatarInput name="avatar_id" />

        <div className="input">
          <span>Nome</span>
          <Input name="name" placeholder="John Doe" />
        </div>
        <div className="input">
          <span>Email</span>
          <Input name="email" placeholder="username@example.com" />
        </div>
      </Form>
    </Container>
  );
}
