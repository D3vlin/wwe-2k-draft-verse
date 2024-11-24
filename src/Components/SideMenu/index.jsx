/* eslint react/prop-types: "off" */
import './styles.css'
import { XCircleIcon } from '@heroicons/react/24/outline'

const SideMenu = ({ children, openMenu, onCloseMenu, position, title }) => {
    return (
        <aside className={`${openMenu ? "flex" : "hidden"} side-menu flex flex-col fixed ${position}-0 border border-black rounded-lg bg-slate-800`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>{title}</h2>
                <button onClick={onCloseMenu}>
                    <XCircleIcon className='w-6 h-6 text-violet-400 hover:text-white' />
                </button>
            </div>
            {children}
        </aside>
    )
}

export { SideMenu }