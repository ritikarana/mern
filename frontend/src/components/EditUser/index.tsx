import React, {useEffect, useState } from 'react';
import TextInput from '../TextInput';
import { styled } from 'styled-components';
import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Edituser: React.FC = () => {
    const { id } = useParams();
    const { getData, data } = useFetch();
    useEffect(() => {
        if(id){
            getData(id ?? "");
        }
      }, [id]);

    const [name, setName] = useState('');
    const [age, setAge] = useState(10);
    const [role, setRole] = useState('employee');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (age < 1 || age > 100) newErrors.age = "Age must be between 1 and 100";
          if (!name) newErrors.name = "Name is required";
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

        //const payload: EditUserPayload = { age, role, password };

        try {
           // await saveUser(payload);
            setErrors({})
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Section>
            <form onSubmit={handleSubmit}>
                {/* {isSaved && <p style={{ color: 'green' }}>Saved Successfully !! </p>} */}
                <div>
                    <label htmlFor='name'>Email: {data.email}</label>
                </div>

                <TextInput
                    label="Name"
                    type="text"
                    value={data.name ? data.name : name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                />

                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        aria-label="Enter your age"
                        placeholder="Enter your age"
                        type="number"
                        value={data.age ? data.age : age}
                        onChange={(e) => setAge(e.target.valueAsNumber)}
                    />
                    {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select  value={data.role ? data.role : role} onChange={(e) => setRole(e.target.value)} aria-label="role">
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
                {/* <button type="submit">{loading ? 'Saving...' : 'Edit'}</button> */}
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            </form>
        </Section>
    );
};

export default Edituser;
