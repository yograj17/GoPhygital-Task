import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="border border-black h-screen bg-purple-300">
      <Outlet />
    </div>
  );
};

export default App;
