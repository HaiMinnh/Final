"use client"; // This line marks the component as a Client Component

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../../scss/login.scss';
import Image from 'next/image'; 
import { signinUserApi } from '../../action/service/userApi.js'; // Import hàm call API
import { validateLoginForm } from '../utils/validation'; // Import hàm validation

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra lỗi khi người dùng nhấn nút Đăng Nhập
    const validationErrors = await validateLoginForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Gọi API đăng nhập
        const loginResult = await signinUserApi(formData);
        if (loginResult) {
          // Chuyển hướng đến trang profile sau khi đăng nhập thành công
          window.location.href = '/profile'; // Hoặc sử dụng router.push nếu bạn đang sử dụng Next.js Router
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API đăng nhập:", error);
      }
    } else {
      setErrors(validationErrors);
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
                className={styles.playImage}
              />
            </figure>
          </div>
          <div className="signin-form">
            <h2 className="form-title mb-5">Đăng Nhập vào Fiverr</h2>
            <form className="login-form" id="login-form" onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center mb-4">
                <FontAwesomeIcon icon={faUser} className="me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                  <input 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="Email của bạn" 
                    value={formData.email}
                    onChange={handleChange} // Gọi hàm handleChange
                  />
                  <div className="text-danger position-absolute mt-1">{errors.email}</div>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <FontAwesomeIcon icon={faLock} className="me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0" style={{ position: 'relative' }}>
                  <input 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                    id="password" 
                    name="password" 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    placeholder="Mật khẩu của bạn" 
                    value={formData.password}
                    onChange={handleChange} // Gọi hàm handleChange
                  />
                  <div className="text-danger position-absolute mt-1">{errors.password}</div>
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash} 
                    className="your-custom-class" 
                    onClick={togglePasswordVisibility} 
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} 
                  />
                </div>
              </div>
              <div className="form-group register d-flex justify-content-start align-items-baseline gap-3 ms-5 mt-5">
                <button className="btn btn-success login" type="submit">Đăng Nhập</button>
                <a className="text_register" href="/register">Đăng ký ngay?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
