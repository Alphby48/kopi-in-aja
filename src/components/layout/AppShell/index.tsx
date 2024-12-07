import { useRouter } from "next/router";
import NavbarLayout from "../navbar";
const disablePath = [
  "/auth/login",
  "/auth/register",
  "/auth/register/admin",
  "/admin",
];

type AppShellType = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellType) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <div className="bg-dark">
      {!disablePath.includes(pathname) && <NavbarLayout />}
      <div className={disablePath.includes(pathname) ? "" : "pt-20"}>
        {children}
      </div>
    </div>
  );
};

export default AppShell;
