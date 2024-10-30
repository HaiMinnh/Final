"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getUserInfoApi } from '../../action/service/userApi.js';
import styles from '../../scss/profile.scss';

const UserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect để gọi API khi component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) {
        console.error("User ID is not available. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserInfoApi(userId);
        if (data) {
          setUserInfo(data);
        } else {
          console.error("No user information returned");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  // Hiển thị trạng thái loading
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>No user information available</div>;
  }

  return (
    <div className="info">
      <div className="info_sellercard_top">
        <div className="info_card">
          <div className="onl">
            <div className="user_online">
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
                  <p className="text my-0 text-center" style={{ fontSize: '16px' }}>{userInfo.name}</p>
                </div>
              </label>
            </div>
            <div className="info_profile_label">
              <p>{userInfo.email}</p>
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
                <span>{userInfo.location}</span>
              </div>
            </div>
            <div className="location">
              <div className="location_left">
                <i className="fas fa-user"></i>
                <span>Member since</span>
              </div>
              <div className="location_right">
                <span className="text">{userInfo.memberSince}</span>
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
              <p className="lorem">{userInfo.name}</p>
            </div>
            <div className="d-flex align-items-center gap-5">
              <h6>Phone:</h6>
              <p className="lorem">{userInfo.phone}</p>
            </div>
            <div className="d-flex align-items-center gap-5">
              <h6>Birthday:</h6>
              <p className="lorem">{userInfo.birthday}</p>
            </div>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Languages</h3>
            </div>
            {userInfo.languages.length > 0 ? (
              userInfo.languages.map((lang, index) => (
                <p className="lorem" key={index}>
                  {lang.name} <span>{lang.level}</span>
                </p>
              ))
            ) : (
              <p>No languages listed</p>
            )}
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Skills</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
              {userInfo.skills.length > 0 ? (
                userInfo.skills.map((skill, index) => (
                  <span key={index} className="skill">{skill}</span>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </div>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Education</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <p className="lorem">{userInfo.education}</p>
          </div>

          <div className="inner_item">
            <div className="inner_row">
              <h3>Certification</h3>
              <button className="edit">
                <FontAwesomeIcon icon={faPen} className="icon" />
              </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
              {userInfo.certifications.length > 0 ? (
                userInfo.certifications.map((cert, index) => (
                  <span key={index} className="cert">{cert}</span>
                ))
              ) : (
                <p>No certifications listed</p>
              )}
            </div>
          </div>

          <div className="inner_item" style={{ border: 'none' }}>
            <div className="inner_row">
              <h3>Linked Accounts</h3>
            </div>
            <ul className="ul">
              {userInfo.linkedAccounts.length > 0 ? (
                userInfo.linkedAccounts.map((account, index) => (
                  <li className="li" key={index}>
                    <a href={account.link} className="btn-connect">{account.platform}</a>
                  </li>
                ))
              ) : (
                <li>No linked accounts</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
