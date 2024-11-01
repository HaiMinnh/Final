import {signinUserApi} from '@/app/action/service/userApi';

//Register
export const validateForm = (formData) => {
    const errors = {};

    // Kiểm tra tên
    if (!formData.name) {
        errors.name = 'Tên là bắt buộc.';
    }

    // Kiểm tra email
    if (!formData.email) {
        errors.email = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Địa chỉ email không hợp lệ.';
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
        errors.password = 'Mật khẩu là bắt buộc.';
    } else if (formData.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }

    // Kiểm tra xác nhận mật khẩu
    if (!formData.passwordConfirm) {
        errors.passwordConfirm = 'Xác nhận mật khẩu là bắt buộc.';
    } else if (formData.password !== formData.passwordConfirm) {
        errors.passwordConfirm = 'Mật khẩu không khớp.';
    }

    // Kiểm tra số điện thoại
    if (!formData.phone) {
        errors.phone = 'Số điện thoại là bắt buộc.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ (10 chữ số).';
    }

    // Kiểm tra ngày sinh
    if (!formData.birthday) {
        errors.birthday = 'Ngày sinh là bắt buộc.';
    }

    // Kiểm tra chấp nhận điều khoản
    if (formData?.['agree-term'] !== 'on') {
        errors['agree-term'] = 'Bắt buộc chấp nhận điều khoản.';
    }

    return errors;
};

//SignIn

export const validateLoginForm = (formData) => {
    const errors = {};

    // Kiểm tra email
    if (!formData.email) {
        errors.email = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Địa chỉ email không hợp lệ.';
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
        errors.password = 'Mật khẩu là bắt buộc.';
    } else if (formData.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }

    return errors;
};
