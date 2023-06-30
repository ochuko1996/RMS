import { useState } from "react"
import {sideList} from "../../constants/sideList"
import { Link } from "react-router-dom"
import {FaSchool} from 'react-icons/fa'
function SideBar() {
  const [asideList, setAsideList] = useState(sideList)
  return (
    <aside className='w-full md:w-1/5 bg-slate-800 p-5 h-[90vh]'>
      <ul>
        {asideList.map(list => {
          return (
              <Link to={list.link} key={list.id} >
                <li  className="mb-10 text-white text-xl flex items-center" onClick={()=> {}}>
                  <span className="mr-2"><FaSchool/></span>  {list.title}
                </li>
              </Link>
            )
        })}
      </ul>
    </aside>
  )
}

export default SideBar