export const Data = ({ data }: { data: any }) => {
  return (
    <div className="data-container">
      <div className="data-item">
        <p>id:</p>
        <p>{data.id}</p>
      </div>
      <div className="data-item repo-name">
        <p>{data.name}</p>
      </div>

      <div className="data-item">
        <p>{data.description}</p>
      </div>
      <div className="data-item">
        <p>&#11088;</p>
        <p>{data.stargazers_count}</p>
      </div>
      <div className="data-item">
        <a href={data.html_url}>{data.html_url}</a>
      </div>
    </div>
  );
};
