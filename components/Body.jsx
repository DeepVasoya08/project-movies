import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";

const Body = ({ results }) => {
  return (
    <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 xl:grid-cols-5 3xl:flex flex-wrap justify-center">
      {Object.keys(results).map((res, id) => (
        <Thumbnail key={id} result={results[res]} />
      ))}
    </FlipMove>
  );
};

export default Body;
