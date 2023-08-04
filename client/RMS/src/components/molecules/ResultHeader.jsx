function ResultHeader() {
  return (
    <>
        <h1 className='text-2xl capitalize text-center mb-3'>cumulated result</h1>
        <div className="grid result-grid p-2">
            <div className="capitalize font-bold">code</div>
            <div className="capitalize font-bold">course name</div>
            <div className="capitalize font-bold">score</div>
            <div className="capitalize font-bold">point</div>
            <div className="capitalize font-bold">course unit</div>
        </div>
    </>
  )
}

export default ResultHeader