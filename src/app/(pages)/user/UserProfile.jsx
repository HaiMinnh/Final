"use client"; // Đánh dấu component này là Client Component

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileApi } from '../../action/service/userApi.js'; // Cập nhật đường dẫn đúng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = getStore(ID_LOGIN); // Hoặc lấy userId từ props hoặc state
  const userProfile = useSelector(state => state.userProfile); // Cập nhật tên state đúng

  useEffect(() => {
    dispatch(getProfileApi(userId));
  }, [dispatch, userId]);

  return (
    <div className="info">
      <div className="info_sellercard_top">
        <div className="info_card">
          <div className="onl">
            <div className="user_online ">
              <i className="fas fa-circle"></i>
              <span>Online</span>
            </div>
            <div className="dropdown">
              <button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* Thêm nội dung cho nút nếu cần */}
              </button>
              <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button className="dropdown-item" type="button">Đăng Xuất</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="info_profile">
            <div className="info_profile_image">
              <label className="info_label">
                <div className="label_camera">
                  <span>
                    <i className="las la-camera icon"></i>
                  </span>
                </div>
                <input className="label_inp" type="file" />
                <div className="image d-flex">
                  <p className="text my-0 text-center" style={{ fontSize: '16px' }}>{userProfile.name || 'Chưa có tên'}</p>
                </div>
              </label>
            </div>
            <div className="info_profile_label">
              <p>{userProfile.email || 'Chưa có email'}</p>
              <div className="btn_update">
                <button className="edit">
                  <FontAwesomeIcon icon={faPen} className="icon" />
                </button>
              </div>
            </div>
          </div>

          <div className="info_desc">
            <div className="location">
              <div className="location_left">
                <i className="fas fa-map-marker-alt"></i>
                <span>From</span>
              </div>
              <div className="location_right">
                <span>{userProfile.location || 'Chưa có thông tin'}</span>
              </div>
            </div>
            <div className="location">
              <div className="location_left">
                <i className="fas fa-user"></i>
                <span>Member since</span>
              </div>
              <div className="location_right">
                <span className="text">{userProfile.memberSince || 'Chưa có thông tin'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="info_sellercard_bottom">
        <div className="info card">
          <div className="inner_item">
            <div className="inner_row">
              <h3>Description</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <div className="d-flex align-items-center gap-5">
              <h6>Name:</h6>
              <p className="lorem">{userProfile.name || 'Chưa có thông tin'}</p>
            </div>
            <div className="d-flex align-items-center gap-5">
              <h6>Phone:</h6>
              <p className="lorem">{userProfile.phone || 'Chưa có thông tin'}</p>
            </div>
            <div className="d-flex align-items-center gap-5">
              <h6>Birthday:</h6>
              <p className="lorem">{userProfile.birthday || 'Chưa có thông tin'}</p>
            </div>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Languages</h3>
            </div>
            <p className="lorem">{userProfile.languages?.join(', ') || 'Chưa có thông tin'}</p>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Skills</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
              {userProfile.skills?.map(skill => (
                <span key={skill} className="skill-item">{skill}</span>
              )) || 'Chưa có thông tin'}
            </div>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Education</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <p className="lorem">{userProfile.education || 'Chưa có thông tin'}</p>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Certification</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
              {userProfile.certifications?.map(cert => (
                <span key={cert} className="cert-item">{cert}</span>
              )) || 'Chưa có thông tin'}
            </div>
          </div>

          <div className="inner_item" style={{ border: 'none' }}>
            <div className="inner_row">
              <h3>Linked Accounts</h3>
            </div>
            <ul className="ul">
              {/* Thêm nội dung cho các tài khoản đã liên kết */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

