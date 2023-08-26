import React, { useEffect, useState } from "react";
import normal from "./AddExpense.module.css";
import dark from "./AddExpenseDark.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchItems } from "../../Api/api";

const AddExpense = () => {
  const authData = useSelector((state) => state.auth);
  const itemsData = useSelector((state) => state.items);

  const isDark = useSelector((state) => state.theme.isDarkTheme);
  const styles = isDark ? dark : normal;

  const modifiedEmail = authData.userEmail.replace(/[.@]/g, "-");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (itemsData.editData.id) {
      setDescription(itemsData.editData.description);
      setAmount(itemsData.editData.amount);
      setCategory(itemsData.editData.category);
      setEditItemId(itemsData.editData.id);
    }
  }, [itemsData.editData]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addItem({
        item: {
          description: description,
          category: category,
          amount: amount,
        },
        email: modifiedEmail,
        id: editItemId,
      })
    );
    setEditItemId(null);
    setDescription("");
    setCategory("");
    setAmount("");
  };

  return (
    <form className={styles.addExpenseForm} onSubmit={handleSubmit}>
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        className={styles.inputField}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className={styles.selectField}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
        <option value="Movie">Movie</option>
      </select>

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmountChange}
        className={styles.inputField}
      />

      <div className={styles["action-div"]}>
        <button type="submit" className={styles.addButton}>
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpense;
