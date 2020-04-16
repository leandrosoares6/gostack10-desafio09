import React, { useState, useEffect } from 'react';

import { MdChevronLeft, MdDone } from 'react-icons/md';

import { toast } from 'react-toastify';
import { Container, HeaderItems, SelectContainer, SelectInput } from './styles';

import api from '~/services/api';

export default function CreateForm() {
  const [deliverymenOptions, setDeliverymenOptions] = useState([]);
  const [recipientOptions, setRecipientOptions] = useState([]);
  const [deliverymanOption, setDeliverymanOption] = useState('');
  const [recipientOption, setRecipientOption] = useState('');
  const [product, setProduct] = useState('');
  const [deliverymanPlaceholder, setDeliverymanPlaceholder] = useState(
    'Selecione'
  );
  const [recipientPlaceholder, setRecipientPlaceholder] = useState('Selecione');

  useEffect(() => {
    async function loadOptions() {
      const deliverymenResponse = await api.get('deliverymen');

      const recipientsResponse = await api.get('recipients');

      const deliverymenOpts = deliverymenResponse.data.rows.map(
        deliveryman => ({
          value: deliveryman.id,
          label: deliveryman.name,
        })
      );

      const recipientOpts = recipientsResponse.data.rows.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setDeliverymenOptions(deliverymenOpts);
      setRecipientOptions(recipientOpts);
    }

    loadOptions();
  }, []);

  async function handleSubmit() {
    if (recipientOption === '') {
      toast.error('Destinatário não selecionado!');
      return;
    }

    if (deliverymanOption === '') {
      toast.error('Entregador não selecionado!');
      return;
    }

    if (product === '') {
      toast.error('É necessário uma descrição do produto!');
      return;
    }

    await api
      .post('deliveries', {
        product,
        recipient_id: recipientOption,
        deliveryman_id: deliverymanOption,
      })
      .catch(() => {
        toast.error('Erro interno na aplicação. Tente novamente mais tarde.');
      });

    toast.success('Produto cadastrado com sucesso!');

    setDeliverymanOption('');
    setRecipientOption('');
    setProduct('');
    setDeliverymanPlaceholder('Selecione');
    setRecipientPlaceholder('Selecione');
  }

  function handleDeliverymanOption(e) {
    setDeliverymanOption(e.value);
    setDeliverymanPlaceholder(e.label);
  }

  function handleRecipientOption(e) {
    setRecipientOption(e.value);
    setRecipientPlaceholder(e.label);
  }

  function handleReturnButton() {
    window.location.reload();
  }

  return (
    <Container>
      <HeaderItems>
        <span>Cadastro de encomendas</span>
        <div>
          <button type="button" onClick={handleReturnButton}>
            <div>
              <MdChevronLeft size={20} color="FFF" />
              <span>VOLTAR</span>
            </div>
          </button>
          <button className="save" type="button" onClick={handleSubmit}>
            <div>
              <MdDone size={20} color="FFF" />
              <span>SALVAR</span>
            </div>
          </button>
        </div>
      </HeaderItems>
      <form>
        <SelectContainer>
          <div>
            <span>Destinatário</span>
            <SelectInput
              value={recipientOption}
              onChange={e => handleRecipientOption(e)}
              options={recipientOptions}
              placeholder={recipientPlaceholder}
            />
          </div>
          <div>
            <span>Entregador</span>
            <SelectInput
              value={deliverymanOption}
              onChange={e => handleDeliverymanOption(e)}
              options={deliverymenOptions}
              placeholder={deliverymanPlaceholder}
            />
          </div>
        </SelectContainer>
        <div className="input">
          <span>Nome do produto</span>
          <input
            value={product}
            onChange={e => setProduct(e.target.value)}
            type="text"
            placeholder="Yamaha SX7"
          />
        </div>
      </form>
    </Container>
  );
}
