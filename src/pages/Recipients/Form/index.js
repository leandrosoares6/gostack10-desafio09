import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import axios from 'axios';
import InputMask from '~/components/InputMask';

import { Container, HeaderItems } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function RecipientForm({ match }) {
  const { id } = match.params;

  const [complementValue, setComplementValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [zipValue, setZipValue] = useState('');
  const [streetValue, setStreetValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');

  useEffect(() => {
    async function loadInitialData(recipientId) {
      if (id) {
        const response = await api.get(`/recipients/${recipientId}`);

        const {
          name,
          zip_code,
          street,
          number,
          complement,
          city,
          state,
        } = response.data;

        setNameValue(name);
        setZipValue(zip_code);
        setStreetValue(street);
        setNumberValue(number);
        setComplementValue(complement);
        setCityValue(city);
        setStateValue(state);
      }
    }
    loadInitialData(id);
  }, [id]);

  function clearAllInputs() {
    setNameValue('');
    setStreetValue('');
    setNumberValue('');
    setZipValue('');
    setComplementValue('');
    setCityValue('');
    setStateValue('');
  }

  async function handleSubmit({
    name,
    street,
    number,
    complement,
    city,
    state,
  }) {
    const zipValueFormatted = zipValue.replace(/-/, '');
    let response = {};

    if (id) {
      response = await api
        .put(`recipients/${id}`, {
          name,
          zip_code: zipValueFormatted,
          street,
          number,
          complement,
          city,
          state,
        })
        .catch(err => {
          const error = { ...err };
          if (error.response.status === 400) {
            toast.error('Erro de validação. Verifique seus dados!');
          } else {
            toast.error(
              'Erro interno na aplicação. Tente novamente mais tarde.'
            );
          }
        });
    } else {
      response = await api
        .post('recipients', {
          name,
          zip_code: zipValueFormatted,
          street,
          number,
          complement,
          city,
          state,
        })
        .catch(err => {
          const error = { ...err };
          if (error.response.status === 400) {
            toast.error('Erro de validação. Verifique seus dados!');
          } else {
            toast.error(
              'Erro interno na aplicação. Tente novamente mais tarde.'
            );
          }
        });
    }
    if (response) {
      toast.success('Destinatário cadastrado com sucesso!');
      clearAllInputs();
    }
  }

  async function handleBlur(e) {
    const response = await axios.get(
      `https://viacep.com.br/ws/${e.target.value}/json`
    );

    const {
      erro,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
    } = response.data;

    if (!erro) {
      if (complemento !== '') {
        setComplementValue(complemento);
      } else {
        setComplementValue(`Bairro ${bairro}`);
        setStreetValue(`logradouro ${logradouro}`);
      }
      setCityValue(localidade);
      setStateValue(uf);
    }
  }

  return (
    <Container>
      <HeaderItems>
        <span>Cadastro de destinatários</span>
        <div>
          <button type="button" onClick={() => history.push('/recipients')}>
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
        <div className="input">
          <span>Nome</span>
          <Input
            name="name"
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
            placeholder="Ludwing van Beethoven"
          />
        </div>
        <div className="content1">
          <div className="input">
            <span>CEP</span>
            <InputMask
              value={zipValue}
              onChange={e => setZipValue(e.target.value)}
              name="zip_code"
              mask="99999-999"
              maskChar={null}
              placeholder="64085-300"
              onBlur={e => handleBlur(e)}
            />
          </div>
          <div className="input">
            <span>Rua</span>
            <Input
              name="street"
              value={streetValue}
              onChange={e => setStreetValue(e.target.value)}
              placeholder="Rua Beethoven"
            />
          </div>
          <div className="input">
            <span>Número</span>
            <Input
              name="number"
              value={numberValue}
              onChange={e => setNumberValue(e.target.value)}
              placeholder="1729"
            />
          </div>
        </div>
        <div className="content2">
          <div className="input">
            <span>Complemento</span>
            <Input
              name="complement"
              value={complementValue}
              onChange={e => setComplementValue(e.target.value)}
            />
          </div>
          <div className="input">
            <span>Cidade</span>
            <Input
              name="city"
              value={cityValue}
              onChange={e => setCityValue(e.target.value)}
              placeholder="Teresina"
            />
          </div>
          <div className="input">
            <span>Estado</span>
            <Input
              name="state"
              value={stateValue}
              onChange={e => setStateValue(e.target.value)}
              placeholder="Piauí"
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
