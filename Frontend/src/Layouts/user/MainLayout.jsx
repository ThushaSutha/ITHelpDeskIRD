
import Header from '../../Layouts/Header';

import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet /> {/* This renders the nested route (e.g., Dashboard) */}
    </main>
  </>
);

export default MainLayout;

