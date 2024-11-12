import { useParams } from "react-router-dom";

import NewTicket from "../main components/NewTicket";
import MyTicket from "../main components/MyTicket";

function Dashboard() {
  // Get the current route parameter (either 'my-ticket' or 'create-ticket')
  const { view } = useParams();

  return (
    <div>
      {/* Display dynamic content based on the current route */}

      {!view || view === "my-ticket" ? <MyTicket /> : null}
      {view === "create-ticket" && <NewTicket />}
    </div>
  );
}

export default Dashboard;
