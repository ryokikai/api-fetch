interface FilterProps {
  onChange: (value: string) => void;
  selectedOption: string;
}

const filterOptions = ["All", "1 - 100", "101 - 500", "501 - 1000", "1001 - "];

export const Filter = ({ onChange, selectedOption }: FilterProps) => {
  return (
    <div className="sticky-container">
      <div>
        <img src="./github-mark.svg" className="gh-logo" alt="GitHub" />
        <h1>GitHub Repositories</h1>
      </div>
      <div>
        <label>Star range: </label>
        <select
          onChange={(e) => onChange(e.target.value)}
          value={selectedOption}
        >
          {filterOptions.map((option, i) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
