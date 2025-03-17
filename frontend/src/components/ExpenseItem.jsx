import "../styles/ExpenseItem.css";

const ExpenseItem = ({ title, amount, date }) => {
  return (
    <div className="expense-item">
      <h2 className="expense-title">{title}</h2>
      <p className="expense-date">{date}</p>
      <p className="expense-amount">${amount}</p>
    </div>
  );
};

export default ExpenseItem;
