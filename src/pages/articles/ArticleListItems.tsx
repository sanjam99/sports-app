import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "./ArticleDetails";
import { Tab } from "@headlessui/react";

export default function ArticleListItems() {
  let state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const renderArticleDetailsWithId = (id) => {
    return <ArticleDetails id={id} />;
  };

  const Sports = {
    id: number,
    name: string,
  };

  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
      });
      const data = await response.json();
      setSports(data.sports);
    };
    fetchSports();
  }, []);

  const [selectedSport, setSelectSport] = useState("all");

  const selectSport = (sportId) => {
    setSelectSport(sportId);
  };

  const [sortBy, setSortBy] = useState("date");

  const sortArticles = (a, b) => {
    switch (sortBy) {
      case "date":
        return a.date.localeCompare(b.date);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  };

  const filteredArticles =
    selectedSport === "all"
      ? articles
      : articles.filter((article) => article.sport.id === selectedSport);

  filteredArticles.sort(sortArticles);

  return (
    <>
      <Tab.Group>
        <div className="flex justify-between">
          <Tab.List className="space-x-4 bg-white p-1 w-20/12">
            <Tab>
              <p
                key="all"
                className={
                  selectedSport === "all"
                    ? "active border-2 p-2 border-black rounded-lg inline-block"
                    : "p-2 border-black rounded-lg inline-block"
                }
                onClick={() => selectSport("all")}
              >
                {" "}
                Your News
              </p>
              {sports.map((sport) => (
                <p
                  key={sport.id}
                  className={
                    selectedSport === sport.id
                      ? "active border-2 p-2 border-black rounded-lg inline-block"
                      : "p-2 border-black rounded-lg inline-block"
                  }
                  onClick={() => selectSport(sport.id)}
                >
                  {" "}
                  {sport.name}
                </p>
              ))}
            </Tab>
          </Tab.List>
          <Tab.List className="space-x-4 p-1 w-20/12 flex justify-end">
            <select
              name="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            {filteredArticles.length === 0 ? (
           <h1> no news</h1>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="w-90 my-9 container flex-1 rounded border border-black flex text-left bg-white"
                >
                  <div className=" object-cover">
                    <img
                      className="h-40 w-40 static border-4 rounded-xl border-gray-300 object-cover relative"
                      src={article.thumbnail}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <span className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white ">
                      {article.sport.name}
                      <p className="font-bold ">
                        <span className="font-bold"> {article.title}</span>
                      </p>
                      <p>
                        <span className=""> {article.summary}</span>
                      </p>
                      <p className="">Date : {article.date.slice(0, 10)}</p>
                    </span>
                    <div className="flex justify-left">
                      {renderArticleDetailsWithId(article.id)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
