import { signOut } from "next-auth/react";

function NavBar({ user, router }) {
  const handlerLogout = () => {
    signOut();
    router.replace("/");
  };
  return (
    <div className="bg-[#333] px-[14px] py-[16px] flex justify-between items-center">
      <div>
        <p className="text-lg text-white font-semibold">{user?.user?.name}</p>
      </div>
      <button
        className="bg-blue-300 text-sm font-medium rounded p-2"
        type="button"
        onClick={handlerLogout}
      >
        LogOut
      </button>
    </div>
  );
}

export default NavBar;
