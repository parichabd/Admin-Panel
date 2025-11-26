import { useTitle } from "../Hooks/useTitle";
import { useNavigate } from "react-router-dom";

import styles from "./PageNotFound.module.css";

function PageNotfound() {
  useTitle("Page Not Found!");
  const navigate = useNavigate();
  const pageHandler = () => {
    navigate("/");
  };
  return (
    <div className={styles.PageNotfound}>
      <div className={styles.page404}>
        <h1>!</h1>
        <p>ما همه جارو جستو جو کردیم ولی صفحه ی مورد نظر یافت نشد!</p>
        <p>آیا از صحت لینکی که وارد کرده اید مطمئن هستید!</p>
        <button onClick={pageHandler}>بازگشت</button>
      </div>
    </div>
  );
}

export default PageNotfound;
