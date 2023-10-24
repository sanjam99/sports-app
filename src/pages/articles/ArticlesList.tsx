import { useArticlesState } from "../../context/articles/context";
import React from "react";
import { formatDate } from "../../config/dateFormat";
import { Link } from "react-router-dom";

export default function ArticleList(props) {
  const sportID = props.sportID;
  let state: any = useArticlesState();

  const { articlesDataList, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const filteredArticles = sportID
    ? articlesDataList.filter((article) => {
        return article.sport.id == sportID;
      })
    : articlesDataList;

  return (
    <>
    <div className="flex flex-wrap -m-4">
      {filteredArticles.map((article: any) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={article.id}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
            <div className="w-1/3">
              <Link to={`/articles/${sportID ? article.sport.id : article.id}`}>
                <img
                  src={article.thumbnail}
                  alt="Article Thumbnail"
                  className="w-full h-40 object-cover"
                />
              </Link>
            </div>
            <div className="w-2/3 p-4">
              <p className="text-xs text-gray-500">{article.sport.name}</p>
              <h2 className="text-xl font-semibold text-blue-600">{article.title}</h2>
              <p className="text-sm mt-2 text-gray-700">{article.summary}</p>
              <Link to={`/articles/${sportID ? article.sport.id : article.id}`}>
                <button className="text-blue-500 underline mt-2">Read more</button>
              </Link>
              <p className="text-gray-400 text-sm mt-2">{formatDate(article.date)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
