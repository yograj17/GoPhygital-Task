import { useState } from "react";
import data from "../utils/data.json";
import StudentDashbord from "./StudentDashbord";
import { useNavigate } from "react-router";

const AdminDashbord = () => {
  const [detailsData, setdetailsData] = useState(1);
  const [moreDetails, setmoreDetails] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [studentData, setstudentData] = useState(
    data.filter((data) => data.userType != "admin")
  );

  const navigate = useNavigate();
  const AllstudentData = data.filter((data) => data.userType != "admin");

  const detailsHandler = (data) => {
    setdetailsData(0);
    setmoreDetails(data);
  };

  const searchHandler = () => {
    // console.log(searchValue);
    const filterData = data.filter(
      (key) =>
        (key.userName.toLowerCase().includes(searchValue.toLowerCase()) &&
          key.userName != "Admin") ||
        key.subjects.some((data) =>
          data.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
    setstudentData(filterData);
    // console.log(filterData);
  };

  return (
    <div className="bg-purple-300 h-full">
      <div className="w-3/5 m-auto h-full relative p-8 rounded-4xl bg-purple-200">
        <div className="h-20 flex items-center  gap-8">
          <input
            type="text"
            placeholder="Search"
            className="border pl-2 bg-white h-8 rounded-sm"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div
            className="w-28 h-8 flex justify-center items-center cursor-pointer text-white  bg-green-800 rounded-sm font-semibold"
            onClick={searchHandler}
          >
            Search
          </div>
          <div
            onClick={() => {
              setstudentData(AllstudentData);
              // console.log(AllstudentData);
            }}
            className="bg-green-800 rounded-sm w-28 h-8 font-semibold text-white flex justify-center items-center cursor-pointer"
          >
            All Data
          </div>
        </div>
        {!detailsData ? (
          <div
            onClick={() => {
              setdetailsData(1);
              // console.log(detailsData);
            }}
            className="absolute top-14 font-bold right-12 cursor-pointer w-28 h-8 flex justify-center items-center bg-red-400 rounded-sm text-white"
          >
            Back
          </div>
        ) : (
          <div
            onClick={() => {
              navigate("/");
            }}
            className="absolute top-14 font-bold right-12 cursor-pointer w-28 h-8 flex justify-center items-center bg-red-400 rounded-sm text-white"
          >
            Log out
          </div>
        )}
        {detailsData ? (
          <div className=" mx-auto flex flex-col gap-5">
            {studentData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="bg-white py-3 rounded-2xl flex flex-col gap-1 relative px-4 mt-4"
                >
                  <div className="font-semibold ">{data.userName}</div>
                  <div>{data.email}</div>
                  <div>{data.subjects.join(",")}</div>
                  <div
                    onClick={() => {
                      detailsHandler(data);
                    }}
                    className="absolute right-4 cursor-pointer w-28  flex justify-center items-center h-8 top-8 bg-green-400 rounded-sm text-white font-bold"
                  >
                    Details
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <StudentDashbord
            detailsData={moreDetails}
            setdetailsData={setdetailsData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashbord;
