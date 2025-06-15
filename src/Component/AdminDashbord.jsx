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
    <div className="bg-gray-500 h-full relative ">
      <div className="border h-20 flex items-center pl-28 gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border pl-2 bg-white"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div
          className="border w-20 flex justify-center items-center cursor-pointer  bg-green-800 rounded-xl font-semibold"
          onClick={searchHandler}
        >
          Search
        </div>
        <div
          onClick={() => {
            setstudentData(AllstudentData);
            // console.log(AllstudentData);
          }}
          className="border  bg-green-800 rounded-xl font-semibold w-24 flex justify-center items-center cursor-pointer"
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
          className="border absolute cursor-pointer top-6 right-8 h-8 w-28 flex justify-center items-center rounded-xl bg-red-400"
        >
          Back
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-8 right-20 cursor-pointer w-28 h-10 flex justify-center items-center bg-red-400 rounded-xl"
        >
          Log out
        </div>
      )}
      {detailsData ? (
        <div className=" w-1/2 mx-auto flex flex-col gap-5">
          {studentData.map((data, index) => {
            return (
              <div
                key={index}
                className="border bg-gray-300 py-3 rounded-2xl underline flex flex-col gap-1.5 relative px-4 mt-4"
              >
                <div>{data.userName}</div>
                <div>{data.email}</div>
                <div>{data.subjects.join(",")}</div>
                <div
                  onClick={() => {
                    detailsHandler(data);
                  }}
                  className="border absolute right-4 cursor-pointer w-20 flex justify-center items-center h-8 top-8 bg-green-400 rounded-xl"
                >
                  details
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
  );
};

export default AdminDashbord;
