import React from "react";
import UsersList from "../../components/UsersList";
import withAuth from "../../withHOC/withAuth"


const Dashboard: React.FC = () => {
    return (
    <>
        <UsersList />
    </>
    )
}

export default withAuth(Dashboard);