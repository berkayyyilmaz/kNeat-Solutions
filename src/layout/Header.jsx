function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md">
      {/* Şirket Adı */}
      <div className="text-lg font-bold text-gray-800">kNeat</div>

      {/* İkonlar */}
      <div className="flex items-center space-x-4">
        {/* Profil */}
        <button className="text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A8 8 0 1117.804 5.121m-6.683 6.683a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243z"
            />
          </svg>
        </button>

        {/* Search */}
        <button className="text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zm5.121-3.879l4.243 4.243"
            />
          </svg>
        </button>

        {/* Cart */}
        <button className="text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8a1 1 0 100 2 1 1 0 000-2m10 0a1 1 0 100 2 1 1 0 000-2M7 13L5.4 5m4 0h9.6"
            />
          </svg>
        </button>

        {/* Menü */}
        <button className="text-gray-600 hover:text-gray-800 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
export default Header;
