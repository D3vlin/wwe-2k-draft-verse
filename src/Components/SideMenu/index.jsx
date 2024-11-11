import './styles.css'

const SideMenu = ({ children, openMenu, onCloseMenu, title }) => {
    return (
        <aside className={`${openMenu ? "flex" : "hidden"} side-menu flex flex-col fixed left-0 border border-black rounded-lg bg-slate-800`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>{title}</h2>
                <button onClick={onCloseMenu}>
                    X
                </button>
            </div>
            {children}
        </aside>
    )
}

export { SideMenu }