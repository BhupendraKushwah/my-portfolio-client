import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import CustomInput from '@/components/common/CustomInput'
import { setAuthenticationToken } from '@/utils/authentication.util';
import { login } from '@/redux/slice/auth.slice.js';
import api from '@/axios.config';

const LoginCard = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        try {
            let response = await api.post('/super-admin/login', data)
            if (response.status == 200) {
                await dispatch(login(response?.data?.user))
                setAuthenticationToken(response.data.token)
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card bg-card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <i className="fas fa-user-circle fa-3x text-primary"></i>
                    <h4 className="mt-2">Login</h4>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <CustomInput
                            type="email"
                            name="email"
                            placeholder="email"
                            control={control}
                            rules={{ required: 'Email is required' }}
                            errors={errors.email}
                        />
                    </div>

                    <div className="mb-3">
                        <CustomInput
                            type="password"
                            name="password"
                            placeholder="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            errors={errors.password}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary rounded-3">
                            <i className="fas fa-sign-in-alt me-2"></i> Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginCard;
