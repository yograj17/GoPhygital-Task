import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="border border-black h-screen bg-gray-500">
      <Outlet />
    </div>
  );
};

export default App;
