import ExpenseItem from "./components/ExpenseItem";
import LandingPage from "./Loading";
import "./index.css";
import HomePage from "./components/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* <LandingPage /> */}
      <div className="mt-10">
        {/* <ExpenseItem title="Groceries" amount="50" date="2025-03-17" /> */}
        {/* <ExpenseItem title="Transport" amount="90" date="2025-03-17" /> */}
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
