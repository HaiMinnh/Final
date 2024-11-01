import {TokenCyber} from './tokenCyber';

export const getAllUserApi = async () => {
    try {
        const res = await fetch(
            'https://fiverrnew.cybersoft.edu.vn/api/users',
            {
                headers: {
                    tokenCybersoft: TokenCyber,
                },
                next: {revalidate: 30},
            }
        );
        const data = await res.json();
        console.log(data);
        return data.content;
    } catch (error) {
        alert("Don't get Data from Api");
    }
};

export const searchUserApi = async (keyword) => {
    try {
        const res = await fetch(
            `https://fiverrnew.cybersoft.edu.vn/api/users/search/${keyword}`,
            {
                headers: {
                    tokenCybersoft: TokenCyber,
                },
                next: {revalidate: 30},
            }
        );
        const data = await res.json();
        console.log(data);
        return data.content;
    } catch (error) {
        alert("Don't get Data from Api");
    }
};

export const deleteUserApi = async (id) => {
    try {
        const res = await fetch(
            `https://fiverrnew.cybersoft.edu.vn/api/users?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    tokenCybersoft: TokenCyber,
                },
                next: {revalidate: 30},
            }
        );
        const data = await res.json();
        return data.content;
    } catch (error) {
        alert('Delete User Api');
    }
};

//minh

// hàm Signup

export const signupUserApi = async (userInfo) => {
    try {
        const res = await fetch(
            'https://fiverrnew.cybersoft.edu.vn/api/auth/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    tokenCybersoft: TokenCyber,
                },
                body: JSON.stringify(userInfo),
            }
        );
        if (res.status !== 200) {
            const errorData = await res.json();
            throw new Error(errorData.content || `Error: ${res.status}`);
        }

        const data = await res.json();
        console.log('Đăng ký thành công:', data);
        alert('Đăng ký thành công!');
        return data.content;
    } catch (error) {
        alert(error.message || 'Không thể đăng ký người dùng từ API');
        console.error(error);
    }
};

//Hàm signin

export const signinUserApi = async (userInfo) => {
    try {
        const res = await fetch(
            'https://fiverrnew.cybersoft.edu.vn/api/auth/signin',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    tokenCybersoft: TokenCyber,
                },
                body: JSON.stringify(userInfo),
            }
        );

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        console.log('Đăng nhập thành công:', data);
        alert('Đăng nhập thành công!');

        return data.content;
    } catch (error) {
        alert('Sai tài khoản hoặc mật khẩu');
        console.error(error);
    }
};

//profile

// hàm lấy thông tin người dùng
export const getUserInfoApi = async (userId) => {
    try {
        const res = await fetch(
            `https://fiverrnew.cybersoft.edu.vn/api/users/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    tokenCybersoft: TokenCyber, // Đảm bảo có token nếu cần thiết
                },
            }
        );

        // if (!res.statusCode !== 200) {
        //     throw new Error(`Error: ${res.status}`);
        // }

        const data = await res.json();

        return data.content;
    } catch (err) {
        console.log(err);
    }
};

// hàm cập nhật thông tin profile
export const updateUserInfoApi = async (userId, userInfo) => {
    try {
        const res = await fetch(
            `https://fiverrnew.cybersoft.edu.vn/api/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    tokenCybersoft: TokenCyber,
                },
                body: JSON.stringify(userInfo),
            }
        );

        // if (!res.ok) {
        //     throw new Error(`Error: ${res.status}`);
        // }

        const data = await res.json();
        console.log(data);
        return data.content;
    } catch (error) {
        console.log('error', error);
    }
};

//hàm lấy danh sach cong viec

export const getJobsUserHasHiredApi = async (token) => {
    try {
        const res = await fetch(
            `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/lay-danh-sach-da-thue`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    tokenCybersoft: TokenCyber,
                    token,
                },
            }
        );

        // if (!res.ok) {
        //     throw new Error(`Error: ${res.status}`);
        // }

        const data = await res.json();
        return data.content;
    } catch (error) {
        console.log('error', error);
    }
};

export const removeJobById = async (token, id) => {
    try {
        const res = await fetch(
            `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    tokenCybersoft: TokenCyber,
                    token,
                },
            }
        );

        const data = await res.json();
        return data.content;
    } catch (error) {
        console.log('error', error);
    }
};
