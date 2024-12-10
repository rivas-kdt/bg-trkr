"use client";
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/Cards/DisplayCards";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
  Ticks,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/Modal/Modal";
import CustomSelect from "@/components/Select/CustomSelect";
import DatePicker from "@/components/Datepicker/Datepicker";
import DateRangePicker from "@/components/Datepicker/DateRangePicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};

export const data = {
  labels: ["TRAINING"],
  datasets: [
    {
      label: "I",
      data: [12000],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "E",
      data: [13500],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white",
      },
    },
    title: {
      display: false,
      text: "Line Chart",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
      },
    },
    y: {
      ticks: {
        color: "white",
      },
    },
  },
};

export const inkData = [12189, 13715, 17265, 15162];
export const bPen = [11189, 14715, 13265, 14162];

export const data2 = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "INK",
      data: inkData,
      borderColor: "rgba(0, 131, 0, 1)",
      backgroundColor: "rgba(0, 131, 0, 1)",
    },
    {
      label: "BPEN",
      data: bPen,
      borderColor: "rgba(255, 121, 128, 1)",
      backgroundColor: "rgba(255, 121, 128, 1)",
    },
  ],
};

export default function Dashboard() {
  const [isModalOpenInc, setIsModalOpenInc] = useState(false);

  const openModalInc = () => setIsModalOpenInc(true);
  const closeModalInc = () => setIsModalOpenInc(false);
  const [isModalOpenExp, setIsModalOpenExp] = useState(false);

  const openModalExp = () => setIsModalOpenExp(true);
  const closeModalExp = () => setIsModalOpenExp(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vercel-postgres-try.vercel.app/api/try/exp_cat');
        
        // Set the fetched data in the state
        setData(response.data);
      } catch (err) {
        // Set error state if there's an issue
        setError(err.message);
      }
    };

    fetchData(); // Call the fetch function

  }, []);
  
  console.log(selectedOption)

  const options = data.map(item => ({
    label: item.cat_name,
    value: item.id,
  }));

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <main className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-[#d2d2d2] bg-[#333333] md:flex-row md:items-start">
        <DateRangePicker
          label="Select Date Range"
          value={dateRange}
          onChange={handleDateRangeChange}
        />
        <div className="mt-4">
          {dateRange.start && dateRange.end ? (
            <p>
              Selected range: {dateRange.start.toLocaleDateString()} -{" "}
              {dateRange.end.toLocaleDateString()}
            </p>
          ) : (
            <p>No range selected</p>
          )}
        </div>
        <Card className={" w-full h-fit bg-[#232323] shadow-lg md:h-[20%]"}>
          <CardHeader className={" font-bold bg-[#232323] md:text-xl"}>
            Test 123
          </CardHeader>
          <CardBody
            className={
              " bg-[#232323] md:h-full flex items-center justify-center"
            }
          >
            <p className="text-5xl font-bold text-center text-[#d2d2d2]">
              #<span className="text-[#d2d2d2] md:text-7xl">23123</span>
            </p>
          </CardBody>
          <CardFooter
            className={` flex justify-center gap-4 items-center bg-[#232323] shadow-lg md:justify-end`}
          >
            <button
              onClick={openModalInc}
              className="flex items-center gap-1 px-4 py-2 text-[#d3e6d1] bg-[#008300] rounded-lg shadow-lg"
            >
              <FaPlus className="w-[20px] h-[20px]" />
              Add
            </button>
            <button className="flex items-center gap-1 px-4 py-2 text-[#d2d2d2] bg-[#001A4D] rounded-lg shadow-lg md:hidden">
              <FaEye className=" w-[20px] h-20[px]" />
              Transactions
            </button>
          </CardFooter>
        </Card>
        {
          //START of INC Modal
        }
        {isModalOpenInc && (
          <Modal onClose={closeModalInc} color={`bg-[#232323]`}>
            <ModalHeader className={`border-black`}>App Card 1</ModalHeader>
            <ModalBody className="text-[#d2d2d2] bg-[#232323]">
              <form>
                <div className="space-y-2 ">
                  <p>Name</p>
                  <input
                    autoComplete="off"
                    type="text"
                    className="w-full p-1 text-black rounded-lg bg-[#d2d2d2]"
                  />
                  <p>Mount</p>
                  <input
                    type="number"
                    className="w-full p-1 text-black rounded-lg bg-[#d2d2d2]"
                  />
                  <div className="flex w-full gap-2">
                    <div className="w-1/2">
                      <p>Category</p>
                      <CustomSelect
                        options={options}
                        value={selectedOption}
                        onChange={handleSelection}
                        labelStyle={`bg-white text-black`}
                        listStyle={` bg-zinc-800 text-[#d2d2d2] z-20 border-black`}
                        size={`w-full`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p>Select Date</p>
                      <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        calendarStyle={` border-black bg-black`}
                        headerStyle={"bg-zinc-800 text-[white]"}
                        bodyStyle={`bg-zinc-800 text-[#d2d2d2]`}
                        size={`w-full`}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter className={`border-t-0`}>
              <button
                onClick={closeModalInc}
                className="px-4 py-2 text-[#d2d2d2] bg-red-500 rounded"
              >
                Close
              </button>
            </ModalFooter>
          </Modal>
        )}
        {
          //END of INC Modal
        }
        <Card className={" w-full h-fit bg-[#232323] md:h-[20%]"}>
          <CardHeader className={" font-bold bg-[#232323] md:text-xl"}>
            Test 123
          </CardHeader>
          <CardBody
            className={
              " bg-[#232323] md:h-full flex items-center justify-center"
            }
          >
            <p className="text-5xl font-bold text-center text-[white]">
              #<span className="text-[#d2d2d2] md:text-7xl">23123</span>
            </p>
          </CardBody>
          <CardFooter
            className={` flex justify-center gap-4 items-center bg-[#232323] shadow-lg md:justify-end`}
          >
            <button
              onClick={openModalExp}
              className="flex items-center gap-1 px-4 py-2 text-[#160506] bg-[#ff7980] rounded-lg shadow-lg"
            >
              <FaPlus className="w-[20px] h-[20px]" />
              Add
            </button>
            <button className="flex items-center gap-1 px-4 py-2 text-[#d2d2d2] bg-[#001A4D] rounded-lg shadow-lg md:hidden">
              <FaEye className=" w-[20px] h-20[px]" />
              Transactions
            </button>
          </CardFooter>
        </Card>
        {
          //START of EXP Modal
        }
        {isModalOpenExp && (
          <Modal onClose={closeModalExp} color={`bg-[#232323]`}>
            <ModalHeader className={`border-black`}>App Card 2</ModalHeader>
            <ModalBody className="text-[#d2d2d2] bg-[#232323]">
              <form>
                <div className="space-y-2 ">
                  <p>Name</p>
                  <input
                    autoComplete="off"
                    type="text"
                    className="w-full p-1 text-black rounded-lg bg-[#d2d2d2]"
                  />
                  <p>Mount</p>
                  <input
                    type="number"
                    className="w-full p-1 text-black rounded-lg bg-[#d2d2d2]"
                  />
                  <div className="flex w-full gap-2">
                    <div className="w-1/2">
                      <p>Category</p>
                      <CustomSelect
                        options={options}
                        value={selectedOption}
                        onChange={handleSelection}
                        labelStyle={`bg-white text-black`}
                        listStyle={` bg-zinc-800 text-[#d2d2d2] z-20 border-black`}
                        size={`w-full`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p>Select Date</p>
                      <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        calendarStyle={` border-black bg-black`}
                        headerStyle={"bg-zinc-800 text-[white]"}
                        bodyStyle={`bg-zinc-800 text-[#d2d2d2]`}
                        size={`w-full`}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter className={`border-t-0`}>
              <button
                onClick={closeModalExp}
                className="px-4 py-2 text-[#d2d2d2] bg-red-500 rounded"
              >
                Close
              </button>
            </ModalFooter>
          </Modal>
        )}
        {
          //END of EXP Modal
        }
        <Card className={" w-full h-fit bg-[#232323] md:h-[20%]"}>
          <CardHeader className={" font-bold bg-[#232323] md:text-xl"}>
            B-Ball
          </CardHeader>
          <CardBody
            className={
              " bg-[#232323] flex items-center justify-center md:h-[192px] md:rounded-b-lg"
            }
          >
            <p className="text-5xl font-bold text-center text-[white]">
              #<span className="text-[#d2d2d2] md:text-7xl">23123</span>
            </p>
          </CardBody>
          <CardFooter
            className={` flex justify-center gap-4 items-center bg-[#232323] shadow-lg md:justify-end md:hidden`}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-[#d2d2d2] bg-[#001A4D] rounded-lg shadow-lg md:hidden">
              <FaEye className=" w-[20px] h-20[px]" />
              Transactions
            </button>
          </CardFooter>
        </Card>
        <Card className={"w-full h-fit bg-[#232323] md:h-[28.8%]"}>
          <CardHeader className={"font-bold bg-[#232323] md:text-xl"}>
            Line Chart
          </CardHeader>
          <CardBody
            className={
              " rounded-b-lg bg-[#232323] h-[168px] md:h-[192px] shadow-lg flex justify-center p-2"
            }
          >
            <Line options={lineOptions} data={data2} />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
