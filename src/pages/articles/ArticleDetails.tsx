import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useArticlesDispatch, useArticlesState } from "../../context/articles/context";
import { ArticleData } from "../../context/articles/types";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const ArticleDetails = () => {
  const articleState = useArticlesState();
  const articleDispatch = useArticlesDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();
  const { articleID } = useParams();
  const navigate = useNavigate();
  const selectedArticle = articleState?.articlesDataList.find((article) => `${article.id}` === articleID);
  const previousUrl = pathname;

  if (!selectedArticle) {
    return <>No such Article!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate(previousUrl);
  }

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
        <div className="min-h-screen flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="relative bg-white w-full max-w-md rounded-lg overflow-hidden shadow-xl">
              <div className="p-6 text-left">
                <div className="text-right">
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 absolute top-3 right-3"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                <h3 className="text-3xl font-medium leading-6 text-gray-900 mb-5">Article Details</h3>
                <img src={selectedArticle.thumbnail} alt="Article Thumbnail" className="w-full h-48 object-cover mb-5" />
                <h2 className="text-xl font-semibold mb-2">{selectedArticle.title}</h2>
                <p className="text-sm mb-5">{selectedArticle.summary}</p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </>
  );
};

export default ArticleDetails;
