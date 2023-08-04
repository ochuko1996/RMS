import Input from '../atom/Input'
import Button from '../atom/Button'
import { FaSearch } from 'react-icons/fa'

function SearchBar({searchQuery, setSearchQuery, handleSearch}) {
  return (
    <div className='flex justify-center mt-10 mb-10'>
      <form className="relative border border">
        <Input
            type={"number"}
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value) }
            className={"w-[500px]  h-[2rem] p-2 rounded-sm"}
            placeholder={"Search Result by Matriculation Number e.g 22226"}
        />  
        <Button className={"absolute top-2 right-1"} onClick={handleSearch}>
            <FaSearch/>
        </Button>
        
      </form>

    </div>
  )
}

export default SearchBar