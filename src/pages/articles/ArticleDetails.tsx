import { useEffect, useState, Fragment } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";

interface ArticleData {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
  content: string;
}

const ArticleDetails: React.FC<{ id: number }> = ({ id }) => {
  const [ArticleData, setMatchData] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const ArticleDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }
const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error("Error fetching match details", error);
    }
  };

  useEffect(() => {
    ArticleDetails();
  }, [id]);

  return (
    <>
      <div className="relative flex justify-left">
        <button type="button" onClick={openModal} style={{ color: "blue" }}>
          Read more
        </button>
      </div>
      <div>
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-full backdrop-blur-sm"
            onClose={closeModal}
          >
            <div className="flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-9/12 transform overflow-hidden bg-white text-black p-6 text-left shadow-xl transition-all rounded-lg">
                  {ArticleData && (
                    <>
<button type="button" onClick={closeModal} className="bg-red rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
                      <div className="text-center font-bold">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-bold leading-6 p-4 m-1"
                        >
                          {ArticleData.title}
                        </Dialog.Title>
                      </div>
                      <p>
                        <span className="text-white font-bold pr-2">
                          {ArticleData.sport.name}{" "}
                        </span>
                      </p>
                      <img
                        className="h-80 w-80 static border-4 rounded-xl border-gray-300 object-cover"
                        src={ArticleData.thumbnail}
                      />{" "}
                      <p>{ArticleData.date.slice(0, 10)}</p>
                      <div className="mt-4">{ArticleData.content}</div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default ArticleDetails;