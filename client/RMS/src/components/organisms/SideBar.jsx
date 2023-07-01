import { useState } from "react"
import {sideList} from "../../constants/sideList"
import { Link } from "react-router-dom"
import {FaBook} from 'react-icons/fa'

function SideBar() {
  const [asideList, setAsideList] = useState(sideList)
  const [active, setActive] = useState({})

  // const currentPath = window.location.pathname
  const activeHandler = (id)=>{
    setActive((prevActiveItems) => ({
    ...prevActiveItems,
    // [id]: !prevActiveItems[id] ? false : currentPath === asideList.find((list)=> list.id === id)?.link // Toggle the active state for the clicked list item
    [id]: !prevActiveItems[id] // Toggle the active state for the clicked list item
  })); 
  }
  return (
    <aside className='w-full md:w-1/5 bg-slate-800 p-5 h-[90vh]'>
      <ul>
        {asideList.map(list => {
          return (
              <Link to={list.link} key={list.id} >
                <li  className={`mb-10 text-white text-xl flex items-center ${active[list.id] ? "aside-active" : " "}`} onClick={()=> activeHandler(list.id)}>
                  <span className="mr-2"><FaBook/></span>  {list.title}
                </li>
              </Link>
            )
        })}
      </ul>
    </aside>
  )
}

export default SideBar