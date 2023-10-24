import React, { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { Disclosure } from "@headlessui/react";
import ArticleList from "./ArticleList";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSportsState } from "../../context/sports/context";

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(" ");

const Articles = () => {
  let { sportID } = useParams();
  const sportState: any = useSportsState();
  const { sportsDataList, isLoading, isError, errorMessage } = sportState;
  const { pathname } = useLocation();
  const navigation = [
    { name: "All News", href: "/", current: sportID === undefined },
    ...sportsDataList.map((sport: any) => ({
      name: sport.name,
      href: `/${sport.id}`,
      current: sportID == sport.id,
    })),
  ];
  const articlesDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articlesDispatch);
  }, []);

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {({ open }) => (
          <div className="mx-auto max-w-7xl">
            <div className="flex h-10">
              <div className="">
                <div className="flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-green-200 text-green-700"
                          : "text-slate-500 hover:text-blue-600",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
      <div className="mt-5">
        <ArticleList sportID={sportID} />
      </div>
    </>
  );
};

export default Articles;
