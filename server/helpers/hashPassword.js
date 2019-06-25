import bcrypt from 'bcryptjs';

class HashPassword {
  static async create(password) {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
  static async verify(password, passwordHash) {
    const data = await bcrypt.compareSync(password, passwordHash);
    return data;
  }
}

export default HashPassword;