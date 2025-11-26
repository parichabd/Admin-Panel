import { useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTitle } from "../Hooks/useTitle";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toPersian } from "../Hooks/authMessages";

import "react-toastify/dist/ReactToastify.css";
import styles from "./LoginPage.module.css";

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
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
    case "TOGGLE_SHOW_CONFIRM_PASSWORD":
      return {
        ...state,
        showConfirmPassword: !state.showConfirmPassword,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function RegisterPage() {
  useTitle("Register");
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const goToSignIn = () => {
    navigate("/sign-in");
  };

  const isPhoneNumber = (str) => /^[0-9]{8,15}$/.test(str);

  const validate = () => {
    const { username, password, confirmPassword } = state;

    if (!username || !password || !confirmPassword) {
      toast.error("لطفاً همه فیلدها را پر کنید.");
      return false;
    }

    if (isPhoneNumber(username)) {
      toast.error("نام کاربری نمی‌تواند شماره تلفن باشد.");
      return false;
    }

    if (password.length < 8) {
      toast.error("رمز عبور باید حداقل 8 کاراکتر باشد.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن باید یکسان باشند.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const registerResponse = await fetch(
        "http://localhost:3000/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: state.username,
            password: state.password,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        toast.error(toPersian(registerData.message) || "ثبت نام با خطا مواجه شد.");

        if (registerData.message === "Username already exists") {
          setTimeout(() => {
            navigate("/sign-in");
          }, 1500);
        }

        return;
      }

      const loginResponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: state.username,
          password: state.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        toast.error(toPersian(loginData.message) || "ورود خودکار با خطا مواجه شد.");
        return;
      }

      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
      }

      toast.success("ثبت نام و ورود موفقیت‌آمیز بود!");
      dispatch({ type: "RESET" });

      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (err) {
      toast.error("ارتباط با سرور برقرار نشد.");
      console.error(err);
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
        <h2 className={styles.title}>فرم ثبت نام</h2>

        <div className={styles.inputs}>
          <input
            name="username"
            type="text"
            placeholder="نام کاربری"
            value={state.username}
            onChange={handleChange}
          />

          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "20px",
                color: "#555",
                padding: 0,
              }}
            >
              {state.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>

            <input
              name="password"
              type={state.showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={state.password}
              onChange={handleChange}
              style={{ paddingLeft: "35px" }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_SHOW_CONFIRM_PASSWORD" })}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "20px",
                color: "#555",
                padding: 0,
              }}
            >
              {state.showConfirmPassword ? (
                <AiFillEyeInvisible />
              ) : (
                <AiFillEye />
              )}
            </button>

            <input
              name="confirmPassword"
              type={state.showConfirmPassword ? "text" : "password"}
              placeholder="تکرار رمز عبور"
              value={state.confirmPassword}
              onChange={handleChange}
              style={{ paddingLeft: "35px" }}
            />
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          ثبت نام
        </button>

        <p className={styles.linkWrapper} onClick={goToSignIn}>
          <a className={styles.link} href="#">
            حساب کاربری دارید؟
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
