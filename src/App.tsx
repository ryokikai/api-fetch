import "./App.css";
import { useEffect, useState } from "react";
import { Page } from "./components/Page";
import { Filter } from "./components/Filter";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [error, setError] = useState(false);

  const getNextPage = () => {
    setCurrPage((prev) => prev + 1);
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
        const newData = [...data, ...json];
        setData(newData);
      } else {
        setIsLastPage(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currPage]);

  return (
    <main>
      <Filter onChange={onChangeFilter} selectedOption={selectedFilter} />
      {getFilteredData().length ? (
        getFilteredData().map((data: any, i: number) => (
          <div key={data.id} className="page-container">
            <Page data={data} />
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
      {loading && <p>loading...</p>}
      {error && <div>something went wrong while loading...</div>}
      {isLastPage ? (
        <p>- End of Repos -</p>
      ) : (
        <button className={`page-btn`} onClick={() => getNextPage()}>
          <p>get next page</p>
        </button>
      )}
    </main>
  );
}

export default App;
