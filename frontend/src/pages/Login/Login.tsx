import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import TextInput from "../../components/TextInput";
import useLogin from "../../hooks/useLogin";
import { UserLogin } from "../../services/api";

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
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');

    const { fetchToken, data, loading, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState('');

    useEffect(() => {
        if (!!token) {
            navigate("/dashboard");
        }
    }, [token, navigate])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }
        const payload: UserLogin = { email, password };
        try {
            await fetchToken(payload);
        } catch (error) {
            console.error(error);
            setError('Login failed. Please try again.');
        }
    }

    useEffect(() => {
        if (data && data["token"]) {
            window.localStorage.setItem("token", data["token"])
            navigate("/dashboard");
        }
    }, [data, navigate])

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
                {err && <ErrorMessage>{err}</ErrorMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">{loading ? 'Loading...' : 'Login'}</Button>
            </form>
        </Section>
    );
}

export default Login;
