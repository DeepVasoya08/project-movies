import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { actionType } from "../store/reducer";
import { useStateValue } from "../store/store";
import { selectedGenre } from "./Nav";

const Footer = () => {
  const [, dispatch] = useStateValue();
  const router = useRouter();
  const curpage = useRef(1);
  const pageNum = useRef([1, 2, 3, 4, 5, 6]);
  const [pages, setpages] = useState([...pageNum.current]);

  const nextPage = (id) => {
    dispatch({
      type: actionType.set_loading,
      loading: true,
    });
    curpage.current = id;
    router.push(`?genre=${selectedGenre}&page=${curpage.current}`);
    dispatch({
      type: "set_loading",
      loading: false,
    });
  };

  const NextPageNums = () => {
    dispatch({
      type: "set_loading",
      loading: true,
    });
    if (curpage.current == pageNum.current.length) {
      for (let i = 0; i < pageNum.current.length; i++) {
        pageNum.current[i] = pageNum.current[i] + pageNum.current.length;
      }
      setpages([...pageNum.current]);
      nextPage(pageNum.current[0]);
    } else {
      nextPage(curpage.current + 1);
    }
    dispatch({
      type: "set_loading",
      loading: false,
    });
  };

  const PrevPageNums = () => {
    dispatch({
      type: "set_loading",
      loading: true,
    });
    if (curpage.current == 1) {
      dispatch({
        type: "set_loading",
        loading: false,
      });
      return;
    }
    if (curpage.current == pageNum.current[0]) {
      for (let i = 0; i < pageNum.current.length; i++) {
        pageNum.current[i] = pageNum.current[i] - pageNum.current.length;
      }
      setpages([...pageNum.current]);
      nextPage(pageNum.current.length);
    } else {
      nextPage(curpage.current - 1);
    }
    dispatch({
      type: "set_loading",
      loading: false,
    });
  };
  return (
    <div className="flex flex-row justify-center">
      <div
        onClick={PrevPageNums}
        className="flex justify-center m-1 md:m-2 p-2 outline cursor-pointer"
      >
        ...Prev
      </div>
      {pages.map((val) => (
        <div
          key={val}
          className={`${
            curpage.current == val ? "bg-custom-footer-color" : undefined
          } flex justify-center m-1 md:m-2 p-2 outline cursor-pointer`}
          onClick={() => nextPage(val)}
        >
          {val}
        </div>
      ))}
      <div
        onClick={NextPageNums}
        className="flex justify-center m-1 md:m-2 p-2 outline cursor-pointer"
      >
        Next...
      </div>
    </div>
  );
};

export default Footer;
