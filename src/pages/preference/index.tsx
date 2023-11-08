import { useState, Fragment, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

interface PreferencesState {
  sports: string[];
  teams: string[];
}

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState<PreferencesState>({
    sports: [],
    teams: [],
  });

  const [sports, setSports] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      const sportResponse = await fetch(`${API_ENDPOINT}/sports`, {
        method: 'GET',
      });
      const sportData = await sportResponse.json();
      const teamResponse = await fetch(`${API_ENDPOINT}/teams`, {
        method: 'GET',
      });
      const teamData = await teamResponse.json();

      setSports(sportData.sports);
      setTeams(teamData);
    };
    fetchPreferences();
  }, []);
  
  useEffect(() => {
    const fetchPreferences = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        // Fetch the user's previous preferences
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user preferences");
        }

        const responseData = await response.json();
        const { sports: userSports, teams: userTeams } = responseData.preferences;

        // Pre-select the checkboxes based on user's previous preferences
        setSelectedPreferences({
          sports: sports.map((sport) => sport.name).filter((name) => userSports.includes(name)),
          teams: teams.map((team) => team.name).filter((name) => userTeams.includes(name)),
        });
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchPreferences();
  }, [sports, teams]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const category = event.target.getAttribute("data-category") as "sports" | "teams";

    setSelectedPreferences((prevSelectedPreferences) => ({
      ...prevSelectedPreferences,
      [category]: checked
        ? [...prevSelectedPreferences[category], name]
        : prevSelectedPreferences[category].filter((item) => item !== name),
    }));
  };

  const handleSave = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          preferences: selectedPreferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      const responseData = await response.json();
      console.log("User Preferences are:", responseData);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-full bg-gray-900 shadow-md p-1 text-gray-400 hover:text-white"
        id="preferences"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <div className=" p-4 m-2 absolute right-0 ">
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm "
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="flex min-h-screen  items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white text-black p-6 text-left align-middle shadow-xl transition-all rounded-lg">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-white leading-6 text-gray-900 p-2 text-center"
                  >
                    Choose Your Favorites
                  </Dialog.Title>
                  <p className="mb-3 text-xl font-bold text-red-500">Sports</p>
                  <div className="flex flex-wrap gap-4">
                    {" "}
                    {sports.map((sport: any) => (
                      <div key={sport.id}>
                        <input
                          type="checkbox"
                          name={sport.name}
                          id={sport.id}
                          data-category="sports"
                          onChange={handleCheckboxChange}
                          checked={selectedPreferences.sports.includes(
                            sport.name
                          )}
                        />
                        <span className="font-bold"> {sport.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mb-3 text-xl font-bold text-red-500">Teams</p>
                  <div className="flex flex-wrap gap-4">
                    {" "}
                    {teams.map((team: any) => (
                      <div key={team.id}>
                        <input
                          type="checkbox"
                          name={team.name}
                          id={team.id}
                          data-category="teams"
                          onChange={handleCheckboxChange}
                          checked={selectedPreferences.teams.includes(
                            team.name
                          )}
                        />
                        <span className="font-bold"> {team.name}</span>
                      </div>
                    ))}{" "}
                  </div>
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-red-500 p-1 pl-2 pr-2 hover:bg-red-700 rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 p-1 pl-2 pr-2 hover:bg-red-700 rounded"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Preferences;
