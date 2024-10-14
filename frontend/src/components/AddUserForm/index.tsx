import React, { useEffect, useState } from 'react';
import TextInput from '../TextInput';
import useSaveUser from '../../hooks/useSaveUser';
import { UserPayload } from '../../services/api';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AddUserForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(10);
    const [role, setRole] = useState('employee');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const { saveUser, loading, error, isSaved, reset } = useSaveUser();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (age < 1 || age > 100) newErrors.age = "Age must be between 1 and 100";
        if (!password) newErrors.password = "Password is required";
        if (password !== cpassword) newErrors.cpassword = "Passwords do not match";

        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload: UserPayload = { name, email, age, role, password };

        try {
            await saveUser(payload);
            setErrors({})
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isSaved) {
            console.log(isSaved)
            setName('');
            setEmail('');
            setAge(10);
            setPassword('');
            setCPassword('');
            navigate("/");

        }

        const timer = setTimeout(() => {
            reset();
        }, 5000);

        return () => clearTimeout(timer);
    }, [isSaved, reset]);

    return (
        <Section>
            <form onSubmit={handleSubmit}>
                {isSaved && <p style={{ color: 'green' }}>Registered Successfully, Please click for Login</p>}
                <TextInput
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                />
                <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />
                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        aria-label="Enter your age"
                        placeholder="Enter your age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.valueAsNumber)}
                    />
                    {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="role">
                        <option value="candidate">Candidate</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />
                <TextInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your Password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    error={errors.cpassword}
                />
                <button type="submit">{loading ? 'Saving...' : 'Register'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </Section>
    );
};

export default AddUserForm;
