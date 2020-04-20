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
  RecipientTable,
  MoreContainer,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
} from './styles';

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(6);
  const [recipients, setRecipients] = useState([]);

  async function updateRecipients() {
    const response = await api.get('recipients', {
      params: {
        page,
        q: search,
      },
    });

    setRecipients(response.data.rows);
    setLimit(response.data.count);
  }

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

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Deseja realmente excluir o detinatário?');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/recipients/${id}`);

      toast.success('Destinatário apagado com sucesso!');
      await updateRecipients();
    } catch (err) {
      toast.error('Esse destinatário não pode ser deletado!');
    }
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
          <button
            type="button"
            onClick={() => history.push('/recipients/recipient')}
          >
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
                  <td>
                    <More>
                      <MoreContainer>
                        <div>
                          <button
                            onClick={() =>
                              history.push(
                                `/recipients/recipient/${recipient.id}`
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
                            onClick={() => handleDelete(recipient.id)}
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
