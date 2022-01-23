import React, { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button';
import CustomInput from '../../components/custom-inputs/custom-input';

import Background from '../../assets/bg.svg';
import Avatar from '../../assets/avatar.svg';
import Wave from '../../assets/wave.png';

import './signup.css';

const SignUpPage = () => {
    const [isFocused, setIsFocused] = useState('');
    const [nameVal, setNameVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
    const nameRules = [{
        required: true,
        message: 'Please input your name!'
    }];
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
            //await auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            alert(e);
        }
    }
    return (
        <div className="signup-page">
            <img className="wave" src={Wave} alt="Wave curve" />
            <div className="container">
                <div className="background-img">
                    <img src={Background} alt="BG" />
                </div>
                <div className="signup-content">
                    <Form name="signupForm" onFinish={handleSubmit}>
                        <img src={Avatar} alt="Avatar" />
                        <h2 className="title">Welcome</h2>
                        <Form.Item className={isFocused === 'name' || nameVal.length ? 'focus signup-input' : 'signup-input'} rules={nameRules}>
                            <h5 className="input-label">Name</h5>
                            <CustomInput name="name" bordered={false} type="text"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setNameVal(e.target.value)}
                                prefix={<UserOutlined style={{ marginRight: 10 }} className="input-icon" />} />
                        </Form.Item>
                        <Form.Item className={isFocused === 'email' || emailVal.length ? 'focus signup-input' : 'signup-input'} rules={emailRules}>
                            <h5 className="input-label">Email</h5>
                            <CustomInput name="email" bordered={false} type="text"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setEmailVal(e.target.value)}
                                prefix={<UserOutlined style={{ marginRight: 10 }} className="input-icon" />} />
                        </Form.Item>
                        <Form.Item className={isFocused === 'password' || passwordVal.length ? 'focus signup-input' : 'signup-input'} rules={passwordRules}>
                            <h5 className="input-label">Password</h5>
                            <CustomInput name="password" bordered={false} type="password"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setPasswordVal(e.target.value)}
                                prefix={<LockOutlined style={{ marginRight: 10 }} className="input-icon" />} />
                        </Form.Item>
                        <Form.Item className={isFocused === 'confirmPassword' || confirmPasswordVal.length ? 'focus signup-input' : 'signup-input'} rules={passwordRules}>
                            <h5 className="input-label">Confirm Password</h5>
                            <CustomInput name="confirmPassword" bordered={false} type="password"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setConfirmPasswordVal(e.target.value)}
                                prefix={<LockOutlined style={{ marginRight: 10 }} className="input-icon" />} />
                        </Form.Item>
                        <input type="submit" className="btn" />
                        <p style={{ marginTop: 16, marginBottom: 10 }}>Already have an account?
                            {<CustomButton type="link">
                                {<Link to='/login'>Login</Link>}
                            </CustomButton>}
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default SignUpPage;
