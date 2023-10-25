import ArticleList from "./ArticlesList";

const Articles = () => {
  return (
    <>
      <h2 className="text-xl font-medium text-black flex justify-left ml-9">
        Trending News
      </h2>
      <ArticleList />
    </>
  );
};

export default Articles;