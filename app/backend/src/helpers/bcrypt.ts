import * as bcrypt from 'bcryptjs';

export const token = {
  encryptPassword: (password: string) => {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },
};

export default token;
