import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import { useTitle } from "../Hooks/useTitle";

function Welcome() {
  useTitle("Welcome Page");
  const navigate = useNavigate();
  const LoginHandler = () => {
    navigate("/Log-in");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Manage your products with confidence</p>
        <button className={styles.button} onClick={LoginHandler}>
          Log in
        </button>
      </div>
    </div>
  );
}

export default Welcome;
