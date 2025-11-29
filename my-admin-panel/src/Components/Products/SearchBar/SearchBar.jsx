// SearchBar.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useTitle } from "../../../Hooks/useTitle";
import { UserContext } from "../../../context/UserProvider";
import AvatarImg from "../../../assets/icons/icon-7797704_640.png";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch = () => {} }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useTitle("Products");

  const displayName = user.name || "کاربر";
  const displayAvatar = user.avatar || AvatarImg;

  const handleUserBoxClick = () => {
    navigate("/complete-profile");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <span className={styles.icon}>
          <CiSearch size={28} color={"#282828c6"} />
        </span>
        <input
          type="text"
          placeholder="جستوجو کالا"
          className={styles.input}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div
        className={styles.userBox}
        onClick={handleUserBoxClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && handleUserBoxClick()}
      >
        <img src={displayAvatar} alt="آواتار" className={styles.avatar} />
        <div className={styles.text}>
          <span className={styles.name}>{displayName}</span>
          <span className={styles.role}>{user.role || "مدیر"}</span>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
