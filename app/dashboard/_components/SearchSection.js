import { SearchIcon } from "lucide-react";
import React from "react";

function SearchSection({setSearchInput}) {
  return (
    <div className="flex flex-col justify-center items-center p-10 bg-gradient-to-br from-blue-500 via-blue-700 to-purple-600  text-secondary ">
      <h2 className="text-3xl font-bold text-white">Browse all templates</h2>
      <p className="text-white">What would you like to carate today?</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 item-center p-2 border rounded-md bg-secondary my-3">
          <SearchIcon className="text-primary" />
          <input type="text" placeholder="Search" className="bg-transparent outline-none text-primary" onChange={(e)=>setSearchInput(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
