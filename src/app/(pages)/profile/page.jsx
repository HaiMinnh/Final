"use client";

import React from 'react';
import styles from '../../scss/profile.scss';
import { updateUserInfoApi } from '../../action/service/userApi.js'; // Import hàm call API
import { getUserInfoApi } from '../../action/service/userApi.js'; // Import hàm call API
import UserInfo from '../user/UserInfo'
import { getJobsUserHasHiredApi } from '../../action/service/userApi.js'; // Import hàm call API
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
  

  const GigsList = ({ userId }) => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const data = await getUserGigsApi(userId);
                setGigs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  };
  
  return (
    <div className="main_content my-3">
      <div className="main_wrapper">
        <div className="main_row row ">

          <UserInfo></UserInfo>
          
          <div className="gigs">
            <div className="gigs_card_top">
              <div className="gigs_card ">
                <span className="col-lg-8 col-xl-6 col-8 col-sm-6">
                  It seems that you don't have any active Gigs.
                </span>
                <button className="btn col-lg-3 col-xl-3 col-4 col-sm-4">
                  Create a new Gig
                </button>
              </div>
            </div>
            <div className="gigs_card_bottom">
              <div className="gigs_card">
                <div className="row ">
                  <div className="gigs_card_img">
                    <img className="w-100" src="https://fiverrnew.cybersoft.edu.vn/images/cv17.jpg" alt="..." />
                  </div>
                  <div className="gigs_card_content ">
                    <h1>I will write bulk SEO articles and blog posts</h1>
                    <p>
                      "1000 Words US$5 2x500 words or 1x1000 Words articles 1 Day Delivery Up to 1,000 words SEO keywords"
                    </p>
                    <div className="d-flex justify-content-between danhgia ">
                      <div className="left">
                        <svg
                          className="svg-inline--fa fa-star"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          data-fa-i2svg
                        >
<path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>                        </svg>
                        <span className="saoCV">2</span>
                        <span className="danhGia">(91)</span>
                      </div>
                      <div className="right">
                        <p className="giaTien">$5</p>
                      </div>
                    </div>
                  </div>
                  <div className="btn_edit ">
                    <button className="viewdetail">
                      <a className="text-light" href="/jobDetail/17">View detail</a>
                    </button>
                    <div className="right">
                      <button className="delete">DEL</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
