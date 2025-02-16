/* eslint react/prop-types: "off" */
import { useState } from "react"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"

const RosterContainer = ({ title, wrestlers, managers }) => {
    const [display, setDisplay] = useState(true)
    const [toggle, setToggle] = useState(1)

    const renderIcon = () => {
        return display
            ? <MinusCircleIcon className="h-6 w-6 absolute top-1/3 left-3 cursor-pointer text-violet-400 hover:text-white" onClick={() => setDisplay(!display)} />
            : <PlusCircleIcon className="h-6 w-6 absolute top-1/3 left-3 cursor-pointer text-violet-400 hover:text-white" onClick={() => setDisplay(!display)} />
    }

    const updateToggle = (id) => {
        setToggle(id)
    }

    return (
        <div className="mt-4 w-full max-w-screen-xl">
            <nav>
                <ul className="flex bg-slate-900 rounded-tl-lg rounded-tr-lg">
                    <li
                        className={`${(toggle === 1) ? 'bg-violet-800' : 'bg-slate-700'} px-2 py-1 cursor-pointer rounded-tl-lg`}
                        onClick={() => updateToggle(1)}
                    >
                        Wrestlers
                    </li>
                    <li
                        className={`${(toggle === 2) ? 'bg-violet-800' : 'bg-slate-700'} px-2 py-1 cursor-pointer rounded-tr-lg`}
                        onClick={() => updateToggle(2)}
                    >
                        Managers
                    </li>
                </ul>
            </nav>
            <div className="flex flex-col relative items-center justify-center w-full bg-slate-700">
                <h2 className="font-medium text-lg mb-4 mt-4">{title}</h2>
                {renderIcon()}
            </div>
            <div className={`${display ? 'inline' : 'hidden'}`}>
                <div className={`${(toggle === 1) ? 'flex' : 'hidden'} flex-wrap items-center gap-2 w-full h-[350px] overflow-y-scroll bg-slate-800 p-3 rounded-b-lg`}>
                    {wrestlers}
                </div>
                <div className={`${(toggle === 2) ? 'flex' : 'hidden'} flex-wrap items-center gap-2 w-full h-[350px] overflow-y-scroll bg-slate-800 p-3 rounded-b-lg`}>
                    {managers}
                </div>
            </div>
        </div>
    )
}

export { RosterContainer }