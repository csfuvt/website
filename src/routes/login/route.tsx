import { createFileRoute } from '@tanstack/react-router';
import styles from './LogInPage.module.css';

const LogInPage = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Log In</h1>
        <form>
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Password" required />
          <a href="#forgot" className={styles.forgotPassword}>
            Forgot your password?
          </a>
          <button type="submit">Log In</button>
          <div className={styles.signupLink}>
            Don’t have an account yet? <a href="#signup">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/login')({
  component: LogInPage,
});

export default LogInPage;
