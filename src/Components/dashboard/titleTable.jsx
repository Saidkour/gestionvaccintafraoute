export default function TitleTable({ children }) {
  return (
    <>
      <div className=" my-3 w-full p-4 border-b-2">
        <h1 className="text-xl font-thin tracking-wider">
         {children}
        </h1>
      </div>
    </>
  );
}
