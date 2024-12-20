/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { poppins } from "@/font/font";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

const ProfilePage = () => {
  const { data }: any = useSession();
  return (
    <div className={`${poppins.className} text-dark w-full min-h-screen`}>
      <div className="flex justify-around items-center w-full pt-20">
        <div>
          {data?.user?.image ? (
            <Image
              className="rounded-full"
              src={data.user.image}
              width={200}
              height={200}
              alt={data && data.user.fullname}
            ></Image>
          ) : (
            <CgProfile size={200} />
          )}
        </div>
        <table className="w-1/3">
          <thead>
            <tr>
              <th className="text-left">Email</th>
              <td>{data?.user?.email}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-left">Fullname</th>
              <td>{data?.user?.fullname}</td>
            </tr>
            <tr>
              <th className="text-left">Role</th>
              <td>{data?.user?.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProfilePage;
