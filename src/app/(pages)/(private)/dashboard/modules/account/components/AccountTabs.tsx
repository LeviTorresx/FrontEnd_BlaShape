interface Props {
  tab: "profile" | "workshop" | "security";
  setTab: (tab: "profile" | "workshop" | "security") => void;
}

export default function AccountTabs({ tab, setTab }: Props) {

  const tabs = ["profile", "workshop", "security"] as const;
  const tabIndex = tabs.indexOf(tab);

  return (
    <div className="relative max-w-xl">

      <div className="grid grid-cols-3 bg-purple-100 rounded-xl p-1 relative shadow-inner">

        <div
          className="absolute top-1 bottom-1 w-1/3 bg-white rounded-lg shadow transition-transform duration-300"
          style={{ transform: `translateX(${tabIndex * 100}%)` }}
        />

        <button
          onClick={() => setTab("profile")}
          className={`relative z-10 py-2 font-medium ${
            tab === "profile"
              ? "text-purple-700"
              : "text-gray-500"
          }`}
        >
          Perfil
        </button>

        <button
          onClick={() => setTab("workshop")}
          className={`relative z-10 py-2 font-medium ${
            tab === "workshop"
              ? "text-purple-700"
              : "text-gray-500"
          }`}
        >
          Taller
        </button>

        <button
          onClick={() => setTab("security")}
          className={`relative z-10 py-2 font-medium ${
            tab === "security"
              ? "text-purple-700"
              : "text-gray-500"
          }`}
        >
          Seguridad
        </button>

      </div>

    </div>
  );
}