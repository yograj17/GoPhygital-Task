import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import bcrypt from "bcryptjs";
import userData from "../utils/data.json";
import { data, useNavigate } from "react-router";

const LoginPage = () => {
  const [showPass, setShowpass] = useState(1);
  const [loginData, setloginData] = useState({ email: "", password: "" });
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
      navigate("/student-dashbord", { state: { data } });
    } else if (data.userType == "admin") {
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
    <div className="border bg-gray-300 h-96 w-md m-auto mt-20 rounded-2xl flex flex-col gap-10 py-8">
      <div className="flex justify-center items-center text-2xl font-semibold ">
        Login page
      </div>
      <div className="flex flex-col gap-4 px-4 relative">
        <input
          type="email"
          placeholder="Email"
          className="border h-10 px-4"
          name="email"
          onChange={getloginData}
        />
        <input
          type={showPass ? "password" : "text"}
          placeholder="Password"
          className="border h-10 px-4"
          name="password"
          onChange={getloginData}
        />
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
        className="border bg-red-500 mx-auto w-34 h-10 flex justify-center items-center hover:cursor-pointer"
      >
        Log In
      </div>
    </div>
  );
};

export default LoginPage;
