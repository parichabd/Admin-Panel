import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTitle } from "../Hooks/useTitle";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toPersian } from "../Hooks/authMessages"; 
import styles from "./SignIn.module.css";

const initialState = {
  username: "",
  password: "",
  showPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "TOGGLE_SHOW_PASSWORD":
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function SignIn() {
  useTitle("Sign In");
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const goToRegister = () => {
    navigate("/register"); 
  };

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { username, password } = state;

    if (!username || !password) {
      toast.error("لطفا همه فیلدها را پر کنید.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(toPersian(data.message)); 
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("ورود موفقیت‌آمیز بود!");
      dispatch({ type: "RESET" });
      setTimeout(() => navigate("/products"), 1500);

    } catch (error) {
      toast.error(toPersian(error.message));
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.header}>
        <h1>بوت‌کمپ بوتواستارت</h1>
      </div>

      <div className={styles.card}>
        <img className={styles.logo} src="/Union.png" alt="لوگو" />
        <h2 className={styles.title}>فرم ورود</h2>

        <div className={styles.inputs}>
          <input
            name="username"
            type="text"
            placeholder="نام کاربری"
            value={state.username}
            onChange={handleChange}
          />

          <div className={styles.passwordWrapper}>
            <input
              name="password"
              type={state.showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={state.password}
              onChange={handleChange}
            />

            <span
              className={styles.eyeBtn}
              onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
            >
              {state.showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          ورود
        </button>

        <p className={styles.linkWrapper} onClick={goToRegister}>
          <a className={styles.link} href="#">
            ایجاد حساب کاربری!
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
