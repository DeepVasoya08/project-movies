import requests from "../utils/requests";
import { useRouter } from "next/router";
import { useStateValue } from "../store/store";
import { actionType } from "../store/reducer";

export let selectedGenre = "trending";
const Nav = () => {
  const router = useRouter();
  const [, dispatch] = useStateValue();

  const handleClick = (e) => {
    selectedGenre = e;
    dispatch({
      type: actionType.set_loading,
      loading: true,
    });
    router.push(`/?genre=${e}&page=1`);
    dispatch({
      type: actionType.set_loading,
      loading: false,
    });
  };
  return (
    <nav className="relative">
      <div className="flex z-0 px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
        {Object.entries(requests).map(([key, { title }]) => (
          <h2
            key={key}
            onClick={() => handleClick(key)}
            className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500"
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-t from-[#06202A] h-10 w-1/12" />
    </nav>
  );
};

export default Nav;
