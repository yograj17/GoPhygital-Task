import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import bcrypt from "bcryptjs";
import userData from "../utils/data.json";
import { data, useNavigate } from "react-router";

const LoginPage = () => {
  const [showPass, setShowpass] = useState(1);
  const [loginData, setloginData] = useState({ email: "", password: "" });

  localStorage.setItem("login", "false");

  const [iserror, seterror] = useState(0);
  const [errormessage, seterrormessage] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getloginData = (e) => {
    const { value, name } = e.target;
    setloginData((pre) => ({ ...pre, [name]: value }));
    seterror(0);
  };

  const passCheck = async (password, hashedPassword, data) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      seterror(1);
      seterrormessage("Invalid password");
    } else if (data.userType == "student") {
      localStorage.setItem("login","true")
      navigate("/student-dashbord", { state: { data } });
    } else if (data.userType == "admin") {
      localStorage.setItem("login","true")
      navigate("/admin-dashbord");
    }
  };

  const submmitData = () => {
    if (!(loginData.password && emailRegex.test(loginData.email))) {
      seterror(1);
      seterrormessage("Invalid Data");
    }
    const user = userData.filter((val) => {
      if (val.email === loginData.email) {
        return val;
      }
    });

    if (user.length == 0) {
      seterror(1);
      seterrormessage("User Invalid");
      return;
    }

    passCheck(loginData.password, user[0].password, user[0]);

  };

  return (
    <div className="bg-white text-black h-[450px] w-[400px] m-auto mt-20 rounded-2xl flex flex-col gap-10 py-8">
      <div className="flex justify-center items-center text-2xl font-semibold ">
        Login page
      </div>
      <div className="flex flex-col gap-4 px-4 relative">
        <div className="flex flex-col gap-1">
          <label className="ml-1.5 text-xl font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="border h-10 px-4 rounded-xl"
            name="email"
            onChange={getloginData}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="ml-1.5 text-xl font-semibold">Password</label>
          <input
            type={showPass ? "password" : "text"}
            placeholder="Enter password"
            className="border h-10 px-4 rounded-xl"
            name="password"
            onChange={getloginData}
          />
        </div>

        {showPass ? (
          <IoEyeSharp
            onClick={() => {
              setShowpass(0);
            }}
            className="h-8 w-6 cursor-pointer absolute bottom-1 right-8"
          />
        ) : (
          <BsEyeSlashFill
            onClick={() => {
              setShowpass(1);
            }}
            className="h-8 w-6 cursor-pointer absolute bottom-1 right-8"
          />
        )}
      </div>
      {iserror ? (
        <div className="mx-4 px-2 text-red-600 font-semibold">
          {errormessage}
        </div>
      ) : (
        false
      )}
      <div
        onClick={submmitData}
        className="border bg-cyan-900 mx-auto w-[350px] rounded-xl text-white h-10 flex justify-center items-center hover:cursor-pointer"
      >
        Log In
      </div>
    </div>
  );
};

export default LoginPage;
