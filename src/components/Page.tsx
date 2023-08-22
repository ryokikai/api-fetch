export const Page = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="page-item">
        <p>id: </p>
        <p>{data.id}</p>
      </div>
      <div className="page-item">
        <p>name: </p>
        <p>{data.name}</p>
      </div>
      <div className="page-item">
        <p>description: </p>
        <p>{data.description}</p>
      </div>
      <div className="page-item">
        <p>link: </p>
        <a href={data.html_url}>{data.html_url}</a>
      </div>
      <div className="page-item">
        <p>stars: </p>
        <p>{data.stargazers_count}</p>
      </div>
    </div>
  );
};
