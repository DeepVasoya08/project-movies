import reducer, { initialState } from "../store/reducer";
import { StateProvider } from "../store/store";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Body from "../components/Body";
import requests from "../utils/requests";
import Footer from "../components/Footer";

const index = ({ results }) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div itemScope itemType="https://schema.org/Movie">
        <NextSeo
          title="Project Movies"
          description="download free latest movies"
        />
        <Header />
        <Nav />
        <Body results={results} />
        <Footer />
      </div>
    </StateProvider>
  );
};

export default index;

export async function getServerSideProps(context) {
  const genre = context.query.genre || "trending";
  const page = context.query.page || "1";
  const request = await fetch(
    `https://yts.mx/api/v2/list_movies.json?${
      requests[genre]?.url + "&page=" + page
    }`
  ).then((res) => res.json());
  return {
    props: {
      results: request.data.movies,
    },
  };
}
