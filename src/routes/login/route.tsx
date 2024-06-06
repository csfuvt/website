import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import styles from './LogInPage.module.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { md5 } from 'js-md5';
import { useAuth } from '../../hooks/useAuth.ts';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.isLoggedIn) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: LogInPage,
});

interface LogIn {
  email: string;
  password: string;
}

function LogInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LogIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LogIn> = data => {
    axios
      .post('/auth/login', {
        email: data.email,
        password: md5(data.password),
      })
      .then(({ data: { access_token } }) => {
        signIn(access_token);
        navigate({ to: '/' });
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Log In</h1>
        <form>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                value={value}
                onChange={onChange}
                type="email"
                placeholder="E-mail"
                required
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                value={value}
                onChange={onChange}
                type="password"
                placeholder="Password"
                required
              />
            )}
          />
          {/*<a href="#forgot" className={styles.forgotPassword}>*/}
          {/*  Forgot your password?*/}
          {/*</a>*/}
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
