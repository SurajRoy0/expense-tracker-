import React, { useEffect, useState } from "react";

import normal from "./ShowItems.module.css";
import dark from "./ShowItemsDark.module.css";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../Api/api";
import ReportDownload from "./ReportDownload";
import { isPremiumHandler } from "../../Store/themeChange";

const ShowItems = () => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.items);
  const authData = useSelector((state) => state.auth);
  const modifiedEmail = authData.userEmail.replace(/[.@]/g, "-");

  const isDark = useSelector((state) => state.theme.isDarkTheme);
  const styles = isDark ? dark : normal;

  useEffect(() => {
    dispatch(fetchItems(modifiedEmail));
  }, []);

  const totalExpense = itemsData.items
    ? itemsData.items.reduce((curr, item) => curr + +item[1].amount, 0)
    : 0;

  if (totalExpense >= 10000) dispatch(isPremiumHandler(true));
  else dispatch(isPremiumHandler(false));

  return (
    <div className={styles.container}>
      {itemsData.isLoading && <h1>Please Wait ...</h1>}
      {!itemsData.isLoading && (
        <>
          <div className={styles.titleDiv}>
            <h2 className={styles.title}>Total Expense: RS. {totalExpense}</h2>
            <ReportDownload />
          </div>

          <div className={styles.items}>
            {itemsData.items?.map((item) => {
              return <Item key={item[0]} item={item[1]} id={item[0]} />;
            })}
          </div>
        </>
      )}
      {itemsData.isError && (
        <h3>Faild to load data. Please Refresh the page</h3>
      )}
    </div>
  );
};

export default ShowItems;
