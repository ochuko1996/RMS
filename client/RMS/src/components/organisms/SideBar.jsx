import { useState } from "react"
import {sideList} from "../../constants/sideList"
import { NavLink } from "react-router-dom"
import {FaBook} from 'react-icons/fa'
import { selectCurrentRoles } from "../../store/api/authSlice"
import { useSelector } from "react-redux"

function SideBar() {
  const [asideList, setAsideList] = useState(sideList)
  const [active, setActive] = useState({})
  const roles = useSelector(selectCurrentRoles)
  const checkedRole = roles.length > 1 ? 1111 : 1000

  return (
    <aside className='w-full md:w-1/5 bg-slate-800 p-5 h-[90vh]'>
      <ul>
        {asideList.filter(data => data.roles.includes(checkedRole)).map(list => {
          return (
              <li key={list.id} className="mb-10 text-white text-xl flex items-center">
                <NavLink to={list.link} key={list.id} className={
                  ({isActive, isPending})=> !isActive ? "w-full" : isActive ? "aside-active w-full p-2 " : "" } >
             
                    <span className="flex items-center"><FaBook/> &nbsp; {list.title}</span>  
                </NavLink>
              </li>
            )
        })
        }
      </ul>
    </aside>
  )
}

export default SideBar