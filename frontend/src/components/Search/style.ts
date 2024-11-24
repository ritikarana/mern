import styled from 'styled-components';


export const SearchForm = styled.form`
    background-color: transparent;
    padding: initial;
    border-radius: 0;
    box-shadow: none;
    width: 100%
`

export const SearchDiv = styled.div`
 width: 100%;
 clear: both;
   overflow: auto;
`;

export const SearchButton = styled.button`

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


export const LeftDiv = styled.div`
  float: left;
  margin-left: 1%;
`;

export const RightDiv = styled.div`
  float: right;
  margin-right: 1%;
`;