import { FaGithub, FaSearch, FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";

interface UserProps {
  id: number;
  bio: string;
  name: string;
  avatar_url: string;
}

export default function App() {
  const [input, SetInput] = useState("");
  const [data, setData] = useState<UserProps | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowHeader(true), 400); // aparece logo
    setTimeout(() => setShowInput(true), 1000); // depois do header
  }, []);

  async function getData(username: string) {
    setIsLoading(true);
    setError("");
    setData(null);

    setTimeout(() => {
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            setError("Usuário não encontrado");
            SetInput("");
            setIsLoading(false); 
            return null; 
          }
          return response.json();
        })
        .then((data: UserProps | null) => {
          if (data) {
            setData(data);
            console.log(data);
          }
          SetInput("");
          setIsLoading(false); 
        });
    }, 4000);
  }

  return (
    <div className="relative min-h-screen bg-black/92 flex items-center justify-center overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl top-1 right-0 opacity-40 z-0"></div>
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl bottom-10 left-10 opacity-40 z-0"></div>

      <div className="relative bg-black p-10 rounded-xl shadow-lg w-[90%] h-[537px] text-white text-center z-10">
        <div
          className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ease-out transform ${
            showHeader
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <FaGithub size={58} />
          <h1 className="text-6xl font-light">
            Perfil <span className="font-bold">GitHub</span>
          </h1>
        </div>

        <div
          className={`relative w-2/5 mx-auto transition-all duration-700 ease-out transform ${
            showInput ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <input
            type="text"
            placeholder="Digite um usuário do Github"
            className="h-12 w-full px-4 pr-12 rounded-md text-black outline-none bg-white"
            value={input}
            onChange={(e) => SetInput(e.target.value)}
          />
          <button
            onClick={() => getData(input)}
            className="absolute top-[2px] bottom-[2px] right-[1px] w-[49px] h-[45px] bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center cursor-pointer"
          >
            <FaSearch className="text-white text-sm" />
          </button>
        </div>

        {isLoading && (
          <div className="mt-14 flex justify-center items-center">
            <FaSpinner className="animate-spin text-white text-4xl" />
          </div>
        )}

        {data && (
          <div className="  mt-10 mx-auto bg-white text-black rounded-2xl p-5  w-[80%] max-w-3xl flex gap-6 items-center shadow-md">
            <img
              src={data.avatar_url}
              alt="Foto do usuário"
              className="w-56 h-56 rounded-full object-cover border-3 border-blue-500"
            />
            <div>
              <h2 className="text-blue-600 text-lg text-start font-semibold mb-3">
                {data.name}
              </h2>
              <p className="text-sm leading-relaxed text-start">{data.bio}</p>
            </div>
          </div>
        )}

        {error && data == null && (
          <div className="  mt-6 bg-gray-200 text-red-600 font-medium text-center py-4 px-6 rounded-md w-[80%] max-w-2xl mx-auto">
            Nenhum perfil foi encontrado com esse nome de usuário. <br />
            <span className="font-semibold">Tente novamente</span>
          </div>
        )}
      </div>
    </div>
  );
}
