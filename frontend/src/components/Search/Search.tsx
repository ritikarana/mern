import React, { useEffect, useState } from "react";
import { SearchForm , SearchDiv, SearchButton, LeftDiv, RightDiv} from "./style";
import { useNavigate } from "react-router";

interface SearchBarProps {
   setSearchParam: (searchParam: string) => void;
   intialSearch: string;
}

const Search: React.FC<SearchBarProps> = ({ setSearchParam, intialSearch }) => {
   const [inputValue, setInputValue] = useState('');
   const navigate = useNavigate();

   const handleAdd = () => {
      console.log("testing")
      navigate('/addUser');
      return null;
   }

   useEffect(() => {
      setInputValue(intialSearch)
   }, [intialSearch])

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSearchParam(inputValue.trim())
   }


   return (
      <SearchDiv>
         <LeftDiv>
         <SearchForm onSubmit={handleSubmit}>
               <input value={inputValue} type="search" onChange={(e) => setInputValue(e.target.value)} placeholder="Search..." />
         </SearchForm>
         </LeftDiv>
         <RightDiv>
         <SearchButton onClick={() => handleAdd()}>Add New User</SearchButton>
         </RightDiv>
      </SearchDiv>)
}

export default React.memo(Search)