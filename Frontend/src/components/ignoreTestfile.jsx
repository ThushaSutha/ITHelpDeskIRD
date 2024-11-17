import React, { useState } from "react";



import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  PencilSquareIcon,
  ViewfinderCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import LordIconComponent from "../Icons/LordIconComponent";

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const TABLE_HEAD = [
  "Ticket ID",
  "Issue Type",
  "Status",
  "Priority",
  "Last Update",
  "Action",
];
const TABLE_ROWS = [
  {
    id: 123,
    type: "Network Issue",
    status: "Open",
    priority: "High",
    update_at: "23/04/18",
  },
  {
    id: 456,
    type: "Software Issue",
    status: "Close",
    priority: "Medium",
    update_at: "23/04/18",
  },
  {
    id: "789",
    type: "RAMIS Issue",
    status: "In-Progress",
    priority: "Low",
    update_at: "19/09/17",
  },
];

function MyTicket() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(TABLE_ROWS);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterRows(query);
  };

  const filterRows = (query) => {
    const filtered = TABLE_ROWS.filter(
      (row) =>
        row.type.toLowerCase().includes(query.toLowerCase()) ||
        row.id.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Welcome Reyanson
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about your tickets
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm">
              <svg
                className="h-4 w-4"
                dataSlot="icon"
                fill="none"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              Create ticket
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                  <LordIconComponent />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    No records found
                  </Typography>
                </td>
              </tr>
            ) : (
              filteredRows.map(
                ({ id, type, status, priority, update_at }, index) => (
                  <tr key={id}>
                    <td className="p-4 border-b border-blue-gray-50">{id}</td>
                    <td className="p-4 border-b border-blue-gray-50">{type}</td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {status}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {priority}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {update_at}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                      <Tooltip content="View Ticket">
                        <IconButton variant="text">
                          <ViewfinderCircleIcon className="h-4 w-4 text-green-700" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit Ticket">
                        <IconButton variant="text">
                          <PencilSquareIcon className="h-4 w-4 text-blue-700" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Ticket">
                        <IconButton variant="text">
                          <TrashIcon className="h-4 w-4 text-red-700" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default MyTicket;
