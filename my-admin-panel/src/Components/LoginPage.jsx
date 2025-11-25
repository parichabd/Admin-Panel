import { useTitle } from "../Hooks/useTitle";
import styles from "./LoginPage.module.css";

function LoginPage() {
  useTitle("Login Page");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>بوت‌کمپ بوتواستارت</h1>
      </div>

      <div className={styles.card}>
        <img className={styles.logo} src="/Union.png" alt="" />
        <h2 className={styles.title}>فرم ثبت نام</h2>

        <div className={styles.inputs}>
          <input type="text" placeholder="نام کاربری" />
          <input type="password" placeholder="رمز عبور" />
          <input type="password" placeholder="تکرار رمز عبور" />
        </div>

        <button className={styles.button}>ثبت نام</button>

        <p className={styles.linkWrapper}>
          <a className={styles.link} href="">
            حساب کاربری دارید؟
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
