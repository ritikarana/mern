import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import TextInput from "../../components/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import { loginUser } from '../../services/api';


const Button = styled.button`
  background-color: #1b6e5b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #145a4a;
  }
`;

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%
`;

const RegisterLink = styled.div`
    padding: 2% 0;
    margin: 2% 0;
    cursor: pointer;

    & a {
        color: #1b6f5b;
        font-weight: bold;
    }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { userInfo, loading, error } = useSelector((state: RootState) => state.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(loginUser({ email, password }));
    }
    useEffect(() => {
        if (userInfo?.token) {
            navigate("/dashboard");
        }
    }, [userInfo, navigate])

    return (
        <Section>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">{loading ? 'Loading...' : 'Login'}</Button>
                <RegisterLink><Link to={"/register"}>Click Here for Register</Link></RegisterLink>
            </form>
        </Section>
    );
}

export default Login;
