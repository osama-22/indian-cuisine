import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { Button, makeStyles} from '@fluentui/react-components'

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
    marginBottom: '12rem'
  },
  toggleContainer: {
    marginTop: '10px',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#0078d4',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
})

const LoginRegister = () => {
  // State to track if the user is viewing the Login or Register form
  const [isLogin, setIsLogin] = useState(true);
  const styles = useStyles();

  // Function to toggle between Login and Register
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        {isLogin ? <Login /> : <Register />}

        {/* Toggle between Login and Register */}
        <div className={styles.toggleContainer}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <Button className={styles.toggleButton} onClick={toggleForm}>
                Register here
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Button className={styles.toggleButton} onClick={toggleForm}>
                Login here
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
