
export default function TableWrapper({ children }) {
    return (
      <>
        <div className="overflow-x-auto overflow-y-hidden ">
           {children}
        </div>
      </>
    )
  }
  