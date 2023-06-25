import Brand from "../atom/Brand"
import HeadingOne from "../atom/Heading"
import NavWrapper from "../molecules/NavWrapper"
function NavBar() {
  return (
    <header className="bg-slate-600 h-[10vh] flex justify-between items-center p-5">
        <Brand className={"w-10"} src={"/citi.png"} alt="logo"/>
        <HeadingOne className="text-xl text-white font-bold">
          Student Result Management System
        </HeadingOne>
        <NavWrapper/>
    </header>
  )
}

export default NavBar