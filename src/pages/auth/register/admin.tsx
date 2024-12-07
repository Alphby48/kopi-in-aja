import AdminRegisterView from "@/views/Auth/Register/Admin";
import Head from "next/head";

const adminRegisterPage = () => {
  return (
    <>
      <Head>
        <title>Admin Register</title>
      </Head>
      <AdminRegisterView></AdminRegisterView>;
    </>
  );
};

export default adminRegisterPage;
