import { useState } from "react"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"

const RosterContainer = ({ title, children }) => {
    const [display, setDisplay] = useState(true)

    const renderIcon = () => {
        return display
            ? <MinusCircleIcon className="h-6 w-6 absolute top-1/3 left-3 cursor-pointer text-violet-400 hover:text-white" onClick={() => setDisplay(!display)} />
            : <PlusCircleIcon className="h-6 w-6 absolute top-1/3 left-3 cursor-pointer text-violet-400 hover:text-white" onClick={() => setDisplay(!display)} />
    }

    return (
        <div className=" mt-3 w-full max-w-screen-xl">
            <div className="flex flex-col relative items-center justify-center w-full bg-slate-700">
                <h2 className="font-medium text-lg mb-4 mt-4">{title}</h2>
                {renderIcon()}
            </div>
            <div className={`${display ? 'flex' : 'hidden'} flex-wrap items-center gap-2 w-full h-[350px] overflow-y-scroll bg-slate-800 p-3 rounded-lg`}>
                {children}
            </div>
        </div>
    )
}

export { RosterContainer }