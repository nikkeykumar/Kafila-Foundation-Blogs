import { useState } from "react";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/logo-DvortFBw.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#ffffff] px-3 fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto  py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 ">
          <img src={logo} className="w-12 h-12" />
          <h1 className=" hidden md:block text-2xl font-semibold text-green-900 font-serif">
            Kafila Foundation
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link className="text-black  text-lg" to="/">
            Blog
          </Link>
          <Link
            className="text-green-900 hover:text-black text-lg"
            to="/support"
          >
            Support our cause
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-green-900"
        >
          {open ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t   border-gray-200">
          <div className="md:hidden pb-4 flex flex-col gap-4   mt-4 ">
            <div className="">
              <Link to="/blog" onClick={() => setOpen(false)}>
                Blog
              </Link>
            </div>
            <div className="text-green-900">
              <Link to="/support" onClick={() => setOpen(false)}>
                Support our cause
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
