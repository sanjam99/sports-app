import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticleList: React.FC = () => {
  const dispatchArticles = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <ArticleListItems />
    </div>
  );
};
export default ArticleList;