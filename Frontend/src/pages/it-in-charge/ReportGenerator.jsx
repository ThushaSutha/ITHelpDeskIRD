import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import UserService from "../../services/user.service"; // Adjust path based on your project structure
import LordIconComponent from "../../components/Icons/LordIconComponent"; // Your custom loader
import LordDeleteIconComponent from "../../components/Icons/LordDeleteIconComponent"; // Your custom loader
import { Card, CardFooter, Chip, Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import Avatar from "react-avatar";
import { format } from "date-fns";
import { CommentSection } from "react-comments-section";
import 'react-comments-section/dist/index.css'

import { Popover, PopoverHandler, PopoverContent, Input } from "@material-tailwind/react";
import "react-day-picker/dist/style.css";

import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ViewfinderCircleIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import {
  Button,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import "../../styles/style.css";
import InputField from "../../components/common/InputField";
import Select2LikeComponent from "../../components/common/Select2LikeComponent";
import { Link, useNavigate } from "react-router-dom";
import TicketService from "../../services/ticket.service";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const ReportGenerator = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    email: "",
    role: "",
    unit_id: "",
    contact: "",
  });
  const [selectUnit, setUnitOption] = useState("");
  const [selectStatus, setStatusOption] = useState("");
  const units = ["IT", "Accounts", "Network"];
  const status = ["Active", "Inactive"];
  const [month, setMonth] = useState(null);

  const handleDateChange = (e) => {
    const { value } = e.target;
    
    console.log("value",value);
    console.log("Nedw value",new Date(value), "mm-yy");
    console.log('Month date',month);

    // const text = event.target.value.toLowerCase();
    setMonth(value);
    setFilteredData(
      data.filter((row) => row.createdAt.toLowerCase().includes(value))
    );

  };
  

 


  // Fetch user data
  const retrieveTicket = async (page) => {
    setLoading(true);
    try {
      const response = await TicketService.getLogTickets(page,perPage);
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
      setTotalRows(response.data.totalItems || 0);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  //pdf generator
  const handleGenerate = async () =>{
    try {
      const response = await axios.get("http://localhost:8080/convertPDF");
      console.log("response",response);
    } catch (error) {
      console.log("error",error);
    }
  }

  const deleteHandleOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  // Handle page change
  const handlePageChange = (page) => {
    retrieveTicket(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    retrieveTicket(1); // Reset to page 1 when page size changes
  };


  // Handlers for Action Buttons
  const handleView = (row) => {
    setSelectedRow(row);
    setViewOpen(!viewOpen);
    console.log("Edit clicked for row:", row);
  };

  const handleUpdate = (row) => {
    console.log("ussssser id", row.emId);
    navigate("/update", { state: { userId: row.emId } });
    console.log("Update clicked for row:", row.emId);
  };


 

  const handleDelete = (id) => {
    setDeleteOpen(!deleteOpen);
    setSelectedRow(id);
  };

  

  //filter rows based on filter text
  const handleFilter = (event) => {
    const text = event.target.value.toLowerCase();
    setFilterText(text);
    setFilteredData(
      data.filter((row) => row.description.toLowerCase().includes(text))
    );
  };

  useEffect(() => {
    retrieveTicket(1);
    console.log("Role", localStorage.getItem('userRole'));
  }, [perPage]);

  // Define columns
  const columns = [
    {
      name: "#",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Priority",
      cell: (row) => (
        <>
          <Chip
            color={
              row.priority === 0 ? "cyan" : row.priority === 1 ? "teal" : "pink"
            }
            value={
              row.priority === 0
                ? "Low"
                : row.priority === 1
                ? "Medium"
                : "High"
            }
          />
        </>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <Chip
            color={row.status_id === 1 ? "green" : "red"}
            value={row.status_id === 1 ? "Active" : "Inactive"}
          />
        </>
      ),
    },
    {
      name: "Created At",
      selector: (row) =>
        format(new Date(row.createdAt), "dd MMM yyyy, hh:mm a"),
    },
  ];

  const comData = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      timestamp: "2024-10-28T12:34:56Z",
      replies: [],
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <div className="w-11/12">
          <div className="flex flex-row ">
            <div className="basis-11/12  ">
              <Typography variant="h5" color="blue-gray">
                Monthly Tickets state Report
              </Typography>
              <Typography color="gray" className="mt-1 mb-5 font-normal">
                {/* Tickets Report */}
              </Typography>
            </div>
            <div className="basis-2/12 ">
              
                <Button className="flex  items-center " size="sm"
                  onClick={handleGenerate}
                >
                  {/* <UserPlusIcon className="h-6 w-6 text-white" /> */}
                  Generate
                </Button>
  
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              {/* <TabsHeader>
                {tabs.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader> */}

<div className="flex justify-center">
                    <input
                      type="date"
                      name="expiryDate"
                      value={month}
                      onChange={handleDateChange}
                    //   min={today}
                      className="mt-2 p-2  border border-gray-300 rounded"
                      required
                    />
                  </div>

    
              
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                placeholder="Filter by Name"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={filterText}
                onChange={handleFilter}
              />
            </div>
          </div>
          <div className="mt-4">
            <DataTable
              progressPending={loading}
              progressComponent={
                <Spinner className="h-16 w-16 text-gray-900/50" />
              }
              // title="User Management"
              columns={columns}
              data={filteredData}
              noDataComponent={
                <div className="flex flex-col items-center justify-center">
                  <LordIconComponent />{" "}
                  {/* Optional: Display icon for "No Records Found" */}
                  <p className="mt-4 text-center text-gray-600">
                    No Records Found
                  </p>
                </div>
              }
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
            />
          </div>
        </div>
      </div>

     
    </>
  );
};

export default ReportGenerator;
