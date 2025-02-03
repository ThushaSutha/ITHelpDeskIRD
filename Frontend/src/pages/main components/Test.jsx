import {
    Input,
    Button,
    IconButton,
    Tooltip,
    Dialog,
    DialogBody,
    DialogFooter,
    Collapse,
    Typography,
  } from "@material-tailwind/react";
  import {
    List,
    ListItem,
  } from "@material-tailwind/react";
  import { useState } from "react";
  import {
    ViewfinderCircleIcon,
    ChevronDownIcon,
    TicketIcon,
    ClockIcon ,
    Bars3BottomLeftIcon,
    InformationCircleIcon 
  } from "@heroicons/react/24/solid";
  import Avatar from "react-avatar";
  import SelectInput from "./SelectInput";
  import { CommentSection } from "react-comments-section";
  import BgAttachment from "../../assets/attachment-bg.svg"
import { ActivitiesTimeline } from "./TimeLine";
import Conversation from "../../assets/conversation.mp4"




export default function Test(){
  const [viewOpen, setViewOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState(false);
  const [openTicketInfo, setOpenTicketInfo] = useState(false);
  const [statusBtn, setStatusBtn] = useState(false);
  const [priorityBtn, setPriorityBtn] = useState(false);
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
  console.log("selected", prioritySelectedOption);
    const handleOpen = () => {
        setViewOpen(!viewOpen);
      };
      const handleView = () => {

        setViewOpen(!viewOpen);
      };
      const toggleOpen = () => setOpen((cur) => !cur);


    return(
        <>

        <Tooltip content={"View Ticket"}>
            <IconButton variant="text" onClick={() => handleView()}>
              <ViewfinderCircleIcon className="h-4 w-4 text-green-700" />
            </IconButton>
          </Tooltip>

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
        
        </>
    );
}