import LoginView from "@/views/Auth/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginView></LoginView>
    </>
  );
};

export default LoginPage;
