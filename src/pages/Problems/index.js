import React, { useState, useEffect } from 'react';

import { MdMoreHoriz, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import {
  Container,
  ProblemTable,
  Badge,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
} from './styles';

export default function Problems() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(6);
  const [limit, setLimit] = useState(6);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('problems', {
        params: {
          page,
        },
      });

      setProblems(response.data.rows);
      setLimit(response.data.count);
    }

    loadDeliverymen();
  }, [page]);

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
        <span>Problemas na entrega</span>

        <ProblemTable cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {problems.map(problem => (
              <React.Fragment key={problem.id}>
                <tr>
                  <td>#0{problem.delivery_id}</td>
                  <td>{problem.description}</td>
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
        </ProblemTable>
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
