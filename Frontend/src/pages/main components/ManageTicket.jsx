import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import LordIconComponent from "../../components/Icons/LordIconComponent";
import LordDeleteIconComponent from "../../components/Icons/LordDeleteIconComponent";
import { format } from "date-fns";
import "react-comments-section/dist/index.css";
import TicketInfoForm from "../../components/TicketForm/TicketInfoForm";
import Avatar from "react-avatar";

// Icons import
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ViewfinderCircleIcon,
  TrashIcon,
  UserPlusIcon,
  ChevronDownIcon,
  TicketIcon,
  ClockIcon ,
  Bars3BottomLeftIcon,
  InformationCircleIcon 
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
  Collapse,
  Card, 
  CardFooter, 
  Chip, 
  Typography,
  Spinner,
  List,
  ListItem,
} from "@material-tailwind/react";

import "../../styles/style.css";
import { Link } from "react-router-dom";
import TicketService from "../../services/ticket.service";
import { toast } from "react-toastify";
import ticketService from "../../services/ticket.service";
import SelectInput from "./SelectInput";
import { CommentSection } from "react-comments-section";
import BgAttachment from "../../assets/attachment-bg.svg"
import { ActivitiesTimeline } from "./TimeLine";
import Conversation from "../../assets/conversation.mp4"

const Test = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState(false);
  const [openTicketInfo, setOpenTicketInfo] = useState(false);
  const [statusBtn, setStatusBtn] = useState(false);
  const [priorityBtn, setPriorityBtn] = useState(false);
  const [status, setStatus] = useState(null);
  const [priorityValue, setPriorityValue] = useState("-None-");
  const priorityOptions = [
    {name:"-None-",value:3},
    {name:"Low",value:0},
    {name:"Medium",value:1},
    {name:"High",value:2},
    
  ];
  
  const statusOptions = [
    {name:"Open",value:0},
    {name:"Pending",value:1},
    {name:"Closed",value:2},
    
  ];
  

  const [isConversation,setIsConversation] = useState(true);
  const [isAttachment,setIsAttachment] = useState(false);
  const [isHistory,setIsHistory] = useState(false);

  const [prioritySelectedOption, setPrioritySelectedOption] = useState(3);
  const [statusSelectedOption, setStatusSelectedOption] = useState(0);

  const toggleOpen = () => setOpen((cur) => !cur);

  const [formData, setFormData] = useState({
    id: null,
    issueType: null,
    priorityLevel: null,
    deviceCategory: null,
    serviceTag: null,
    model: null,
    brand: null,
    description: null,
    file: null,
  });

  const tabs = [
    { label: "All", value: "all" },
    { label: "Monitored", value: "monitored" },
    { label: "Unmonitored", value: "unmonitored" },
  ];

  // Fetch ticket data
  const retrieveTicket = async (page) => {
    setLoading(true);
    try {
      const response = await TicketService.getLogTickets(page, perPage);
      console.log("ticket data", response);
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
      setTotalRows(response.data.totalItems || 0);
      setCurrentPage(response.data.currentPage || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
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
    setSelectedRow(row);
    setUpdateOpen(!updateOpen);
    console.log("Update clicked for row:", row);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.model === null) {
      formData.model = selectedRow.model;
    }
    if (formData.issueType === null) {
      formData.issueType = selectedRow.category_id;
    }
    if (formData.priorityLevel === null) {
      formData.priorityLevel = selectedRow.priority;
    }
    if (formData.serviceTag === null) {
      formData.serviceTag = selectedRow.serial_no;
    }
    if (formData.brand === null) {
      formData.brand = selectedRow.brand;
    }
    if (formData.description === null) {
      formData.description = selectedRow.description;
    }
    if (formData.id != selectedRow.id) {
      formData.id = selectedRow.id;
    }
    console.log(formData);
    console.log("selected row id", formData.id);

    try {
      const response = await TicketService.update(formData);
      console.log("Updated response", response);
      toast.success(response.data.message, {
        position: "top-right",
      });

      setData((prevData) =>
        prevData.map((ticket) =>
          ticket.id === selectedRow.id ? { ...ticket, ...formData } : ticket
        )
      );

      setFilteredData((prevData) =>
        prevData.map((ticket) =>
          ticket.id === selectedRow.id ? { ...ticket, ...formData } : ticket
        )
      );

      setUpdateOpen(false);
      setSelectedRow(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSelectedRow(null);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteOpen(!deleteOpen);
    setSelectedRow(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;

    try {
      //call the delete API
      console.log("delete", selectedRow.id);
      const response = await ticketService.delete(selectedRow.id);
      console.log("Delete response: " + response.data.message);

      setData((prevData) =>
        prevData.filter((ticket) => ticket.id !== selectedRow.id)
      );
      setFilteredData((prevData) =>
        prevData.filter((ticket) => ticket.id !== selectedRow.id)
      );

      setDeleteOpen(false);
      setSelectedRow(null);
      toast.success(response.data.message, {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting Ticket: ", error);
    } finally {
      setLoading(false);
    }
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
    console.log("Role", localStorage.getItem("userRole"));
  }, [perPage]);

  // Define columns
  const columns = [
    {
      name: "#",
      cell: (row, index) => {
        const displayIndex = index + 1 + perPage * (currentPage - 1); // Adjust index based on pagination
        return <span>{displayIndex}</span>;
      },
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
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex pr-8">
          <Tooltip content={"View Ticket"}>
            <IconButton variant="text" onClick={() => handleView(row)}>
              <ViewfinderCircleIcon className="h-4 w-4 text-green-700" />
            </IconButton>
          </Tooltip>
          <Tooltip content={"Edit Ticket"}>
            <IconButton variant="text" onClick={() => handleUpdate(row)}>
              <PencilSquareIcon className="h-4 w-4 text-blue-700" />
            </IconButton>
          </Tooltip>

          <Tooltip content={"Delete Ticket"}>
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
      <div className="flex justify-center items-center mt-5">
        <div className="w-11/12">
          <div className="flex flex-row ">
            <div className="basis-11/12  ">
              <Typography variant="h5" color="blue-gray">
                Welcome
              </Typography>
              <Typography color="gray" className="mt-1 mb-5 font-normal">
                Tickets Management
              </Typography>
            </div>
            <div className="basis-2/12 ">
              <Link to="/new-ticket">
                <Button className="flex  items-center " size="sm">
                  <UserPlusIcon className="h-6 w-6 text-white" />
                  Add Ticket
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
        size="xxl"
        open={viewOpen}
        handler={handleOpen}
      >
        <DialogBody className=" p-0 xs:overflow-auto bg-[f6f8fb] sm:overflow-hidden no-scrollbar sm:grid-cols-1 grid-cols-1 grid lg:grid-cols-12  gap-1  text-black">
        <div className="flex bg-transparent   border-2 border-gray-200  flex-col items-center max-w-screen-2xl w-full  justify-start  md:max-h-screen md:overflow-y-auto  md:col-span-3 col-span-9  ">

            <div className="bg-gray-50 w-full p-5 pl-10 sticky top-0 z-10 justify-between border-b-2 border-blue-gray-50 flex ">
              <div>Ticket Properties</div>
              <div><InformationCircleIcon class="h-6 w-6 text-gray-500" /></div>
              </div>
            {/* Contact info */}
            

            
            <div className="bg-gray-50 w-11/12  mt-2 rounded-md  ">
              <div
                onClick={toggleOpen}
                className="m-1 my-2 p-2 mx-3 hover:bg-blue-gray-50 flex flex-row justify-between rounded-md "
              >
                <div>Contact Info</div>
                <div>
                  <ChevronDownIcon
                    width={25}
                    className={`transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              <Collapse open={open}>
                <div className="pl-5">
                  <Typography
                  variant="h6"
                  className=" hover:text-blue-800 hover:cursor-pointer w-fit"
                  >Reyanson Sosai</Typography>
                  <Typography
                  variant="small"
                  className="text-gray-600 font-serif hover:underline hover:decoration-dotted w-fit hover:cursor-pointer"
                  > <Tooltip content={"View Ticket"}> Reyanson@gmail.com</Tooltip>
                  </Typography>
                  <Typography
                  variant="small"
                  className="text-gray-600 font-serif hover:underline hover:decoration-dotted w-fit hover:cursor-pointer"
                  > <Tooltip content={"View Ticket"}> 0763787940</Tooltip>
                  </Typography>
                  
          
                </div>
              </Collapse>
            </div>
            
  
            {/* Key info */}
            <div className="bg-gray-50 w-11/12 mt-2 rounded-md">
              <div
                onClick={()=> setOpenKey(!openKey)}
                className="m-1 my-2 p-2 mx-3 hover:bg-blue-gray-50 flex flex-row justify-between rounded-md "
              >
                <div>Key Information</div>
                <div>
                  <ChevronDownIcon
                    width={25}
                    className={`transition-transform duration-300 ${
                      openKey ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              <Collapse open={openKey}>
                <div className="pl-5">
                  {/* Ticket Owner */}
                  <Typography
                  variant="paragraph"
                  className="font-serif  w-fit text-gray-600">
                    Ticket Owner
                  </Typography>
                  <div className="flex flex-col-2 gap-2 items-center">
                    <div><Avatar name="Reyanson Sosai" size="40" round={true} color="#FFF" fgColor="000" className="border" /></div>
                    <div>Reyanson Sosai</div>
                  </div>

                  {/* Status */}
                  <Typography
                  variant="paragraph"
                  className="font-serif mt-5  w-fit text-gray-600">
                    Status
                  </Typography>
                  <div className="w-11/12">
                      <Button
                      size="sm"
                      fullWidth
                      className="flex mb-5 items-center justify-evenly w-4/12"
                      onClick={()=>setStatusBtn(!statusBtn)}
                      >
                        <div>
                        {
                          statusOptions
                            .filter((status) => status.value === statusSelectedOption)
                            .map((filteredStatus) => (
                              <span key={filteredStatus.value}>{filteredStatus.name}</span>
                            ))
                        }
                        </div>

                        <div><ChevronDownIcon className=" w-5 text-white" /></div>
                        </Button>

                        {
                        statusBtn === true ?(
                          <>
                            <SelectInput 
                            liIcon={true} 
                            isTitle={true}
                            title="STATUS"
                            list={statusOptions}
                            selected={statusSelectedOption}
                            onSelect={(value) => setStatusSelectedOption(value)}
                            
                            />
                          </>
                        ):""

                      }
                      
                        
                  </div>
          
                </div>
              </Collapse>
            </div>

            {/* Ticket info */}
            <div className="bg-gray-50 w-11/12 my-2 rounded-md">
              <div
                onClick={()=>setOpenTicketInfo(!openTicketInfo)}
                className="m-1 my-2 p-2 mx-3 hover:bg-blue-gray-50 flex flex-row justify-between rounded-md "
              >
                <div>Ticket Info</div>
                <div>
                  <ChevronDownIcon
                    width={25}
                    className={`transition-transform duration-300 ${
                      openTicketInfo ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              <Collapse open={openTicketInfo}>
              <div className="pl-5 pb-5">
                  
                  {/* Status */}
                  <Typography
                  variant="paragraph"
                  className="font-serif  w-fit text-gray-600">
                    Priority
                  </Typography>
                  <div className="w-11/12">
                  
                  
                        

                        <Input variant="static" placeholder="Search status" 
                        value={priorityValue}
                        onClick={()=>setPriorityBtn(!priorityBtn)}
                        />
                        {
                        priorityBtn === true ?(
                          <>
                          
                          <SelectInput 
                              liIcon={false} 
                              list={priorityOptions}
                              selected={prioritySelectedOption}
                              onSelect={(value) => setPrioritySelectedOption(value)}

                            
                            />
                          
                          </>
                        ):""

                      }

                    
                      
                        
                  </div>
          
                </div>
              </Collapse>
            </div>
            
          </div>


        {/* Big Left side  */}
          <div className="col-span-9 bg-white w-full grid grid-cols-1 grid-rows-6 rounded-md border-l-2 border-t-2 border-r-2 border-b-2 border-grey-200">

            <div className="mt-5 mb-5 row-span-1">
                      <div className="ml-32 flex gap-2 mb-2"><TicketIcon class="h-6 w-6 text-black" />Ticket Name</div>
                      <div className="ml-32 flex gap-5 items-center">
                        <span className="border-2 px-3 py-0 my-0 shadow-sm border-gray-200  font-display1 rounded-md  w-fit h-fit hover:cursor-default hover:border-black">#102</span>
                        <span>Ticket riser name</span>
                        <span className="flex items-center"><ClockIcon class="h-3 w-3 text-gray-500 bg-transparent" /><Bars3BottomLeftIcon class="h-3 w-3 text-gray-500 mr-1" />
                        date and time </span>

                      </div>
            </div>
            <div className=" border-1 border-b self-center ">
                
                    
                <List className="flex-row gap-5 justify-evenly items-baseline  ">
      
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                    >
                        <ListItem className="flex items-center" 
                        onClick={()=> {setIsConversation(true),setIsAttachment(false),setIsHistory(false)}}
                        >Conversation</ListItem>
                    </Typography>
                    

                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                    >
                        <ListItem className="flex items-center"
                        onClick={()=> {setIsConversation(false), setIsAttachment(true),setIsHistory(false)}}
                        >
                        Attachment
                        </ListItem>
                    </Typography>
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                    >
                        <ListItem className="flex items-center"
                        onClick={() => {setIsConversation(false), setIsAttachment(false),setIsHistory(true)}}
                        >
                        History
                        </ListItem>
                    </Typography>
                    </List>
                
        
            </div>

            <div className="row-span-4">
                {
                    isConversation && (
                        <>
                        <div className="h-96 overflow-y-auto  rounded-md ">
                        <CommentSection
                            currentUser={{
                            currentUserId: 112,
                            currentUserImg:
                                "https://ui-avatars.com/api/name=Riya&background=random",
                            currentUserProfile:
                                "https://www.linkedin.com/in/riya-negi-8879631a9/",
                            currentUserFullName: "Reyanson Sosai",
                            }}
                            logIn={{
                            onLogin: function () {
                                alert("Call login function ");
                            },
                            signUpLink: "http://localhost:3000/",
                            }}
                            // commentData={comData}
                            placeholder="Write your comment..."
                            onSubmitAction={function (data) {
                            console.log("check submit, ", data);
                            }}
                            currentData={function (data) {
                            console.log("current data", data);
                            }}
                            onDeleteAction={() => window.prompt('Are you sure?')}
                            onReplyAction={() => alert('Reply was posted')}
                            onEditAction={() => alert('Reply was edited!')}
                            customNoComment={() => 
                              <div className='no-com flex flex-col items-center justify-center bg-transparent'>
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className=" w-40  object-cover"
                                >
                                  <source src={Conversation} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>

                                <div className="font-serif text-2xl text-blue-gray-100">Start New Conversation</div>
                              </div>
                            }
                        />
                        </div>
                        
                        </>
                    )

                }

                {
                    isAttachment && (
                        <>
                        <div className="justify-center flex-col mt-16 w-full justify-items-center">
                            <img src={BgAttachment} alt="" className="w-52 bg-transparent attachment-class rounded-md" />
                            <div>
                                <p className="font-serif text-2xl text-blue-gray-100 ">No Attachments available</p>
                            
                            </div>
                        </div>
                        
                        </>
                    )
                }

                {
                    isHistory &&(
                        <>
                        <div className="ml-32">
                            <ActivitiesTimeline />
                            </div>
                        </>
                    )
                }
               
            </div>

          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </Dialog>

      {/* Update Modal code */}

      <Dialog
        size="xl"
        open={updateOpen}
        handler={updateHandleOpen}
        className="bg-transparent shadow-none"
      >
        <DialogBody className="xs:h-[42rem]  xs:overflow-auto sm:overflow-hidden no-scrollbar ">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Card className="mx-auto w-full max-w-lg lg:max-w-2xl">
              <CardBody className="flex flex-col gap-4">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="flex justify-center text-black text-3xl underline"
                >
                  Update Ticket
                </Typography>

                <TicketInfoForm
                  isUpdateMode={true}
                  handleChange={handleChange}
                  previousData={selectedRow}
                />
              </CardBody>

              <CardFooter className="pt-0 flex flex-row gap-3">
                <Button
                  type="submit"
                  variant="gradient"
                  onClick={updateHandleOpen}
                  fullWidth
                >
                  Update
                </Button>
                <Button variant="outlined" onClick={updateHandleOpen} fullWidth>
                  Close
                </Button>
              </CardFooter>
            </Card>
          </form>
        </DialogBody>
      </Dialog>

      {/* delete modal */}
      <Dialog open={deleteOpen} size="xs" handler={deleteHandleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Confirmation
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
                Do you want to delete this Ticket?
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
