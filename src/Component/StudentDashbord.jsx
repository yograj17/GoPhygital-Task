import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FaRegCircleUser } from "react-icons/fa6";

const StudentDashbord = ({ detailsData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.data || detailsData;

  return (
    <div
      className={`relative pt-28 bg-purple-300 ${
        location.state?.data ? "h-screen" : "h-fit"
      } rounded-2xl`}
    >
      <div className="h-[450px] bg-white w-[400px] mx-auto  flex flex-col gap-2 p-6 font-semibold text-xl rounded-2xl">
        <div className="flex justify-center items-center flex-col">
          <FaRegCircleUser className="h-20 w-20" />
          <div className="text-2xl font-bold mt-2">{data.userName}</div>
          <div className="">{data.standard}</div>
        </div>

        <div className="flex gap-4">
          <div className="w-28">Address</div>
          <div className="font-normal">{data.address}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-28">Email</div>
          <div className="font-normal">{data.email}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-28">Role</div>
          <div className="font-normal">{data.userType}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-28">Class</div>
          <div className="font-normal">{data.standard}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-28">Subjects</div>
          <div className="font-normal">
            {data.subjects.map((key, index) => {
              return (
                <span key={index} className="mr-2">
                  {key},
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {location.state?.data ? (
        <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-124 right-170 text-white cursor-pointer w-40 h-10 flex justify-center items-center bg-red-700 rounded-xl"
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
