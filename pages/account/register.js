import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!');
      return;
    }

    register({ username, email, password });
  };

  useEffect(() => {
    error && toast.error(error);
  }, []);

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Emali Address</label>
            <input
              type="email"
              id="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              autoComplete="current-password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Have An Account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
