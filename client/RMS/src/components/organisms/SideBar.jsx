import { useState } from "react"
import {sideList} from "../../constants/sideList"
function SideBar() {
  const [asideList, setAsideList] = useState(sideList)
  return (
    <aside className='w-full md:w-1/5 bg-slate-800 p-5 h-[90vh]'>
      <ul>
        {asideList.map(list => {
          return <li key={list.id} className="mb-10 text-white text-xl" onClick={()=> {}}>{list.content}</li>
        })}
      </ul>
    </aside>
  )
}

export default SideBar