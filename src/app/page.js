"use client";
import UnderDevelopment from "@/components/UnderDevelopment";
import Image from "next/image";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

const Page = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    // container
    <div className="relative w-full h-auto bg-gradient-to-b from-black to-red-950 flex items-center justify-center">
      {/* top session */}
      <div className="w-full h-screen">
        {/* navbar */}
        <nav className=" w-full h-12 flex items-center justify-between ">
          <div className="flex">
            <Image
              src="/your-image-path.jpg"
              alt="Description of Image"
              width={10}
              height={10}
            />
            <h1 className="text-white text-2xl font-bold">Mukilan Rajaram</h1>
          </div>
          <IoMenu className="text-white" />
        </nav>
        <h1 className="text-white text-8xl font-extrabold">Mukilan Rajara</h1>
      </div>

      {/* {showPopup && <UnderDevelopment />} */}
    </div>
  );
};

export default Page;
