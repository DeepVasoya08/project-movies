import { HomeIcon, UserIcon } from "@heroicons/react/outline";

import HeaderItem from "./HeaderItem";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="flex z-50 flex-col sm:flex-row mt-3 mb-3 mr-3 justify-end items-center h-auto">
      <div className="flex justify-evenly max-w-2xl">
        <div className="flex flex-col">
          <SearchBar />
        </div>
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="ACCOUNT" Icon={UserIcon} />
      </div>
    </header>
  );
};

export default Header;
