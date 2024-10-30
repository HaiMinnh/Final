import { TokenCyber } from "./tokenCyber";

export const getAllUserApi = async () => {
    try {
        const res = await fetch('https://fiverrnew.cybersoft.edu.vn/api/users', {
            headers: {
                tokenCybersoft: TokenCyber,
            },
            next: { revalidate: 30 }
        });
        const data = await res.json();
        console.log(data)
        return data.content;
    } catch (error) {
        alert("Don't get Data from Api")
    }
}

export const searchUserApi = async (keyword) => {
    try {
        const res = await fetch(`https://fiverrnew.cybersoft.edu.vn/api/users/search/${keyword}`, {
            headers: {
                tokenCybersoft: TokenCyber,
            },
            next: { revalidate: 30 }
        });
        const data = await res.json();
        console.log(data)
        return data.content;
    } catch (error) {
        alert("Don't get Data from Api")
    }
}

export const deleteUserApi = async (id) => {
    try {
        const res = await fetch(`https://fiverrnew.cybersoft.edu.vn/api/users?id=${id}`, {
            method: 'DELETE',
            headers: {
                tokenCybersoft: TokenCyber,
            },
            next: { revalidate: 30 }
        });
        const data = await res.json();
        return data.content;
    } catch (error) {
        alert("Delete User Api")
    }
}

//minh

// hàm Signup

export const signupUserApi = async (userInfo) => {
    try {
        const res = await fetch('https://fiverrnew.cybersoft.edu.vn/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                tokenCybersoft: TokenCyber,
            },
            body: JSON.stringify(userInfo),
        });
        if (!res.ok) {
            const errorData = await res.json(); 
            throw new Error(errorData.content || `Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Đăng ký thành công:", data);
        alert("Đăng ký thành công!"); 
        return data.content; 

    } catch (error) {
        alert(error.message || "Không thể đăng ký người dùng từ API");
        console.error(error);
    }
};


//Hàm signin

export const signinUserApi = async (userInfo) => {
    try {
        const res = await fetch('https://fiverrnew.cybersoft.edu.vn/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                tokenCybersoft: TokenCyber,
            },
            body: JSON.stringify(userInfo),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Đăng nhập thành công:", data);
        alert("Đăng nhập thành công!");

         // Lưu thông tin vào localStorage
         const userId = data.content.user.id; // Giả sử API trả về userId trong content.user
         const token = data.content.token; // Giả sử API trả về token
         const role = data.content.user.role; // Giả sử API trả về role trong content.user
 
         // Lưu thông tin vào localStorage
         localStorage.setItem('userId', userId); 
         localStorage.setItem('token', token);
         localStorage.setItem('role', role);

        return data.content; 
    } catch (error) {
        alert("Tài khoản chưa đăng kí");
        console.error(error);
    }
};




//profile

// hàm lấy thông tin người dùng
export const getUserInfoApi = (userId = getStore('userId')) => {
    return async (dispatch) => {
      try {
        const res = await fetch(`https://fiverrnew.cybersoft.edu.vn/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            tokenCybersoft: TokenCyber, // Đảm bảo có token nếu cần thiết
          },
        });
  
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
  
        const data = await res.json();
        const action = getUserInfoAction(data.content); // Tạo action để dispatch
        dispatch(action);
        setStoreJson('USER_LOGIN', data.content); // Lưu thông tin vào localStorage
      } catch (err) {
        console.log(err);
      }
    };
  };

// hàm cập nhật thông tin profile
export const updateUserInfoApi = async (userId, userInfo) => {
    const res = await fetch(`https://fiverrnew.cybersoft.edu.vn/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            tokenCybersoft: TokenCyber,
        },
        body: JSON.stringify(userInfo),
    });

    if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data.content;
};



//hàm lấy danh sach cong viec

export const getJobsUserHasHiredApi = async () => {
    const res = await fetch(`https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/lay-danh-sach-da-thue`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            tokenCybersoft: TokenCyber, 
        },
    });

    if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data.content;
};


