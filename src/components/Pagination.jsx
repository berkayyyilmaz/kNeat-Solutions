export default function Pagination({
  totalPosts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap gap-2">
        {pages.map((page, index) => (
          <li key={index}>
            <button
              className={`rounded border px-3 py-1 ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
