// Importação das dependências.
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Definindo o Esquema de Usuário.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Criptografando senha do usuário.
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

// Definindo o Model para a constante User.
const User = mongoose.model('User', UserSchema);

// Importando o Model para ser utilizado na aplicação.
export default User;
