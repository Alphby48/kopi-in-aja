import SidebarLayout from "@/components/layout/sidebar";
import AdminView from "@/views/Admin";

const adminPage = () => {
  return (
    <SidebarLayout>
      <AdminView />
    </SidebarLayout>
  );
};

export default adminPage;
