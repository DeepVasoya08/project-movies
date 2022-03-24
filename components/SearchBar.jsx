import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const Exp = /^([0-9_ ]|[a-z_ ])+([0-9_ a-z_ ]+)$/i;

  const handleSearch = async () => {
    if (input.match(Exp) && input) {
      await axios
        .get(`https://yts.mx/api/v2/list_movies.json?query_term=${input}`)
        .then((res) => setSearch(res.data.data.movies));
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <div className="w-48 md:w-43">
      <div className="flex">
        <input
          className="bg-custom-gray outline-none text-black rounded-md h-9 p-1"
          type="search"
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {input.match(Exp) ? (
        <div className="mt-1 h-96 z-auto bg-white overflow-hidden overflow-y-auto shadow-custom-shadow scrollbar-hide">
          {search.map((res, id) => (
            <div
              key={id}
              className="cursor-pointer mb-2 w-full h-13 flex items-center text-black hover:bg-gray-500"
              onClick={() =>
                router.push({
                  pathname: "/movie",
                  query: res,
                })
              }
            >
              <Image
                layout="fixed"
                height={50}
                width={50}
                src={res?.medium_cover_image}
                alt={res?.title}
              />
              <h1>{res?.title}</h1>
            </div>
          ))}
        </div>
      ) : undefined}
    </div>
  );
};

export default SearchBar;
