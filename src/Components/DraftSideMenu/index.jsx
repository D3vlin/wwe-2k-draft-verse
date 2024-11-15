import { useContext } from "react"
import { DraftVerseContext } from "../../Context"
import { SideMenu } from "../SideMenu"

const renderDraftConfig = () => {
    const context = useContext(DraftVerseContext)

    return (
        <div className="flex flex-col">
            <p className="mb-6">
                <span className="font-bold">Filtered Roster {context.filteredRoster.length}</span>
            </p>
            <button
                className="bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg mb-3"
                onClick={() => context.setOpenModal(true)}>
                Add Custom Wrestler
            </button>
            <div className="flex justify-between mb-3">
                <p>
                    <span className="font-light">Number of shows</span>
                </p>
                <input
                    className="bg-slate-600 text-white font-bold text-center rounded-tl-lg rounded-tr-lg focus:outline-none w-1/3"
                    type="number" value={context.totalShows} min='1' max='18' onChange={(event) => context.handleSetTotalShows(event.target.value)}
                />
            </div>
            <div className="flex justify-between mb-3">
                <p>
                    <span className="font-light">Wrestlers per show</span>
                </p>
                <input
                    className="bg-slate-600 text-white font-bold text-center rounded-tl-lg rounded-tr-lg focus:outline-none w-1/3"
                    type="number" value={context.wrestlersPerShow} min='10' onChange={(event) => context.handleSetWrestlersPerShow(event.target.value)}
                />
            </div>
        </div>
    )
}

const DraftSideMenu = () => {
    const context = useContext(DraftVerseContext)

    return (
        <SideMenu openMenu={context.showDraftMenu} onCloseMenu={() => context.setShowDraftMenu(false)} title={"Draft Menu"}>
            <div className="px-6 mb-6">
                {context.showCurrentRoster ? renderDraftConfig() : null}
                <button
                    className="bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg"
                    onClick={() => context.showCurrentRoster ? context.draft() : context.setShowCurrentRoster(true)}>
                    {context.showCurrentRoster ? 'Draft' : 'Reset Draft'}
                </button>
            </div>
        </SideMenu>
    )
}

export { DraftSideMenu }