import React from "react";
import styled from "styled-components";
import UsersList from "../../components/UsersList";
import withAuth from "../../withHOC/withAuth"

const Section = styled.section`
    display: flex;
`;

const Dashboard: React.FC = () => {
    return (<Section>
    <UsersList />      
     </Section>)
}

export default withAuth(Dashboard);