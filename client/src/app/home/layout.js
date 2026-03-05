import Header from "../components/UI/Header";
import Sidebar from "../components/UI/Sidebar";
export default function HomeLayout({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[url(/bg.jpg)] bg-cover bg-center">
        <Header />
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
