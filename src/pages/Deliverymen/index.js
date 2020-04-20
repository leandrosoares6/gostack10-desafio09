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

import {
  Container,
  Content,
  DeliverymenTable,
  MoreContainer,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
} from './styles';

export default function Deliverymen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(6);
  const [deliverymen, setDeliverymen] = useState([]);

  async function updateDeliverymen() {
    const response = await api.get('deliverymen', {
      params: {
        page,
        q: search,
      },
    });

    setDeliverymen(response.data.rows);
    setLimit(response.data.count);
  }

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymen', {
        params: {
          page,
          q: search,
        },
      });

      setDeliverymen(response.data.rows);
      setLimit(response.data.count);
    }

    loadDeliverymen();
  }, [page, search]);

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Deseja realmente excluir o entregador?');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/deliverymen/${id}`);

      toast.success('Entregador apagada com sucesso!');
      await updateDeliverymen();
    } catch (err) {
      toast.error('Esse entregador não pode ser deletado!');
    }
  }

  return (
    <>
      <Container>
        <span>Gerenciando entregadores</span>
        <Content>
          <div>
            <MdSearch size={20} color="999" />
            <input
              type="search"
              placeholder="Buscar por entregadores"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => history.push('/deliverymen/deliveryman')}
          >
            <div className="add">
              <MdAdd size={20} color="FFF" />
              <span>CADASTRAR</span>
            </div>
          </button>
        </Content>
        <DeliverymenTable cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {deliverymen.map(deliveryman => (
              <React.Fragment key={deliveryman.id}>
                <tr>
                  <td>#0{deliveryman.id}</td>
                  <td>
                    <img
                      src={
                        deliveryman.avatar?.url ||
                        `https://ui-avatars.com/api/?name=${deliveryman.name}`
                      }
                      alt={deliveryman.name}
                    />
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    <More>
                      <MoreContainer>
                        <div>
                          <button
                            onClick={() =>
                              history.push(
                                `/deliverymen/deliveryman/${deliveryman.id}`
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
                            onClick={() => handleDelete(deliveryman.id)}
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
        </DeliverymenTable>
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
