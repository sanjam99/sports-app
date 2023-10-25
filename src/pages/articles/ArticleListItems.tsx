import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "./ArticleDetails";
import { Tab } from "@headlessui/react";

export default function ArticleListItems() {
  let state: any = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const renderArticleDetailsWithId = (id: number) => {
    return <ArticleDetails id={id} />;
  };

  type Sports = {
    id: number;
    name: string;
  };
  interface PreferencesState {
    sports: string[];
    teams: string[];
  }
  const [preferences, setPreferences] = useState<PreferencesState>({
    sports: [],
    teams: [],
  });
  const [sports, setSports] = useState<Sports[]>([]);

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

  useEffect(() => {
    const fetchPreferences = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setPreferences(data.preferences);
      }
    };
    fetchPreferences();
  }, []);

  const [selectedSport, setSelectSport] = useState<number | "all">("all");

  const selectSport = (sportId: number | "all") => {
    setSelectSport(sportId);
  };

  const [sortBy, setSortBy] = useState("date");

  const sortArticles = (a: any, b: any) => {
    switch (sortBy) {
      case "date":
        return a.date.localeCompare(b.date);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  };
  const user = localStorage.getItem("authToken");

  const filteredArticles =
    selectedSport === "all"
      ? articles
      : articles.filter((article: any) => article.sport.id === selectedSport);

  filteredArticles.sort(sortArticles);
  return (
    <>
      {user &&
      Object.keys(preferences) &&
      (Object.keys(preferences).length > 0 ||
        Object.keys(preferences).length === 2) ? (
        <Tab.Group>
          <div className="flex justify-between">
            <Tab.List className="space-x-4 rounded p-1 w-20/12 bg-white">
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
                {sports.map(
                  (sport: any) =>
                    preferences.sports.includes(sport.name) && (
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
                    )
                )}
              </Tab>
            </Tab.List>
            <Tab.List className="space-x-4 rounded p-1 w-20/12 flex justify-end">
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
            {preferences && preferences.sports.length ? (
              <Tab.Panel>
                {filteredArticles.length === 0 ? (
                  <h1>no imgs</h1>
                ) : (
                  filteredArticles.map(
                    (article: any) =>
                      preferences.sports.includes(article.sport.name) && (
                        <div
                          key={article.id}
                          className="w-90 my-9 container flex-1 rounded border border-black flex text-left bg-red-300"
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
                                <span className="font-bold">
                                  {" "}
                                  {article.title}
                                </span>
                              </p>
                              <p>
                                <span className=""> {article.summary}</span>
                              </p>
                              <p className="">
                                Date : {article.date.slice(0, 10)}
                              </p>
                            </span>
                            <div className="flex justify-left">
                              {renderArticleDetailsWithId(article.id)}
                            </div>
                          </div>
                        </div>
                      )
                  )
                )}
              </Tab.Panel>
            ) : (
              <Tab.Panel>
                {filteredArticles.length === 0 ? (
                  <h1>no imgs</h1>
                ) : (
                  filteredArticles.map((article: any) => (
                    <div
                      key={article.id}
                      className="w-90 my-9 container flex-1 rounded border border-black flex text-left bg-red-300"
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
            )}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <Tab.Group>
          <div className="flex justify-between">
            <Tab.List className="space-x-4 rounded border-2 border-black p-1 w-20/12 bg-white">
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
                  All Sports
                </p>
                {sports.map((sport: any) => (
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
            <Tab.List className="space-x-4 rounded p-1 w-20/12 flex justify-end">
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
                <h1>no imgs</h1>
              ) : (
                filteredArticles.map((article: any) => (
                  <div
                    key={article.id}
                    className="w-90 my-9 container flex-1 rounded border border-black flex text-left bg-red-300"
                  >
                    <div className=" object-cover">
                      <img
                        className="h-40 w-40 static border-4 rounded-xl border-gray-300 object-cover relative"
                        src={article.thumbnail}
                      />
                    </div>
                    <div className="px-4 py-4 ">
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
      )}
    </>
  );
}