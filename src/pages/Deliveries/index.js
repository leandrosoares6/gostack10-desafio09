import React, { useState, useEffect } from 'react';

import {
  MdSearch,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import More from '~/components/More';

import api from '~/services/api';
import history from '~/services/history';

import DeliveryView from './DeliveryView';

import {
  Container,
  Content,
  DeliveryTable,
  MoreContainer,
  CanceledStatus,
  DeliveredStatus,
  WithdrawalStatus,
  PendingStatus,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
} from './styles';

export default function Deliveries() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(6);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: {
          page,
          q: search,
        },
      });

      setDeliveries(response.data.rows);
      setLimit(response.data.count);
    }

    loadDeliveries();
  }, [page, search]);

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function translateStatus(status) {
    switch (String(status)) {
      case 'CANCELED': {
        return (
          <CanceledStatus>
            <span />
            <strong>CANCELADA</strong>
          </CanceledStatus>
        );
      }
      case 'DELIVERED': {
        return (
          <DeliveredStatus>
            <span />
            <strong>ENTREGUE</strong>
          </DeliveredStatus>
        );
      }
      case 'WITHDRAWAL': {
        return (
          <WithdrawalStatus>
            <span />
            <strong>RETIRADA</strong>
          </WithdrawalStatus>
        );
      }
      default:
        return (
          <PendingStatus>
            <span />
            <strong>PENDENTE</strong>
          </PendingStatus>
        );
    }
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

    if (!confirm) {
      toast.error('Encomenda não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveries/${id}`);

      toast.success('Encomenda apagada com sucesso!');
    } catch (err) {
      toast.error('Essa encomenda não pode ser deletada!');
    }
  }

  return (
    <>
      <Container>
        <span>Gerenciando encomendas</span>
        <Content>
          <div>
            <MdSearch size={20} color="999" />
            <input
              type="search"
              placeholder="Buscar por encomendas"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => history.push('/deliveries/delivery')}
          >
            <div className="add">
              <MdAdd size={20} color="FFF" />
              <span>CADASTRAR</span>
            </div>
          </button>
        </Content>
        <DeliveryTable cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map(delivery => (
              <React.Fragment key={delivery.id}>
                <tr>
                  <td>#0{delivery.id}</td>
                  <td>{delivery.recipient.name}</td>
                  <td>
                    <div>
                      <img
                        src={
                          delivery.deliveryman?.avatar?.url ||
                          `https://ui-avatars.com/api/?name=${delivery.deliveryman.name}`
                        }
                        alt={delivery.deliveryman.name}
                      />
                      <span>{delivery.deliveryman.name}</span>
                    </div>
                  </td>
                  <td>{delivery.recipient.city}</td>
                  <td>{delivery.recipient.state}</td>
                  <td>{translateStatus(delivery.status)}</td>
                  <td>
                    <More>
                      <MoreContainer>
                        <div>
                          <DeliveryView data={delivery} />
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              history.push(
                                `/deliveries/delivery/${delivery.id}`
                              )
                            }
                            type="button"
                          >
                            <MdEdit color="4D85EE" size={15} />
                            <span>Editar</span>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => handleDelete(delivery.id)}
                            type="button"
                          >
                            <MdDeleteForever color="DE3B3B" size={15} />
                            <span>Excluir</span>
                          </button>
                        </div>
                      </MoreContainer>
                    </More>
                  </td>
                </tr>
                <tr className="divisor" />
              </React.Fragment>
            ))}
          </tbody>
        </DeliveryTable>
      </Container>
      <Pagination>
        <ButtonPreviousPage onClick={handlePreviousPage} page={page}>
          <MdChevronLeft size={20} />
        </ButtonPreviousPage>
        <strong>{page}</strong>
        <ButtonNextPage onClick={handleNextPage} page={page} limit={limit}>
          <MdChevronRight size={20} />
        </ButtonNextPage>
      </Pagination>
    </>
  );
}
