const RosterContainer = ({ title, children }) => {
    return (
        <div className=" mt-3 w-full max-w-screen-xl">
            <div className="flex flex-col items-center justify-center w-full bg-slate-700">
                <h2 className="font-medium text-lg mb-4 mt-4">{title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full h-[350px] overflow-y-scroll bg-slate-800 p-3 rounded-lg">
                {children}
            </div>
        </div>
    )
}

export { RosterContainer }