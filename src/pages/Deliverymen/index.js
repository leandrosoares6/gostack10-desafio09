import React, { useState, useEffect } from 'react';

import {
  MdSearch,
  MdAdd,
  MdMoreHoriz,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

import api from '~/services/api';

import CreateForm from './CreateForm';

import {
  Container,
  Content,
  DeliverymenTable,
  Badge,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
} from './styles';

export default function Deliverymen() {
  const [visible, setVisible] = useState(false);
  const [toogleView, setToogleView] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  // const [perPage, setPerPage] = useState(6);
  const [limit, setLimit] = useState(6);
  const [deliverymen, setDeliverymen] = useState([]);

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

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleToggleComponent() {
    setToogleView(!toogleView);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  if (toogleView) {
    return <CreateForm />;
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
          <button type="button" onClick={handleToggleComponent}>
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
                  <td className="actions">
                    <Badge onClick={handleToggleVisible}>
                      <MdMoreHoriz color="c6c6c6" size={15} />
                    </Badge>

                    {/* <DeliveryOptions visible={visible}>
                    <button type="button">Visualizar</button>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                  </DeliveryOptions> */}
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
