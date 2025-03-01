import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const location = useLocation();
  const shouldShowSearchInput = location.pathname !== "/register" && location.pathname !== "/login";

  const getCurrentWeekDay = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    const day = weekday[d.getDay()];
    return day;
  };

  return (
    <header className="flex justify-between items-center py-10 px-24 shadow-md header-bg">
        <div className="w-1/3 flex items-center justify-start">
            <a href="/">
                <span className="font-bold text-4xl text-red-500">ToDo</span>
                <span className="font-bold text-4xl">Ly</span>
            </a>
        </div>
      

        {shouldShowSearchInput && (
        <div className="w-1/3 flex items-center justify-center relative">
            <input
                type="text"
                placeholder="Search your task here..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full pr-10"
            />
                <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-600 hover:cursor-pointer"
            />
        </div>
      )}

      <div className="w-1/3 flex flex-col items-end">
        <div className="text-xl">
          Today is <span className="text-cyan-500">{new Date().toLocaleDateString()}</span>,
        </div>
        <div className="text-lg">
          It is <span className="font-bold text-black">{getCurrentWeekDay()}</span>😊!
        </div>
      </div>
    </header>
  );
}

export default Header;