import NavBar from "../organisms/NavBar"
import SideBar from "../organisms/SideBar"
import Footer from "../organisms/Footer"
import StudentModal from "../molecules/StudentModal"
import { useSelector } from "react-redux"

function DashboardTemplate({header, aside, footer, children}) {
  return (
    <>
      <main className="relative">
        {!header ? <NavBar/> : header}
        <section className="md:flex  justify-between">
            {!aside ? <SideBar/> : aside}
            {children}
        </section>
   
        {/* {!footer ? <Footer/> : footer} */}

      </main>
    </>
  )
}

export default DashboardTemplate