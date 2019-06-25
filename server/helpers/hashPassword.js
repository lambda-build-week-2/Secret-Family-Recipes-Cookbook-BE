import bcrypt from 'bcryptjs';

class HashPassword {
  static async create(password) {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
}

export default HashPassword;