import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import UserService from "../../services/user.service"; // Adjust path based on your project structure
import LordIconComponent from "../../components/Icons/LordIconComponent"; // Your custom loader
import LordDeleteIconComponent from "../../components/Icons/LordDeleteIconComponent"; // Your custom loader
import { Card, CardFooter, Chip, Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import Avatar from "react-avatar";
import { format } from "date-fns";

import deviceservice from "../../services/device.service";


import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ViewfinderCircleIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import {
  Input,
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


const Test = () => {
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
  const [updatedeviceData, setUpdatedeviceData] = useState({ 
    brand: "",
    model: "",
    serial_number: "",
    device_type : "",
    purchase_date: "",
    warranty_expiration_date: "",
    company_id : "",
    user_id : ""
  });
  const [selectUnit, setUnitOption] = useState("");
  const [selectStatus, setStatusOption] = useState("");
  const units = ["IT", "Accounts", "Network"];
  const status = ["Active", "Inactive"];

  //function  to handle the unit option
  const handleUnitChange = (unit) => {
    const newUnit = typeof unit === "object" ? unit.target.value : unit;
    setUnitOption(newUnit);
    console.log("unit", newUnit);
  };

  //function to handle the status option
  const handleStatusChange = (status) => {
    const newStatus = typeof status === "object" ? status.target.value : status;
    setStatusOption(newStatus);
    console.log("Status", newStatus);
  };

  const tabs = [
    { label: "All", value: "all" },

  ];

  // Fetch user data
  const retrieveUser = async (page) => {
    setLoading(true);
    try {
      const response = await deviceservice.getAll(page, perPage);
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
      setTotalRows(response.data.totalItems || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  //handle the modal open
  const handleNewOpen = () => {
    setNewOpen(!newOpen);
  };
  const handleOpen = () => {
    setViewOpen(!viewOpen);
  };

  const updateHandleOpen = () => {
    setUpdateOpen(!updateOpen);
  };

  const deleteHandleOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  // Handle page change
  const handlePageChange = (page) => {
    retrieveUser(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    retrieveUser(1); // Reset to page 1 when page size changes
  };

  // add new user
  const handleAddUser = async () => {
    console.log("new device");
    setNewOpen(!newOpen);
  };

  // Handlers for Action Buttons
  const handleView = (row) => {
    setSelectedRow(row);
    setViewOpen(!viewOpen);
    console.log("Edit clicked for row:", row);
    // Add your logic for editing here
  };

  const handleUpdate = (row) => {
    console.log("ussssser id", row.emId);
    navigate("/update", { state: { userId: row.emId } });
    // setSelectedRow(row);
    // setUpdateUserData({
    //   id: row.id,
    //   name: row.name || "",
    //   email: row.email || "",
    //   role: row.role || "",
    //   unit_id: row.unit_id || "",
    // });
    // setUpdateOpen(!updateOpen);
    console.log("Update clicked for row:", row.emId);
  };

  //Handle changes in update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedeviceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // update user data
  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      console.log("id" + updatedeviceData.name);
      const response = await deviceservice.update(updatedeviceData);
      console.log("Update response: " + response.data);
      //update table data with updated user details
      setData((prevData) =>
        prevData.map((user) =>
          user.id === selectedRow.id ? { ...user, ...updatedeviceData } : user
        )
      );

      setFilteredData((prevData) =>
        prevData.map((user) =>
          user.id === selectedRow.id ? { ...user, ...updatedeviceData } : user
        )
      );

      setUpdateOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteOpen(!deleteOpen);
    setSelectedRow(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;

    setLoading(true);
    try {
      //call the delete API
      console.log("delete", selectedRow.emId);
      const response = await deviceservice.delete(selectedRow.emId);
      console.log("Delete response: " + response.data.message);

      setData((prevData) =>
        prevData.filter((device) => device.id !== selectedRow.id)
      );
      setFilteredData((prevData) =>
        prevData.filter((device) => device.id !== selectedRow.id)
      );

      setDeleteOpen(false);
      setSelectedRow(null);
    } catch (error) {
      console.error("Error deleting user: ", error);
    } finally {
      setLoading(false);
    }
    console.log("Delete clicked for row ID:", selectedRow);
  };

  //filter rows based on filter text
  const handleFilter = (event) => {
    const text = event.target.value.toLowerCase();
    setFilterText(text);
    setFilteredData(
      data.filter((row) => row.name.toLowerCase().includes(text))
    );
  };

  useEffect(() => {
    retrieveUser(1); // Fetch first page data on component mount
  }, [perPage]);

  // Define columns
  const columns = [
    {
      name: "#",
      cell: (row,index) =>(
        <span>{index + 1}</span>
      ),
    },
    {
      name: "Profile",
      cell: (row) => (
        <>
          <Avatar name={row.name} size="40" round={true} />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Brand",
      selector: (row) => row.name,
    },
    {
      name: "Model",
      selector: (row) => row.email,
    },
    {
      name: "Serial No",
      selector: (row) => row.role.split("_") // Split by underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "),
    },
    // {
    //   name: "Serial Number",
    //   selector: (row) => row.serial_number,
    // },
    {
      name: "Status",
      cell: (row) => (
        <>
          <Chip
            color={row.status === 1 ? "green" : "red"}
            value={row.status === 1 ? "Active" : "Inactive"}
          />
        </>
      ),
    },
    {
      name: "Created At",
      selector: (row) => format(new Date(row.createdAt), "dd MMM yyyy, hh:mm a"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex pr-8">
          <Tooltip content={"View Device"}>
            <IconButton variant="text" onClick={() => handleView(row)}>
              <ViewfinderCircleIcon className="h-4 w-4 text-green-700" />
            </IconButton>
          </Tooltip>
          <Tooltip content={"Edit Device"}>
            <IconButton variant="text" onClick={() => handleUpdate(row)}>
              <PencilSquareIcon className="h-4 w-4 text-blue-700" />
            </IconButton>
          </Tooltip>

          <Tooltip content={"Delete Device"}>
            <IconButton variant="text" onClick={() => handleDelete(row)}>
              <TrashIcon className="h-4 w-4 text-red-700" />
            </IconButton>
          </Tooltip>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      {/* <div>
          <Typography variant="h3">Welcome Admin</Typography>
        </div> */}
      <div className="flex justify-center items-center mt-5">
        <div className="w-11/12">
          <div className="flex flex-row ">
            <div className="basis-11/12  ">
              <Typography variant="h5" color="blue-gray">
                Welcome Supply Unit Staff
              </Typography>
              <Typography color="gray" className="mt-1 mb-5 font-normal">
                Device Management
              </Typography>
            </div>
            <div className="basis-1/12 ">
              <Link to="/add-device">
                <Button className="flex  items-center " size="sm">
                  <UserPlusIcon className="h-6 w-6 text-white" />
                  Add Device
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {tabs.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
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
              // title="device Management"
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

      {/* View Modal code */}

      <Dialog
  size="xs"
  open={viewOpen}
  handler={handleOpen}
  className="bg-transparent shadow-none"
>
<DialogBody className="h-auto sm:h-full overflow-auto">
  <Card className="mx-auto w-full max-w-2xl">
    <CardBody className="flex flex-col gap-4">
      <Typography variant="h4" color="blue-gray" className="flex justify-center">
       Device Details
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Section: Avatar */}
        <div className="flex flex-col items-center bg-gradient-to-t from-indigo-900 to-deep-orange-100 rounded-lg p-5">
          <Avatar
            name={selectedRow?.name}
            size="100"
            className="rounded-full"
          />
          <div className="text-center mt-3">
            <Typography variant="h5" className="text-white">
              {selectedRow?.name}
            </Typography>
            <Typography variant="body2" className="text-white text-sm">
              {selectedRow?.designation}
            </Typography>
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="col-span-2">
          <div className="p-5">
            {/* Personal Details */}
            <div className="text-center font-semibold text-lg">Personal</div>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography variant="h6">Employee ID</Typography>
                <div>{selectedRow?.employeeId}</div>
              </div>
              <div>
                <Typography variant="h6">Email</Typography>
                <div>{selectedRow?.email}</div>
              </div>
              <div>
                <Typography variant="h6">Contact No</Typography>
                <div>{selectedRow?.contact}</div>
              </div>
              <div>
                <Typography variant="h6">Role</Typography>
                <div>
                  {selectedRow?.role
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="text-center font-semibold text-lg mt-6">Location</div>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography variant="h6">Region</Typography>
                <div>{selectedRow?.region_id}</div>
              </div>
              <div>
                <Typography variant="h6">Unit</Typography>
                <div>{selectedRow?.unit_id}</div>
              </div>
            </div>

            {/* Asset Details */}
            <div className="text-center font-semibold text-lg mt-6">Asset</div>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography variant="h6">Name</Typography>
                <div>{selectedRow?.asset_name}</div>
              </div>
              <div>
                <Typography variant="h6">Serial Number</Typography>
                <div>{selectedRow?.serial_number}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardBody>
    <CardFooter className="pt-0">
      <Button variant="gradient" onClick={handleOpen} fullWidth>
        Close
      </Button>
    </CardFooter>
  </Card>
</DialogBody>

</Dialog>

      {/* delete modal */}
      <Dialog open={deleteOpen} size="xs" handler={deleteHandleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              {/* Confirmation */}
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={deleteHandleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="flex flex-col ">
            <div className="flex justify-center">
              <LordDeleteIconComponent />
            </div>

            <div className="flex justify-center">
              <Typography className="mb-10 mt-7 " color="gray" variant="lead">
                Do you want to delete this user?
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={deleteHandleOpen}>
            No
          </Button>
          <Button variant="gradient" color="gray" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Test;