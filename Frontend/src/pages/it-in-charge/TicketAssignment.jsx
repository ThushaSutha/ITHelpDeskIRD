import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Checkbox,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";
import TicketService from "../../services/ticket.service";
import UserService from "../../services/user.service";
import { DragIndicator, Person, Assignment, CheckCircle } from "@mui/icons-material";

export default function TicketAssignment() {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [notification, setNotification] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState([]);


  // Fetch tickets with pagination
  const retrieveTicket = async (page) => {
    setLoading(true);
    try {
      const response = await TicketService.getUnassignedAll(page, 8);
      const newTickets = response.data.data;
      console.log("Tickets",newTickets);
      setTickets((prevTickets) => {
        const existingIds = new Set(prevTickets.map((ticket) => ticket.id));
        const filteredNewTickets = newTickets.filter(
          (ticket) => !existingIds.has(ticket.id)
        );
        return [...prevTickets, ...filteredNewTickets];
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to fetch tickets. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch team members
  const retrieveUsers = async (role) => {
    setLoading(true);
    try {
      const response = await UserService.getByRole(role);
      setTeamMembers(response.data.data);
      console.log("User's data",response);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to fetch team members. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isNearBottom && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading]);

  // Attach scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // Fetch data on page change
  useEffect(() => {
    retrieveTicket(page);
  }, [page]);

  // Fetch team members on mount
  useEffect(() => {
    retrieveUsers("it_team");
  }, []);

  // Drag and drop handlers
  const handleDragStart = (e, ticketId) => {
    e.dataTransfer.setData("ticketId", ticketId);
  };

  const handleDrop = async (e, memberId) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");
    await assignTicket(ticketId, memberId);
  };

  // Assignment logic with API call
  const assignTicket = async (ticketId, memberId) => {
    try {
      const dataPayload = {
        id: ticketId,
        assigned_to: memberId,
      };
      const response = await TicketService.assignTicket(dataPayload);
      console.log("The ticket has been assigned to the team member", response);
  
      // Ensure state updates correctly
      setTickets((prevTickets) => {
        const updatedTickets = prevTickets.filter((ticket) => ticket.id != ticketId);
        console.log("Updated tickets",updatedTickets);
        return [...updatedTickets];
      });
  
      // Update workload count for the assigned team member
      setTeamMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === memberId
            ? { ...member, tickets: [...member.tickets, ticketId] }
            : member
        )
      );
  
      setNotification({
        type: "success",
        message: `Ticket ${ticketId} assigned successfully!`,
      });
    } catch (error) {
      console.error("Error assigning ticket:", error);
      setNotification({
        type: "error",
        message: `Failed to assign ticket ${ticketId}. Please try again.`,
      });
    }
  };
  
  
  
  

  // Bulk assignment with API call
  const handleBulkAssign = async () => {
    if (!selectedMember || selectedTickets.length === 0) return;
  
    try {
      await TicketService.bulkAssignTickets(selectedTickets, selectedMember);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          selectedTickets.includes(ticket.id)
            ? { ...ticket, assignedTo: selectedMember }
            : ticket
        )
      );
  
      // Update workload count for the assigned team member
      setTeamMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === selectedMember
            ? { ...member, tickets: [...member.tickets, ...selectedTickets] }
            : member
        )
      );
  
      setSelectedTickets([]);
      setNotification({
        type: "success",
        message: `${selectedTickets.length} tickets assigned!`,
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to bulk assign tickets. Please try again.",
      });
    }
  };
  

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority.toString() === "" || ticket.priority.toString() === selectedPriority.toString();
    return matchesSearch && matchesPriority && !ticket.assignedTo;
  });

 

  return (
    <div className="p-6 mt-5">
      <Typography variant="h4" className="mb-6 flex items-center gap-2">
        <Assignment className="h-6 w-6" /> Ticket Assignment Dashboard
      </Typography>

      {notification && (
        <Alert
          color={notification.type === "success" ? "green" : "red"}
          className="mb-4"
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}

      <div className="flex gap-4 mb-6">
        <Input
          label="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<i className="fas fa-search" />}
        />
        <Select
          label="Filter by Priority"
          value={selectedPriority}
          onChange={(value) => setSelectedPriority(value)}
        >
          <Option value="">All Priorities</Option>
          <Option value="2">High</Option>
          <Option value="1">Medium</Option>
          <Option value="0">Low</Option>
        </Select>
      </div>

      <div className="flex gap-6">
        {/* Unassigned Tickets Panel */}
        <Card className="flex-1 p-4">
          <Typography variant="h5" className="mb-4">
            Unassigned Tickets ({filteredTickets.length})
          </Typography>

          <div
            className="flex flex-col gap-2"
            ref={scrollContainerRef}
            style={{ maxHeight: "350px", overflowY: "auto" }}
          >
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                draggable
                onDragStart={(e) => handleDragStart(e, ticket.id)}
                className="p-4 border rounded-lg hover:bg-blue-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTickets([...selectedTickets, ticket.id]);
                      } else {
                        setSelectedTickets(
                          selectedTickets.filter((id) => id !== ticket.id)
                        );
                      }
                    }}
                  />
                  <DragIndicator className="cursor-move" />
                  <div className="flex-1">
                    <Typography variant="h6">{ticket.id} {ticket.model}</Typography>
                    <div className="flex gap-2 text-sm">
                      <span
                        className={`badge ${
                          ticket.priority === "high"
                            ? "bg-red-500"
                            : ticket.priority === "medium"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        } text-white px-2 rounded`}
                      >
                        {ticket.priority}
                      </span>
                      <span>{ticket.category}</span>
                      <span>Submitted by: {ticket.submittedBy}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && <div>Loading...</div>}
          </div>
        </Card>

        {/* Team Members Panel */}
        <Card className="flex-1 p-4">
          <Typography variant="h5" className="mb-4">
            IT Team Members
          </Typography>

          <div className="mb-4 flex gap-2">
            <Select
              label="Select Team Member"
              value={selectedMember}
              onChange={(value) => setSelectedMember(value)}
              className="flex-1"
            >
              {teamMembers.map((member) => (
                <Option key={member.id} value={member.id}>
                  {member.name} ({member.tickets.length} tasks)
                </Option>
              ))}
            </Select>
            <Button
              onClick={handleBulkAssign}
              disabled={!selectedMember || selectedTickets.length === 0}
            >
              Assign Selected
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onDrop={(e) => handleDrop(e, member.id)}
                onDragOver={(e) => e.preventDefault()}
                className="p-4 border rounded-lg hover:bg-blue-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Person
                    className={`text-${
                      member.availability === "online"
                        ? "green"
                        : member.availability === "busy"
                        ? "orange"
                        : "red"
                    }-500`}
                  />
                  <div className="flex-1">
                    <Typography variant="h6">{member.name}</Typography>
                    <div className="flex gap-2 text-sm">
                      <span>{member.role}</span>
                      <span>Workload: {member.tickets.length}  tickets</span>
                    </div>
                  </div>
                  <CheckCircle className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}