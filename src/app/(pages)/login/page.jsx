'use client'; // This line marks the component as a Client Component

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUser,
    faLock,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {signinUserApi} from '../../action/service/userApi.js'; // Import hàm call API
import {validateLoginForm} from '../utils/validation'; // Import hàm validation
import Link from 'next/link.js';
import {useRouter} from 'next/navigation.js';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('fiverrUserId');

        if (loggedInUser) {
            router.push('/profile');
        }
    }, [router]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rawData = new FormData(e.target);

        // Convert FormData type to normal object
        const formData = {};

        for (let keyValue of rawData.entries()) {
            formData[keyValue[0]] = keyValue[1];
        }

        // Kiểm tra lỗi khi người dùng nhấn nút Đăng Nhập
        const validationErrors = validateLoginForm(formData);

        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);

            return;
        }

        setErrors({});

        try {
            // Gọi API đăng nhập
            const loginResult = await signinUserApi(formData);
            if (loginResult) {
                // Lưu thông tin vào localStorage
                localStorage.setItem('fiverrUserId', loginResult.user?.id);
                localStorage.setItem('fiverrUserToken', loginResult.token);

                // Chuyển hướng đến trang profile sau khi đăng nhập thành công
                router.push('/profile');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi gọi API đăng nhập:', error);
        }
    };

    return (
        <section className="sign-in">
            <div className="container_form">
                <div className="signin-content d-flex">
                    <div className="signin-image">
                        <figure>
                            <Image
                                src="/images/login.jpg"
                                width={500}
                                height={500}
                                alt="Partner"
                                className="w-100 h-auto object-fit-cover"
                            />
                        </figure>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title mb-5">
                            Đăng Nhập vào Fiverr
                        </h2>
                        <form
                            className="login-form"
                            id="login-form"
                            onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="me-3 fa-fw"
                                />
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        className={`form-control ${
                                            errors.email ? 'is-invalid' : ''
                                        }`}
                                        id="email"
                                        name="email"
                                        placeholder="Email của bạn"
                                    />
                                    <div className="text-danger position-absolute mt-1">
                                        {errors.email}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="me-3 fa-fw"
                                />
                                <div
                                    className="form-outline flex-fill mb-0"
                                    style={{position: 'relative'}}>
                                    <input
                                        className={`form-control ${
                                            errors.password ? 'is-invalid' : ''
                                        }`}
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Mật khẩu của bạn"
                                    />
                                    <div className="text-danger position-absolute mt-1">
                                        {errors.password}
                                    </div>
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        className="your-custom-class"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group register d-flex justify-content-start align-items-baseline gap-3 ms-sm-5 mt-5">
                                <button
                                    className="btn btn-success login w-auto"
                                    type="submit">
                                    Đăng Nhập
                                </button>
                                <Link
                                    className="text_register"
                                    href="/register">
                                    Đăng ký ngay?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
