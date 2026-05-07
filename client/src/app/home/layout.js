import Header from "../components/UI/Header";
import Sidebar from "../components/UI/Sidebar";

export default function HomeLayout({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[url(/bg.jpg)] bg-cover bg-center bg-fixed">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
        </div>
        <main className="flex-1 p-8 flex justify-center pt-20">
          <div className="w-full max-w-lg">{children}</div>
        </main>
      </div>
    </>
  );
}
