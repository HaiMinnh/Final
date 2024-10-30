"use client"; // This line marks the component as a Client Component

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../../scss/register.scss';
import Image from 'next/image'; 
import { validateForm } from '../utils/validation'; // Import hàm validation
import { signupUserApi } from '../../action/service/userApi.js'; // Import hàm call API
import { useRouter } from 'next/router'; // Import useRouter


const Register = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    birthday: '',
    gender: 'true', 
    agreeTerm: false,
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

    // Kiểm tra lỗi ngay khi trường được nhập dữ liệu
    const validationErrors = validateForm({
      ...formData,
      [name]: value, 
    });
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Gọi API đăng ký
        const signupResult = await signupUserApi(formData);
        console.log("Kết quả đăng ký:", signupResult);
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API đăng ký:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  return (
    <section className="signup" id="register">
      <div className="container_form">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title-register">REGISTER</h2>
            <form className="register-form" id="register-form" onSubmit={handleSubmit}>

              {/* Name Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-user fa-lg me-3 fa-fw" aria-hidden="true"></i>
                <div className="form-outline flex-fill mb-0">
                  <input 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} // Thêm onChange
                    required 
                    placeholder="Your Name" 
                  />
                  {errors.name && <div className="text-danger position-absolute mt-1">{errors.name}</div>} {/* Hiển thị lỗi */}
                </div>
              </div>

              {/* Email Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-envelope fa-lg me-3 fa-fw" aria-hidden="true"></i>
                <div className="form-outline flex-fill mb-0">
                  <input 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} // Thêm onChange
                    required 
                    placeholder="Your Email" 
                  />
                  {errors.email && <div className="text-danger position-absolute mt-1">{errors.email}</div>} {/* Hiển thị lỗi */}
                </div>
              </div>

              {/* Password Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw" aria-hidden="true"></i>
                <div className="form-outline flex-fill mb-0" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password} 
                    onChange={handleChange} // Thêm onChange
                    required
                    placeholder="Your Password"
                  />
                  {errors.password && <div className="text-danger position-absolute mt-1">{errors.password}</div>} {/* Hiển thị lỗi */}
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash} 
                    onClick={togglePasswordVisibility} 
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} 
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-key fa-lg me-3 fa-fw" aria-hidden="true"></i>
                <div className="form-outline flex-fill mb-0" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm} 
                    onChange={handleChange} // Thêm onChange
                    required
                    placeholder="Repeat your password"
                  />
                  {errors.passwordConfirm && <div className="text-danger position-absolute mt-1">{errors.passwordConfirm}</div>} {/* Hiển thị lỗi */}
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash} 
                    onClick={togglePasswordVisibility} 
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} 
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-phone fa-lg me-3 fa-fw" aria-hidden="true"></i>
                <div className="form-outline flex-fill mb-0">
                  <input 
                    className="form-control" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} // Thêm onChange
                    required 
                    placeholder="Your Phone" 
                  />
                  {errors.phone && <div className="text-danger position-absolute mt-1">{errors.phone}</div>} {/* Hiển thị lỗi */}
                </div>
              </div>

              {/* Birthday Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-cake-candles me-3 fa-fw" aria-hidden="true"></i>
                <div className="form-outline flex-fill mb-0">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="birthday" 
                    name="birthday" 
                    value={formData.birthday} 
                    onChange={handleChange} // Thêm onChange
                    required 
                    placeholder="Your birthday" 
                  />
                  {errors.birthday && <div className="text-danger position-absolute mt-1">{errors.birthday}</div>} {/* Hiển thị lỗi */}
                </div>
              </div>

              {/* Gender Field */}
              <div id="gender" className="gender">
                <i className="fas fa-venus-mars fa-lg me-3"></i>
                <div className="radio gender_inp">
                  <input id="male" type="radio" name="gender" value="true" defaultChecked />
                  <label className="radio-label" htmlFor="male">Male</label>
                  <input id="female" type="radio" name="gender" value="false" />
                  <label className="radio-label" htmlFor="female">Female</label>
                </div>
              </div>

              {/* Agree to Terms */}
              <div className="form-group mt-2-frm">
                <input
                  type="checkbox"
                  required
                  name="agree-term"
                  id="agree-term"
                  className="agree-term"
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  Tôi đồng ý với tất cả các điều khoản trong
                  <a href="#" className="term-service">Điều khoản dịch vụ</a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-group form-button">
                <button className="btn btn-primary btn_register" type="submit">
                  Gửi
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
              className={styles.playImage}
            />
            <a className="signup-image-link" href="/login">I am already a member</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
