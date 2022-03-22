import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";
import { forwardRef } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../store/store";
import { CircularProgress } from "@mui/material";

const Thumbnail = forwardRef(({ result }, ref) => {
  const [{ loading }] = useStateValue();
  const router = useRouter();
  return (
    <div
      ref={ref}
      className="p-2 z-0 group cursor-pointer transition duration-200 transform sm:hover:scale-105 hover:z-50"
      onClick={() =>
        router.push({
          pathname: "/Movie",
          query: { data: JSON.stringify(result) },
        })
      }
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Image
            priority="true"
            layout="responsive"
            height={540}
            width={480}
            src={
              result.medium_cover_image ||
              result.large_cover_image ||
              result.small_cover_image
            }
            alt={result?.title}
          />
          <div className="p-2">
            <p className="truncate max-w-md">{result.summary}</p>
            <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
              {result.title}
            </h2>
            <p className="flex items-center">
              {result.year} <ThumbUpIcon className="h-5 mx-2" />
              {result.rating}/10
            </p>
          </div>
        </>
      )}
    </div>
  );
});

export default Thumbnail;
