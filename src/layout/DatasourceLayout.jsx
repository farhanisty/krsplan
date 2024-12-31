const Header = ({ children }) => {
  return <h1 className="border-b pb-2  font-medium text-md">{children}</h1>;
};

const Body = ({ children }) => {
  return <div className="mt-5">{children}</div>;
};

const DatasourceLayout = ({ children }) => {
  return (
    <section className="flex-1 border p-5 bg-slate-50 rounded">
      {children}
    </section>
  );
};

DatasourceLayout.Header = Header;
DatasourceLayout.Body = Body;

export default DatasourceLayout;
