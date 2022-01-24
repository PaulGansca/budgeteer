import React, { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { createUserProfileDocument, auth } from '../../firebase/firebase.utils';
import { checkEmailExists } from '../../firebase/crud-user';

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
    let navigate = useNavigate();
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameRules = [{
        required: true,
        message: 'Please input your name!'
    }];
    const emailRules = [
        () => ({
            async validator(_, value) {
                if (value) {
                    if (regexEmail.test(value)) {
                        if (await checkEmailExists(value)) return Promise.reject('Email already in use!')
                        else return Promise.resolve();
                    } else return Promise.reject('Not a valid email!')
                } else {
                    return Promise.reject('Please input your email!');
                }
            },
        })
    ]
    const passwordRules = [{
        required: true,
        message: 'Please input your password!'
    }, {
        min: 6,
        message: 'Password should be at least 6 characters'
    }
    ]
    const confirmPasswordRules = [{
        required: true,
        message: 'Please input your password!'
    }, {
        min: 6,
        message: 'Password should be at least 6 characters'
    },
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    })
    ]
    const handleSubmit = async (values) => {
        const { name, email, password } = values;
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { name });
            navigate('/', { replace: true });
        } catch (e) {
            console.log(e)
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
                        <Form.Item className={isFocused === 'name' || nameVal.length ? 'focus signup-input' : 'signup-input'}
                            rules={nameRules} hasFeedback={true}>
                            <h5 className="input-label">Name</h5>
                            <Form.Item style={{ marginBottom: 0 }} name="name"><CustomInput name="name" bordered={false} type="text"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setNameVal(e.target.value)}
                                prefix={<UserOutlined style={{ marginRight: 10 }} className="input-icon" />} /></Form.Item>
                        </Form.Item>
                        <Form.Item className={isFocused === 'email' || emailVal.length ? 'focus signup-input' : 'signup-input'}
                            rules={emailRules} hasFeedback={true}>
                            <h5 className="input-label">Email</h5>
                            <Form.Item style={{ marginBottom: 0 }} name="email"><CustomInput name="email" bordered={false} type="text"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setEmailVal(e.target.value)}
                                prefix={<UserOutlined style={{ marginRight: 10 }} className="input-icon" />} /></Form.Item>
                        </Form.Item>
                        <Form.Item className={isFocused === 'password' || passwordVal.length ? 'focus signup-input' : 'signup-input'}
                            rules={passwordRules} hasFeedback={true}>
                            <h5 className="input-label">Password</h5>
                            <Form.Item style={{ marginBottom: 0 }} name="password"><CustomInput name="password" bordered={false} type="password"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setPasswordVal(e.target.value)}
                                prefix={<LockOutlined style={{ marginRight: 10 }} className="input-icon" />} /></Form.Item>
                        </Form.Item>
                        <Form.Item className={isFocused === 'confirmPassword' || confirmPasswordVal.length ? 'focus signup-input' : 'signup-input'}
                            rules={confirmPasswordRules} hasFeedback={true}>
                            <h5 className="input-label">Confirm Password</h5>
                            <Form.Item style={{ marginBottom: 0 }} name="confirmPassword"><CustomInput name="confirmPassword" bordered={false} type="password"
                                onFocus={(e) => setIsFocused(e.target.name)} onBlur={(e) => setIsFocused('')}
                                onChange={(e) => setConfirmPasswordVal(e.target.value)}
                                prefix={<LockOutlined style={{ marginRight: 10 }} className="input-icon" />} /></Form.Item>
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
