interface FilterProps {
  onChange: (value: string) => void;
  selectedOption: string;
}

const filterOptions = ["All", "1 - 100", "101 - 500", "501 - 1000", "1001 - "];

export const Filter = ({ onChange, selectedOption }: FilterProps) => {
  return (
    <div className="sticky-container">
      <select onChange={(e) => onChange(e.target.value)} value={selectedOption}>
        {filterOptions.map((option, i) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
