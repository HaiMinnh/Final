'use client';

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faUser} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import UpdateUserForm from './_components/UpdateUserInfo';
import {useRouter} from 'next/navigation';
import {getUserInfoApi} from '@/app/action/service/userApi';
import {Button} from 'react-bootstrap';
import Gigs from './_components/Gigs';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const fetchUserData = async (userId) => {
        const userInfo = await getUserInfoApi(userId);

        setUser(userInfo);
    };

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('fiverrUserId');

        if (!loggedInUserId) {
            router.push('/login');
        }

        // call the function
        fetchUserData(loggedInUserId)
            // make sure to catch any error
            .catch(console.error);
    }, [router]);

    if (!user) {
        return (
            <section
                className=""
                style={{
                    height: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                }}>
                Loading User Information...
            </section>
        );
    }

    return (
        <section className="main_content">
            <div className="main_wrapper my-5">
                <div className="main_row row">
                    <div className="info">
                        <InfoCardTop user={user} setUser={setUser} />
                        <InfoCardBottom user={user} />
                    </div>
                    <Gigs />
                </div>
            </div>
        </section>
    );
};

const InformationModal = ({user, setUser}) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <button className="edit" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faPen} className="icon" />
            </button>

            <Modal
                show={modalShow}
                size="lg"
                onHide={() => setModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <UpdateUserForm
                        setUser={setUser}
                        user={user}
                        setModalShow={setModalShow}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

const InfoCardTop = ({user, setUser}) => {
    return (
        <div className="info_sellercard_top">
            <div className="info_card">
                <OnlineStatus />
                <ProfileInfo user={user} setUser={setUser} />
                <ProfileDescription user={user} setUser={setUser} />
            </div>
        </div>
    );
};

const OnlineStatus = () => (
    <div className="onl">
        <div className="user_online">
            <i className="dot">·</i>Online
        </div>
    </div>
);

const ProfileInfo = ({user, setUser}) => {
    return (
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
                        <p
                            className="text my-0 text-center"
                            style={{fontSize: '16px'}}>
                            {user.name}
                        </p>
                    </div>
                </label>
            </div>
            <div className="info_profile_label d-flex">
                <p>{user.email}</p>
                <div className="btn_update">
                    <InformationModal user={user} setUser={setUser} />
                </div>
            </div>
        </div>
    );
};

const ProfileDescription = ({user}) => (
    <div className="info_desc">
        <div className="location">
            <div className="location_left">
                <i className="las la-map-marker-alt icon"></i>
                <span> From</span>
            </div>
            <div className="location_right">
                <span>Vietnam</span>
            </div>
        </div>
        <div className="location">
            <div className="location_left">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span> Member since</span>
            </div>
            <div className="location_right">
                <span className="text">Oct2022</span>
            </div>
        </div>
    </div>
);

const InfoCardBottom = ({user, setUser}) => (
    <div className="info_sellercard_bottom">
        <div className="info_card">
            <Description user={user} setUser={setUser} />
            <Languages />
            <Skills user={user} setUser={setUser} />
            <Education user={user} setUser={setUser} />
            <Certification user={user} setUser={setUser} />
            <LinkedAccounts />
        </div>
    </div>
);

const Description = ({user, setUser}) => (
    <div className="inner_item">
        <div className="inner_row">
            <h3>Description</h3>
            <InformationModal user={user} setUser={setUser} />
        </div>
        <div className="d-flex align-items-center gap-5">
            <h6>Name:</h6>
            <p className="lorem">{user.name}</p>
        </div>
        <div className="d-flex align-items-center gap-5">
            <h6>Phone:</h6>
            <p className="lorem">{user.phone}</p>
        </div>
        <div className="d-flex align-items-center gap-5">
            <h6>Birthday:</h6>
            <p className="lorem">{user.birthday}</p>
        </div>
    </div>
);

const Languages = () => (
    <div className="inner_item">
        <div className="inner_row">
            <h3>Languages</h3>
        </div>
        <p className="lorem">
            English - <span>Basic</span>
        </p>
        <p className="lorem">
            Vietnamese (Tiếng Việt) - <span>Native/Bilingual</span>
        </p>
    </div>
);

const Skills = ({user, setUser}) => (
    <div className="inner_item">
        <div className="inner_row">
            <h3>Skills</h3>
            <InformationModal user={user} setUser={setUser} />
        </div>
        <div className="d-flex flex-row flex-wrap align-items-baseline">
            <p className="lorem px-2">{user.skill}</p>
        </div>
    </div>
);

const Education = () => (
    <div className="inner_item">
        <div className="inner_row">
            <h3>Education</h3>
        </div>
        <p className="lorem"> CYBERSOFT</p>
    </div>
);

const Certification = ({user, setUser}) => (
    <div className="inner_item">
        <div className="inner_row">
            <h3>Certification</h3>
            <InformationModal user={user} setUser={setUser} />
        </div>
        <div className="d-flex flex-row flex-wrap align-items-baseline">
            <p className="lorem px-2">{user.certification}</p>
        </div>
    </div>
);

const LinkedAccounts = () => {
    const router = useRouter();
    const signOut = () => {
        localStorage.removeItem('fiverrUserId');
        localStorage.removeItem('fiverrUserToken');
        router.push('/login');
    };

    return (
        <div>
            <div className="inner_item" style={{border: 'none'}}>
                <div className="inner_row">
                    <h3>Linked Accounts</h3>
                </div>
                <ul className="ul ps-0">
                    <SocialLink icon="facebook" name="Facebook" />
                    <SocialLink icon="google" name="Google" className="cl-gg" />
                    <SocialLink icon="github" name="Github" />
                    <SocialLink icon="twitter" name="Twitter" />
                    <SocialLink icon="plus" name="Dirbble" />
                    <SocialLink icon="plus" name="Stack Overflow" />
                </ul>
            </div>

            <Button variant="danger" onClick={signOut}>
                Sign Out
            </Button>
        </div>
    );
};

const SocialLink = ({icon, name, className = ''}) => (
    <li className="li">
        <SocialIcon icon={icon} />
        <a href="#" className={`btn-connect ${className}`}>
            {name}
        </a>
    </li>
);

const SocialIcon = ({icon}) => {
    switch (icon) {
        case 'facebook':
            return <FacebookIcon />;
        case 'google':
            return <GoogleIcon />;
        case 'github':
            return <GithubIcon />;
        case 'twitter':
            return <TwitterIcon />;
        case 'plus':
            return <PlusIcon />;
        default:
            return null;
    }
};

const FacebookIcon = () => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
    </svg>
);

const GoogleIcon = () => (
    <span role="img" aria-label="google" className="anticon anticon-google">
        <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="google"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true">
            <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"></path>
        </svg>
    </span>
);

const GithubIcon = () => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 496 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
    </svg>
);

const TwitterIcon = () => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568  130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
    </svg>
);

const PlusIcon = () => (
    <span role="img" aria-label="plus" className="anticon anticon-plus">
        <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="plus"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true">
            <defs>
                <style></style>
            </defs>
            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
            <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
        </svg>
    </span>
);

export default UserProfile;
