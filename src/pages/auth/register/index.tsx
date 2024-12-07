import RegisterView from "@/views/Auth/Register";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterView></RegisterView>;
    </>
  );
};

export default RegisterPage;
