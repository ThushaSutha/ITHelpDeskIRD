import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import UserService from "../../services/user.service"; // Adjust path based on your project structure
import LordIconComponent from "../../components/Icons/LordIconComponent"; // Your custom loader
import LordDeleteIconComponent from "../../components/Icons/LordDeleteIconComponent"; // Your custom loader
import { Card, CardFooter, Chip, Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import Avatar from "react-avatar";

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
import { Link, useNavigate  } from "react-router-dom";

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
  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    email: "",
    role: "",
    unit_id: "",
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
    { label: "Monitored", value: "monitored" },
    { label: "Unmonitored", value: "unmonitored" },
  ];

  // Fetch user data
  const retrieveUser = async (page) => {
    setLoading(true);
    try {
      
      const response = await UserService.getAll(page, perPage);
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
    console.log("new user");
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
    console.log("ussssser id",row.emId);
    navigate('/update',{state:{userId: row.emId}});
    // setSelectedRow(row);
    // setUpdateUserData({
    //   id: row.id,
    //   name: row.name || "",
    //   email: row.email || "",
    //   role: row.role || "",
    //   unit_id: row.unit_id || "",
    // });
    // setUpdateOpen(!updateOpen);
    console.log("Update clicked for row:", row.id);
  };

  //Handle changes in update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // update user data
  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      console.log("id" + updateUserData.name);
      const response = await UserService.update(updateUserData);
      console.log("Update response: " + response.data);
      //update table data with updated user details
      setData((prevData) =>
        prevData.map((user) =>
          user.id === selectedRow.id ? { ...user, ...updateUserData } : user
        )
      );

      setFilteredData((prevData) =>
        prevData.map((user) =>
          user.id === selectedRow.id ? { ...user, ...updateUserData } : user
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
      console.log("delete",selectedRow.emId);
      const response = await UserService.delete(selectedRow.emId);
      console.log("Delete response: " + response.data.message);

      setData((prevData) =>
        prevData.filter((user) => user.emId !== selectedRow.emId)
      );
      setFilteredData((prevData) =>
        prevData.filter((user) => user.emId !== selectedRow.emId)
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
      name: "ID",
      selector: (row) => row.emId,
      sortable: true,
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
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
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
      name: "Unit ID",
      selector: (row) => row.unit_id,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex pr-8">
          <Tooltip content={"View User"}>
            <IconButton variant="text" onClick={() => handleView(row)}>
              <ViewfinderCircleIcon className="h-4 w-4 text-green-700" />
            </IconButton>
          </Tooltip>
          <Tooltip content={"Edit User"}>
            <IconButton variant="text" onClick={() => handleUpdate(row)}>
              <PencilSquareIcon className="h-4 w-4 text-blue-700" />
            </IconButton>
          </Tooltip>

          <Tooltip content={"Delete User"}>
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
                Welcome Admin
              </Typography>
              <Typography color="gray" className="mt-1 mb-5 font-normal">
                Users Management
              </Typography>
            </div>
            <div className="basis-1/12 ">
            <Link to="/add">
              <Button
                className="flex  items-center "
                size="sm"
              >
                
                <UserPlusIcon className="h-6 w-6 text-white" />
                Add User
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

      {/* View Modal code */}

      <Dialog
        size="xs"
        open={viewOpen}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              User Details
            </Typography>
            <div className="flex  justify-center gap-4">
              <Avatar name={selectedRow?.name} size="100" round={true} />
            </div>
            <Typography className="-mb-2" variant="h6">
              Name : {selectedRow?.name}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Email: {selectedRow?.email}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Role: {selectedRow?.role}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Unit: {selectedRow?.unit_id}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Region: {selectedRow?.unit_id}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Close
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      {/* New dialog code  */}
      <Dialog
        size="xs"
        open={newOpen}
        handler={handleNewOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update User Details
            </Typography>

            <InputField label="Name" name="name" />
            <InputField label="Email" name="email" />
            <InputField label="Role" name="role" />
            <InputField label="Unit ID" name="unit_id" />

            <Select2LikeComponent
              label="Unit"
              options={units}
              required={true}
              value={selectUnit}
              onSelectChange={handleUnitChange}
            />
            {/* status */}

            <Select2LikeComponent
              label="Status"
              options={status}
              required={true}
              value={selectStatus}
              onSelectChange={handleStatusChange}
            />

            {/* password */}

            {/* confirm password */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth>
              {loading ? <Spinner className="h-5 w-5" /> : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      {/* update dialog code  */}
      <Dialog
        size="xs"
        open={updateOpen}
        handler={updateHandleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update User Details
            </Typography>

            <InputField
              label="Name"
              name="name"
              value={updateUserData.name}
              onChange={handleInputChange}
            />

            <InputField
              label="Email"
              name="email"
              value={updateUserData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Role"
              name="role"
              value={updateUserData.role}
              onChange={handleInputChange}
            />
            <InputField
              label="Unit ID"
              name="unit_id"
              value={updateUserData.unit_id}
              onChange={handleInputChange}
              type="number"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleUpdateUser} fullWidth>
              {loading ? <Spinner className="h-5 w-5" /> : "Update"}
            </Button>
          </CardFooter>
        </Card>
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
