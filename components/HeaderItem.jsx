import { useRouter } from "next/router";
import React from "react";

const HeaderItem = ({ title, Icon }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => (title == "HOME" ? router.push("/") : undefined)}
      className="flex flex-col items-center cursor-pointer w-12 sm:w-20 hover:text-white group"
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest">
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
