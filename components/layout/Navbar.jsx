import { ModeToggle } from "../providers/theme-provider"
import { SidebarTrigger } from "../ui/sidebar"
import Profile from "./Profile"

const Navbar = () => {
  return (
    <nav className="py-3 px-5 text-xl font-bold ">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <SidebarTrigger />
          <h3>The Achievers Focus</h3>
        </div>
        <div className="flex gap-3 items-center">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
