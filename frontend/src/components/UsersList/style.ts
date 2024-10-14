import styled from 'styled-components';


export const TableWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.small};
  }
`;


export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: ${({ theme }) => theme.spacing.small};
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.small};
  margin-right: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 12px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}cc;
  }
`;


export const DangerButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.danger};

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger}cc;
  }
`;
