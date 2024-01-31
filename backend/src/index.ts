import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import { users } from './data/mock/users.js';
import { product_img } from './data/mock/product_img.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors())

const JWT_SECRET = 'test-key';

const verifyToken = (req: Request, res: Response, next: () => void) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.userId = (decoded as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (users.some(u => (u.email === email))) {
    return res.status(400).json({ message: 'name is already taken' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected endpoint', user: users.find(u => u.id === req.body.userId) });
});

app.get('/all', (req, res) => {
  res.json({user: users});
})

app.get('/allx', verifyToken, (req, res) => {
  res.json({user: users});
})

app.get('/products', (req, res) => {
  res.json(product_img);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});