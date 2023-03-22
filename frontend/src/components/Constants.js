import * as CryptoJS from 'crypto-js';

export const decryptPassword = (password) => {
    const decrypted = CryptoJS.AES.decrypt(password, 'thisissecretpassword');
    if (decrypted) {
        try {
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
                return str;
            } else {
                return 'error 1';
            }
        } catch (e) {
            return 'error 2';
        }
    }
    return 'error 3';
}