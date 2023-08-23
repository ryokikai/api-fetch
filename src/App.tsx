import "./App.css";
import { useEffect, useState } from "react";
import { Data } from "./components/Data";
import { Filter } from "./components/Filter";
import { Pagination } from "./components/Pagination";
import { Loading } from "./components/Loading";
import { NoResults } from "./components/NoResults";

const DEFAULT_FILTER = "All";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(DEFAULT_FILTER);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [maybeLastPage, setMaybeLastPage] = useState<null | number>(null);
  const [error, setError] = useState(false);
  const [minPage, setMinPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (minPage === 1) {
      return;
    }
    const newPage = minPage - 5;
    setMinPage(newPage);
    setCurrPage(newPage);
  };

  const handleNextPage = () => {
    const maxPage = minPage + 4;
    if (typeof maybeLastPage === "number" && maxPage + 1 >= maybeLastPage) {
      return;
    }
    const newPage = minPage + 5;
    setMinPage(newPage);
    setCurrPage(newPage);
  };

  const handleClickPage = (page: number) => {
    if (typeof maybeLastPage === "number" && page >= maybeLastPage) {
      return;
    }
    setCurrPage(page);
  };

  const onChangeFilter = (value: string) => {
    setSelectedFilter(value);
  };

  const getFilteredData = () => {
    let arr: any[] = [];
    if (selectedFilter === "All") {
      arr = data;
    } else {
      const minMax = selectedFilter.split(" - ");
      const min = Number(minMax[0]);
      const max = Number(minMax[1]);
      if (!max) {
        arr = data.filter((d: any) => d.stargazers_count >= min);
      } else {
        arr = data.filter(
          (d: any) => d.stargazers_count >= min && d.stargazers_count <= max
        );
      }
    }
    return arr;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/orgs/nodejs/repos?per_page=5&page=${currPage}`
      );
      const json = await res.json();
      if (json.length) {
        setData(json);
      } else {
        setMaybeLastPage(currPage);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
    scrollToTop();
  };

  useEffect(() => {
    fetchData();
  }, [currPage]);

  return (
    <main>
      <Filter onChange={onChangeFilter} selectedOption={selectedFilter} />
      {!loading && !getFilteredData().length ? (
        <NoResults />
      ) : (
        getFilteredData().map((data: any, i: number) => (
          <div key={data.id} className="page-container">
            <Data data={data} />
          </div>
        ))
      )}
      {loading && <Loading />}

      {!loading && error && <p>something went wrong...</p>}

      <Pagination
        currPage={currPage}
        minPage={minPage}
        maybeLastPage={maybeLastPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleClickPage={handleClickPage}
      />
    </main>
  );
}

export default App;
