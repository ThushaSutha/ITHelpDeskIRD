import React, { useEffect, useRef,useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import TicketService from "../../services/ticket.service";
// @material-tailwind/react
import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardBody,
} from "@material-tailwind/react";


import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { formatters } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { newDate } from "react-datepicker/dist/date_utils";



const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const KpiCard = ({ title, percentage, price, color, icon })=> (
    <Card className="shadow-sm border border-gray-200 !rounded-lg">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <Typography className="!font-medium !text-xs text-gray-600">
            {title}
          </Typography>
          <div className="flex items-center gap-1">
            {icon}
            <Typography color={color} className="font-medium !text-xs">
              {percentage}
            </Typography>
          </div>
        </div>
        <Typography color="blue-gray" className="mt-1 font-bold text-2xl">
          {price}
        </Typography>
      </CardBody>
    </Card>
  );






  

function KpiCard1() {
  const [ticketData, setTicketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [tData, setTData] = useState([]);
  const [uData, setUData] = useState([]);
  const [pData, setPData] = useState([]);
  const [cData, setCData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Last 30 days");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCustom, setIsCustom] = useState(false);

   // Fetch all tickets data
  const retrieveTicket = async () => {
    try {
      const response = await TicketService.getLogTickets(); // Get all tickets
      const tickets = response.data.data || [];
      setTicketData(tickets);
      filterData(tickets, selectedOption); // Initially filter by default selected option
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filter the data based on the selected option
  const filterData = (tickets, option) => {
    let filteredTickets = [];
    const currentDate = new Date();
  
    if (option === "Custom" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      if (isNaN(start) || isNaN(end)) {
        alert("Please select valid dates.");
        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Get the difference in days
  
      // Check if the dates are valid and the range doesn't exceed 30 days
  
      if (diffDays > 30) {
        alert("The date range cannot exceed 30 days");
        return;
      }
  
      if (start > end) {
        alert("Start date cannot be later than end date");
        return;
      }
  
      filteredTickets = tickets.filter((ticket) => {
        const ticketDate = new Date(ticket.createdAt);
        return ticketDate >= start && ticketDate <= end;
      });
    } else {
      // Handle other options like "Last 24 Hours", "Today", "Last 7 days", etc.
      console.log("option",option);
      switch (option) {
        
        case "Last 7 days":
          filteredTickets = tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt);
            return (currentDate - ticketDate) <= 7 * 24 * 60 * 60 * 1000; // 7 days in ms
          });
          console.log("7 days",filteredTickets)
          setStartDate(null);
          setEndDate(null);
          break;
        case "Today":
          filteredTickets = tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt);
            return ticketDate.toDateString() === currentDate.toDateString();
          });
          break;
        case "Yesterday":
          filteredTickets = tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt);
            
            // Reset time to midnight for both ticket and current date
            const resetTicketDate = new Date(ticketDate.setHours(0, 0, 0, 0));
            const resetCurrentDate = new Date(currentDate.setHours(0, 0, 0, 0));
            
            // Subtract 1 day from the current date to get yesterday
            resetCurrentDate.setDate(resetCurrentDate.getDate() - 1);
            
            // Compare if the ticket date is yesterday
            return resetTicketDate.toDateString() === resetCurrentDate.toDateString();
          });
          break;
        case "Last 30 days":
          filteredTickets = tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt);
            return (currentDate - ticketDate) <= 30 * 24 * 60 * 60 * 1000; // 30 days in ms
          });
          setStartDate(null);
          setEndDate(null);
          break;
        case "Last month":
          {
            const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); // Correctly calculates the last day of the last month
            lastDayOfLastMonth.setDate(lastDayOfLastMonth.getDate() + 1);
          
            // Ensure lastDayOfLastMonth is set correctly (for example, if it's December, it should return December 31st)
            filteredTickets = tickets.filter((ticket) => {
              const ticketDate = new Date(ticket.createdAt);
              return ticketDate >= firstDayOfLastMonth && ticketDate <= lastDayOfLastMonth;
            });
        
            console.log("last month", filteredTickets);
        
            setStartDate(null);
            setEndDate(null);
          }
          break;
        case "Current month":
          filteredTickets = tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt);
            const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            return ticketDate >= firstDayOfCurrentMonth && ticketDate <= lastDayOfCurrentMonth;
          });
          break;
        
        case "Current week":
          filteredTickets = tickets.filter((ticket) => {
            const ticketDate = new Date(ticket.createdAt);
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return ticketDate >= startOfWeek && ticketDate <= endOfWeek;
          });
          break;
        default:
          filteredTickets = tickets; // If no filter, return all tickets
          break;
      }
    }
  
    processChartData(filteredTickets);
    setFilteredData(filteredTickets);
  };
  



   // Process ticket data for charting
  const processChartData = (tickets) => {
    const groupedByDay = tickets.reduce((acc, ticket) => {
      const day = new Date(ticket.createdAt).toLocaleDateString(); // Format: MM/DD/YYYY
      if (!acc[day]) acc[day] = [];
      acc[day].push(ticket);
      return acc;
    }, {});

    const days = Object.keys(groupedByDay).sort((a, b) => new Date(a) - new Date(b));
    const totalData = [];
    const unassignedData = [];
    const pendingData = [];
    const closedData = [];

    days.forEach((day) => {
      const ticketsForDay = groupedByDay[day];
      totalData.push(ticketsForDay.length);
      unassignedData.push(ticketsForDay.filter((t) => t.assigned_to === null).length);
      pendingData.push(ticketsForDay.filter((t) => t.status === 1).length);
      closedData.push(ticketsForDay.filter((t) => t.status === 2).length);
    });

    setXLabels(days);
    setTData(totalData);
    setUData(unassignedData);
    setPData(pendingData);
    setCData(closedData);
  };

  useEffect(() => {
    retrieveTicket(); // Fetch all tickets data on component mount
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (selectedOption === "Custom") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Last 30 days") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Last 7 days") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Last month") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Today") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Yesterday") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Current month") {
        filterData(ticketData, selectedOption);
      }
      if (selectedOption === "Current week") {
        filterData(ticketData, selectedOption);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [ticketData,startDate,endDate,selectedOption]);

  const kpiData = [
    {
      title: "Total Tickets",
      // percentage: "12%",
      price: ticketData.length,
      color: "red",
      // icon: (
      //   <ChevronDownIcon
      //     strokeWidth={4}
      //     className="w-3 h-3 text-red-500"
      //   />
      // ),
    },
    {
      title: "unassigned Tickets",
      // percentage: "16%",
      price: ticketData.filter((data)=>data.assigned_to === 'null').length,
      color: "green",
      // icon: (
      //   <ChevronUpIcon
      //     strokeWidth={4}
      //     className="w-3 h-3 text-green-500"
      //   />
      // ),
    },
    {
      title: "In process Tickets",
      // percentage: "10%",
      price: ticketData.filter((data)=>data.status === 1).length,
      color: "green",
      // icon: (
      //   <ChevronUpIcon
      //     strokeWidth={4}
      //     className="w-3 h-3 text-green-500"
      //   />
      // ),
    },
    {
      title: "Closed Tickets",
      // percentage: "10%",
      price: ticketData.filter((data)=>data.status === 2).length,
      color: "red",
      // icon: (
      //   <ChevronDownIcon
      //     strokeWidth={4}
      //     className="w-3 h-3 text-red-500"
      //   />
      // ),
    },
  ];
  
  
  const dataset = [
    {
      issues: "Equipment Issue",
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      issues: "Software Issue",
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Feb",
    },
    {
      issues: "Network Issue",
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      issues: "Email Issue",
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      issues: "Others",
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
  ];

  console.log("ticket datas",ticketData);
  const categoryData = ticketData.reduce((acc, ticket) => {
    const category = ticket.category;
    if (acc[category]) {
      acc[category].count += 1;
    } else {
      acc[category] = { name: category, count: 1 };
    }
    return acc;
  }, {});
  const categoryArray = Object.values(categoryData);
  console.log(categoryArray);
  
  
  return (
    <section className="container mx-auto py-20 px-8">
      <div className="flex justify-between md:items-center">
        {/* <div>
          <Typography className="font-bold">Overall Performance</Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600 md:w-full w-4/5"
          >
            Upward arrow indicating an increase in revenue compared to the
            previous period.
          </Typography>
        </div> */}
        <div className="shrink-0">
          <Menu>
            <MenuHandler>
              <Button
                color="gray"
                variant="outlined"
                className="flex items-center gap-1 !border-gray-300"
              >
                 {selectedOption}
                <ChevronDownIcon
                  strokeWidth={4}
                  className="w-3 h-3 text-gray-900"
                />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => {setSelectedOption("Today"); setIsCustom(false);}}>Today</MenuItem>
              <MenuItem onClick={() => {setSelectedOption("Yesterday"); setIsCustom(false);}}>Yesterday</MenuItem>
              <MenuItem onClick={() => {setSelectedOption("Last 7 days"); setIsCustom(false);}}>Last 7 days</MenuItem>
              <MenuItem onClick={() => {setSelectedOption("Last 30 days"); setIsCustom(false);setStartDate(null);setEndDate(null);}}>Last 30 days</MenuItem>
              <MenuItem onClick={() => {setSelectedOption("Current week"); setIsCustom(false);}}>Current week</MenuItem>
              <MenuItem onClick={() => {setSelectedOption("Current month"); setIsCustom(false);}}>Current month</MenuItem>
              <MenuItem onClick={() => {setSelectedOption("Last month"); setIsCustom(false);}}>Last month</MenuItem>
              <MenuItem onClick={() => { 
                const newDate = new Date();
                const startDate = new Date(newDate)
                startDate.setDate(newDate.getDate() - 29); 
                setSelectedOption("Custom"); 
                setIsCustom(true); 
                setStartDate(startDate);
                setEndDate(newDate);
                
                }}>Custom</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      {isCustom && (
        <div className="mt-4">
          <label>Start Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="ml-2 p-2 border rounded" />
          <label className="ml-4">End Date</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="ml-2 p-2 border rounded" />
        </div>
      )}
      
      <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4 ">
        {kpiData.map((props, key) => (
          <KpiCard key={key} {...props} />
        ))}
      </div>

      {/* For chart */}
      <div className="mt-6 grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 md:gap-2.5 gap-4">
        <Card>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="">
              Tickets Stats
              <hr />
            </Typography>
            <LineChart
              // width={1200}
              height={300}
              series={[
                { data: tData, label: "Total Ticket" },
                { data: uData, label: "Unassigned Ticket" },
                { data: pData, label: "Pending Ticket" },
                { data: cData, label: "Closed Ticket  " },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]} />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4 ">
        <Card>
          <CardBody style={{ margin: "0.1vw" }}>
          <Typography variant="h5" color="blue-gray" className="">
              By Issue Category
              <hr />
            </Typography>
            <BarChart
              dataset={categoryArray}
              yAxis={[{ disableLine:true,disableTicks:true,scaleType: "band", dataKey: "name" }]}
              series={[
                { dataKey: "count" },
              ]}
              layout="horizontal"
              xAxis={[
                {
                  // label: "rainfall (mm)",
                },
              ]}
              // width={500}
              height={300}
              borderRadius={50}
              margin={{ left: 104 }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="">
              Staff Satisfaction
              <hr />
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Unsatisfied" },
                    { id: 1, value: 15, label: "Satisfied" },
                    { id: 2, value: 20, label: "Highly satisfied" },
                    { id: 3, value: 20, label: "Unknown" },
                  ],
                  highlightScope: { fade: "global", highlight: "item" },
                  innerRadius:100,
                  faded: {
                    innerRadius: 100,
                    additionalRadius: -10,
                    color: "gray",
                  },
                },
              ]}
              
              // width={400}
              height={300}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default KpiCard1;
