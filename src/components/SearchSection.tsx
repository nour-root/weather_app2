export default function SearchSection() {
  return (
    <section className="text-white p-4 my-6 space-y-6">
      <h1 className="text-6xl font-Bricolage text-center">
        How's the sky looking today?
      </h1>
      <form className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="w-full md:w-1/3 bg-secondary flex items-center space-x-4 p-3 rounded-lg">
          <img src="/assets/images/icon-search.svg" alt="" />
          <input
            type="text"
            className="text-white font-medium tracking-wide focus:outline-0"
            placeholder="Search for a place..."
          />
        </div>
        <button
          type="submit"
          className="bg-primary w-full p-2.5 rounded-lg hover:bg-primary/90 md:w-fit"
        >
          Search
        </button>
      </form>
    </section>
  );
}
