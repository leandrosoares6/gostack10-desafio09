import React, { useState, useEffect } from 'react';

import {
  MdSearch,
  MdAdd,
  MdMoreHoriz,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import api from '~/services/api';

import {
  Container,
  Content,
  RecipientTable,
  Badge,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
} from './styles';

export default function Problems() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  // const [perPage, setPerPage] = useState(6);
  const [limit, setLimit] = useState(6);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('recipients', {
        params: {
          page,
          q: search,
        },
      });

      setRecipients(response.data.rows);
      setLimit(response.data.count);
    }

    loadProblems();
  }, [page, search]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <>
      <Container>
        <span>Gerenciando destinatários</span>
        <Content>
          <div>
            <MdSearch size={20} color="999" />
            <input
              type="search"
              placeholder="Buscar por destinatários"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button type="button">
            <div className="add">
              <MdAdd size={20} color="FFF" />
              <span>CADASTRAR</span>
            </div>
          </button>
        </Content>
        <RecipientTable cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {recipients.map(recipient => (
              <React.Fragment key={recipient.id}>
                <tr>
                  <td>#0{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}
                  </td>
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
        </RecipientTable>
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
