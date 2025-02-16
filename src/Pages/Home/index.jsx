import { useContext } from "react"
import { DraftVerseContext } from "../../Context"
import { Layout } from "../../Containers/Layout"
import { RosterContainer } from "../../Components/RosterContainer"
import { WrestlerCard } from "../../Components/WrestlerCard"
import { ManagerCard } from "../../Components/ManagerCard"

const Home = () => {
    const context = useContext(DraftVerseContext)

    const renderCurrentRoster = () => {
        return (
            <RosterContainer
                title={`WWE 2K24 Current Roster: ${(context.rosterWwe2k24.length + context.managersWwe2k24.length)}`}
                wrestlers={context.rosterWwe2k24.map((wrestler, index) => <WrestlerCard key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/13)]'} />)}
                managers={context.managersWwe2k24.map((manager, index) => <ManagerCard key={index} manager={manager} index={index} widthClass={'w-[calc(100%/13)]'} />)}
            />
        )
    }

    const renderCustomRoster = () => {
        return (
            <RosterContainer
                title={`Your Custom Roster: ${context.customRoster.length}`}
                wrestlers={context.customRoster.map((wrestler, index) => <WrestlerCard key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/13)]'} />)}
            />
        )
    }

    const renderFilteredRoster = () => {
        return (
            <RosterContainer
                title={`Your Available Roster: ${context.filteredRoster.length}`}
                wrestlers={context.filteredRoster.map((wrestler, index) => <WrestlerCard key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/13)]'} />)}
            />
        )
    }

    const renderShows = () => {
        return (
            <div className="grid grid-cols-2 w-full gap-2 max-w-screen-xl mt-6">
                {
                    context.shows.map((show, index) => (
                        <div key={index} className="flex flex-col relative bg-slate-800 rounded-lg mb-6">
                            <div className="flex justify-between">
                                <input
                                    className="w-1/2 text-black rounded-tl-lg rounded-tr-lg focus:outline-none"
                                    type="text" defaultValue={`New Show #${index + 1}`}
                                />
                                <h3 className="w-1/2 text-center">Roster Size {show.length}</h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 h-[350px] max-h-[350px] overflow-y-scroll p-2 rounded-lg mb-3">
                                {
                                    show.map((wrestler, index) => <WrestlerCard key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/11)]'} />)
                                }
                            </div>
                            {
                                (context.activeShow != index) && (
                                    <div
                                        className="absolute inset-0 bg-gray-500 bg-opacity-50 cursor-pointer"
                                        onClick={() => context.setActiveShow(index)}
                                    ></div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <Layout>
            {context.showCurrentRoster ? renderCurrentRoster() : null}
            {context.showCurrentRoster ? renderCustomRoster() : null}
            {!context.showCurrentRoster ? renderFilteredRoster() : null}
            {!context.showCurrentRoster ? renderShows() : null}
        </Layout>
    )
}

export { Home }