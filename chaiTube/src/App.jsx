import { Outlet } from "react-router-dom";
import styles from "./app.module.css";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { userContext } from "./Context/userContext";
const HOST_PORT = import.meta.env.HOST_PORT;

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(HOST_PORT + "/auth/getUser");
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          console.log(`Request failed with status code ${response.status}`);
        }
      } catch (error) {
        console.log(`Request failed with error: ${error.message}`);
      }
    };
    getUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <TopBar />
      <div className={styles.Body}>
        <Navbar className={styles.Navbar} />
        <Outlet className={styles.Outlet} />
      </div>
    </userContext.Provider>
  );
}

export default App;
