// auth.service.js
// import axios from 'axios';

import bcrypt from 'bcryptjs';

export const hashPassword = (phone2, password) => {
    const saltRounds = parseInt(phone2, 10)%3+10;
    return bcrypt.hashSync(password, saltRounds);
};