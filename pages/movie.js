import Image from "next/image";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import loadingImg from "../public/loading.jpg";

const Movie = () => {
  const router = useRouter();
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const { query } = router;
  query === undefined ? 40201 : query;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${query?.id}`
        )
        .then((res) => setRelatedMovies(res.data.data.movies));
      await axios
        .get(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${query?.id}&with_images=true&with_cast=true`
        )
        .then((res) => setThumbnails(res.data.data.movie));
    };
    fetchData();
  }, [router]);

  return (
    <div>
      <NextSeo title={query?.title} description={query?.summary} />
      <Header />
      <div className="px-5">
        <div className="grid sm:grid lg:grid-cols-3">
          <div>
            <Image
              layout="responsive"
              height={480}
              width={480}
              src={
                query?.medium_cover_image ||
                query?.large_cover_image ||
                query?.small_cover_image
              }
              alt={query?.title}
            />
          </div>
          <div className="text-2xl">
            <h1>
              Title: <span className="font-extralight">{query?.title}</span>
            </h1>
            <h1>
              Year: <span className="font-extralight">{query?.year}</span>
            </h1>
            <h1>
              Genre:{" "}
              <span className="font-extralight">
                {query?.genres[0]},{query?.genres[1]}
              </span>
            </h1>
            <h1>
              Rating:{" "}
              <span className="font-extralight">{query?.rating}/10</span>
            </h1>
            <div className="flex flex-wrap justify-evenly p-2">
              {query?.torrents.map((links, id) => (
                <Button key={id} variant="contained" href={`${links.url}`}>
                  Download
                </Button>
              ))}
              <h1 className="text-lg p-5">
                ⭐use torrent for safer and faster downloads
              </h1>
            </div>
          </div>
          <div>
            <strong>Suggestions: </strong>
            <div className="grid grid-cols-2">
              {relatedMovies.map((res, id) => (
                <div
                  key={id}
                  className="cursor-pointer m-3"
                  onClick={() =>
                    router.push({
                      pathname: "/movie",
                      query: res,
                    })
                  }
                >
                  <Image
                    layout="responsive"
                    height={240}
                    width={240}
                    src={res?.medium_cover_image || res?.large_cover_image}
                    alt={res?.title}
                  />
                  <div>
                    <h2 className="truncate max-w-xs">{res?.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="description">
          <p>
            <strong>Description:</strong> {query?.description_full}
          </p>
        </div>
        <br />
        <div className="description">
          <p>
            <strong>Summary:</strong> {query?.summary}
          </p>
        </div>
        <br />
        <div className="description">
          <p>
            <strong>Synopsis:</strong> {query?.synopsis}
          </p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-4">
          <Image
            height={240}
            width={240}
            layout="responsive"
            src={thumbnails?.medium_cover_image || loadingImg}
            alt={thumbnails?.title}
          />
          <Image
            height={240}
            width={240}
            layout="responsive"
            src={thumbnails?.medium_screenshot_image1 || loadingImg}
            alt={thumbnails?.title}
          />
          <Image
            height={240}
            width={240}
            layout="responsive"
            src={thumbnails?.medium_screenshot_image2 || loadingImg}
            alt={thumbnails?.title}
          />
          <Image
            height={240}
            width={240}
            layout="responsive"
            src={thumbnails?.medium_screenshot_image3 || loadingImg}
            alt={thumbnails?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Movie;
