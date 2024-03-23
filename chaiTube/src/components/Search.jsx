import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && navigate(`/search?q=${searchTerm}`)
        }
      />
      <SearchOutlinedIcon
        className={styles.searchIcon}
        onClick={() => navigate(`/search?q=${searchTerm}`)}
      />
    </div>
  );
}
