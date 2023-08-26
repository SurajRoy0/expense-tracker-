import normal from "./Home.module.css";
import dark from "./HomeDark.module.css";
import AddExpense from "../UI/AddExpense";
import ShowItems from "../UI/ShowItems";
import { useSelector } from "react-redux";
const Home = () => {
  const isDark = useSelector((state) => state.theme.isDarkTheme);
  const styles = isDark ? dark : normal;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to expense tracker</h2>
      <div className={styles["expense-form"]}>
        <AddExpense />
        <ShowItems />
      </div>
    </div>
  );
};

export default Home;
