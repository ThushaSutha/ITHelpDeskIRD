import { useParams } from "react-router-dom";

import NewTicket from "./NewTicket";
import MyTicket from "./MyTicket";

function Dashboard() {
  // Get the current route parameter (either 'my-ticket' or 'create-ticket')
  const { view } = useParams();

  return (
    <>
      {/* Display dynamic content based on the current route */}

      {!view || view === "my-ticket" ? <MyTicket /> : null}
      {view === "create-ticket" && <NewTicket />}
    </>
  );
}

export default Dashboard;
