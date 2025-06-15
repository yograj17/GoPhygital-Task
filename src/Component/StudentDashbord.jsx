import React from "react";
import { useLocation, useNavigate } from "react-router";

const StudentDashbord = ({ detailsData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.data || detailsData;

  return (
    <div className="relative pt-28 bg-gray-500 h-screen">
      <div className="border h-1/2 bg-gray-200 w-[400px] mx-auto  flex flex-col gap-2 p-6 font-semibold text-xl rounded-2xl">
        <div className="border-b ">{data.userName}</div>
        <div className="border-b ">{data.address}</div>
        <div className="border-b ">{data.email}</div>
        <div className="border-b ">{data.userType}</div>
        <div className="border-b ">{data.standard}</div>
        <div className="border-b ">{data.language}</div>
        <div className="border-b ">
          {data.subjects.map((key, index) => {
            return (
              <span key={index} className="mr-2">
                {key},
              </span>
            );
          })}
        </div>
      </div>
      {location.state?.data ? (
        <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-8 right-20 cursor-pointer w-28 h-10 flex justify-center items-center bg-red-400 rounded-xl"
        >
          Log out
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default StudentDashbord;
