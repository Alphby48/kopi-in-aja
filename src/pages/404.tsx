import { lora } from "@/font/font";
const CustomErrorPage = () => {
  return (
    <div
      className={`${lora.className} flex flex-col justify-center items-center h-screen text-dark gap-6`}
    >
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default CustomErrorPage;
