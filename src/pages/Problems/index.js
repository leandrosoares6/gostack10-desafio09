import React, { useState, useEffect } from 'react';

import { MdChevronLeft, MdChevronRight, MdDeleteForever } from 'react-icons/md';

import { toast } from 'react-toastify';

import More from '~/components/More';
import Modal from '~/components/Modal';

import api from '~/services/api';

import {
  Container,
  ProblemTable,
  Pagination,
  ButtonPreviousPage,
  ButtonNextPage,
  MoreContainer,
  ModalContainer,
} from './styles';

export default function Problems() {
  const [page, setPage] = useState(1);
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

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  async function handleCancel(id) {
    try {
      await api.delete(`/problems/${id}`);

      toast.success('Encomenda cancelada com sucesso!');
    } catch (err) {
      toast.error('Essa encomenda não pode ser cancelada!');
    }
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
                    <More
                      contentStyle={{
                        width: '200px',
                        borderRadius: '4px',
                      }}
                    >
                      <MoreContainer>
                        <div>
                          <Modal>
                            <ModalContainer>
                              <strong>VISUALIZAR PROBLEMA</strong>
                              <p>{problem.description}</p>
                            </ModalContainer>
                          </Modal>
                        </div>
                        <div>
                          <button
                            onClick={() => handleCancel(problem.id)}
                            type="button"
                          >
                            <MdDeleteForever color="red" size={15} />
                            <span>Cancelar encomenda</span>
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
