'use client'; // This line marks the component as a Client Component

import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUser,
    faLock,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {validateForm} from '../utils/validation'; // Import hàm validation
import {signupUserApi} from '../../action/service/userApi.js'; // Import hàm call API
import {useRouter} from 'next/navigation';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState({});

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

        // Validate form
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            // Gọi API đăng ký
            const signupResult = await signupUserApi(formData);

            if (signupResult) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi gọi API đăng ký:', error);
        }
    };

    return (
        <section className="signup" id="register">
            <div className="container_form">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title-register">REGISTER</h2>
                        <form
                            className="register-form"
                            id="register-form"
                            onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                    className="fas fa-user fa-lg me-3 fa-fw"
                                    aria-hidden="true"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                    />
                                    {errors.name && (
                                        <div className="text-danger position-absolute mt-1">
                                            {errors.name}
                                        </div>
                                    )}{' '}
                                    {/* Hiển thị lỗi */}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                    className="fas fa-envelope fa-lg me-3 fa-fw"
                                    aria-hidden="true"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                    />
                                    {errors.email && (
                                        <div className="text-danger position-absolute mt-1">
                                            {errors.email}
                                        </div>
                                    )}{' '}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                    className="fas fa-lock fa-lg me-3 fa-fw"
                                    aria-hidden="true"></i>
                                <div
                                    className="form-outline flex-fill mb-0"
                                    style={{position: 'relative'}}>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Your Password"
                                    />
                                    {errors.password && (
                                        <div className="text-danger position-absolute mt-1">
                                            {errors.password}
                                        </div>
                                    )}{' '}
                                    {/* Hiển thị lỗi */}
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
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

                            {/* Confirm Password Field */}
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                    className="fas fa-key fa-lg me-3 fa-fw"
                                    aria-hidden="true"></i>
                                <div
                                    className="form-outline flex-fill mb-0"
                                    style={{position: 'relative'}}>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className="form-control"
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        placeholder="Repeat your password"
                                    />
                                    {errors.passwordConfirm && (
                                        <div className="text-danger position-absolute mt-1">
                                            {errors.passwordConfirm}
                                        </div>
                                    )}{' '}
                                    {/* Hiển thị lỗi */}
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
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

                            {/* Phone Field */}
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                    className="fas fa-phone fa-lg me-3 fa-fw"
                                    aria-hidden="true"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="Your Phone"
                                    />
                                    {errors.phone && (
                                        <div className="text-danger position-absolute mt-1">
                                            {errors.phone}
                                        </div>
                                    )}{' '}
                                    {/* Hiển thị lỗi */}
                                </div>
                            </div>

                            {/* Birthday Field */}
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i
                                    className="fas fa-cake-candles me-3 fa-fw"
                                    aria-hidden="true"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="birthday"
                                        name="birthday"
                                        placeholder="Your birthday"
                                    />
                                    {errors.birthday && (
                                        <div className="text-danger position-absolute mt-1">
                                            {errors.birthday}
                                        </div>
                                    )}{' '}
                                    {/* Hiển thị lỗi */}
                                </div>
                            </div>

                            {/* Gender Field */}
                            <div id="gender" className="gender">
                                <i className="fas fa-venus-mars fa-lg me-3"></i>
                                <div className="radio gender_inp">
                                    <input
                                        id="male"
                                        type="radio"
                                        name="gender"
                                        value={true}
                                        defaultChecked
                                    />
                                    <label
                                        className="radio-label"
                                        htmlFor="male">
                                        Male
                                    </label>
                                    <input
                                        id="female"
                                        type="radio"
                                        name="gender"
                                        value={false}
                                    />
                                    <label
                                        className="radio-label"
                                        htmlFor="female">
                                        Female
                                    </label>
                                </div>
                            </div>

                            {/* Agree to Terms */}
                            <div>
                                <div className="form-group mt-2-frm">
                                    <input
                                        type="checkbox"
                                        name="agree-term"
                                        id="agree-term"
                                        className="agree-term"
                                    />
                                    <label
                                        htmlFor="agree-term"
                                        className="label-agree-term">
                                        Tôi đồng ý với tất cả các điều khoản
                                        trong{' '}
                                        <a href="#" className="term-service">
                                            Điều khoản dịch vụ
                                        </a>
                                    </label>
                                </div>
                                {errors?.['agree-term'] && (
                                    <div className="text-danger mt-1">
                                        {errors?.['agree-term']}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="form-group form-button">
                                <button
                                    className="btn btn-primary btn_register"
                                    type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Signup Image */}
                    <div className="signup-image">
                        <Image
                            src="/images/register.jpg"
                            width={500}
                            height={500}
                            alt="Registration"
                            className="w-100 h-auto object-fit-cover "
                        />
                        <a className="signup-image-link" href="/login">
                            I am already a member
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
