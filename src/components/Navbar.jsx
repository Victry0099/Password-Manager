import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="bg-black">
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-16 ">
        <div className="logo font-bold text-2xl text-white">
            <span className="text-green-600">&lt;</span>
            Pss
            <span className="text-green-600">OP/&gt;</span>
            </div>
        <ul>
            <li className="flex gap-8">
                <a  className="text-white hover:font-bold text-xl" href="/">Home</a>
                <a className="text-white hover:font-bold text-xl" href="#">About</a>
                <a className="text-white hover:font-bold text-xl" href="#">Contact</a>
            </li>
        </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
