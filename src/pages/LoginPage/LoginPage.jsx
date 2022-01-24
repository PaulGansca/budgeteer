import React, { useState } from 'react';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Divider, Form } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import CustomButton from '../../components/custom-button/custom-button';
import CustomInput from '../../components/custom-inputs/custom-input';

import Background from '../../assets/bg.svg';
import Avatar from '../../assets/avatar.svg';
import Wave from '../../assets/wave.png';

import './login.css';

const LoginPage = () => {
    const [isFocused, setIsFocused] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    const emailRules = [{
        required: true,
        message: 'Please input your email!'
    }, {
        type: 'email',
        message: 'Not a valid email'
    }];
    const passwordRules = [{
        required: true,
        message: 'Please input your password!'
    }];
    const handleSubmit = async (values) => {
        const { email, password } = values;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            let from = location.state.from.pathname || "/";
            navigate(from, { replace: true });
        } catch (e) {
            alert(e);
        }
    }
    return (
        <div className="login-page">
            <img className="wave" src={Wave} alt="Wave curve" />
            <div className="container">
                <div className="background-img">
                    <img src={Background} alt="BG" />
                </div>
                <div className="login-content">
                    <Form name="loginForm" onFinish={handleSubmit}>
                        <img src={Avatar} alt="Avatar" />
                        <h2 className="title">Welcome</h2>
                        <Form.Item className={isFocused === 'email' || emailVal.length ? 'focus login-input' : 'login-input'} rules={emailRules}>
                            <h5 className="input-label">Email</h5>
                            <CustomInput name="email" bordered={false} type="text"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={() => setIsFocused('')}
                                onChange={(e) => setEmailVal(e.target.value)}
                                prefix={<UserOutlined style={{ marginRight: 10 }} className="input-icon" />} />
                        </Form.Item>
                        <Form.Item className={isFocused === 'password' || passwordVal.length ? 'focus login-input' : 'login-input'} rules={passwordRules}>
                            <h5 className="input-label">Password</h5>
                            <CustomInput name="password" bordered={false} type="password"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={() => setIsFocused('')}
                                onChange={(e) => setPasswordVal(e.target.value)}
                                prefix={<LockOutlined style={{ marginRight: 10 }} className="input-icon" />} />
                        </Form.Item>
                        <Link to='/login'>Forgot Password?</Link>
                        <input type="submit" className="btn" />
                        <Divider dashed={true}>Or</Divider>
                        <CustomButton icon={<GoogleOutlined />} onClick={signInWithGoogle} shape="round">Sign in with google</CustomButton>
                        <p style={{ marginTop: 16, marginBottom: 10 }}>Don't have an account?
                            {<CustomButton type="link">
                                {<Link to='/signup'>Sign Up</Link>}
                            </CustomButton>}
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;
