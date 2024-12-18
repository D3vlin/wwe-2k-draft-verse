import { useContext } from "react"
import { DraftVerseContext } from "../../Context"
import { Layout } from "../../Components/Layout"
import { Card } from "../../Components/Card"
import { Modal } from "../../Components/Modal"
import { RosterContainer } from "../../Components/RosterContainer"
import { WrestlerForm } from "../../Components/WrestlerForm"

const Home = () => {
    const context = useContext(DraftVerseContext)

    const renderCurrentRoster = () => {
        return (
            <RosterContainer title={`WWE 2K24 Current Roster: ${context.rosterWwe2k24.length}`}>
                {
                    context.rosterWwe2k24.map((wrestler, index) => <Card key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/13)]'} />)
                }
            </RosterContainer>
        )
    }

    const renderCustomRoster = () => {
        return (
            <RosterContainer title={`Your Custom Roster: ${context.customRoster.length}`}>
                {
                    context.customRoster.map((wrestler, index) => <Card key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/13)]'} />)
                }
            </RosterContainer>
        )
    }

    const renderFilteredRoster = () => {
        return (
            <RosterContainer title={`Your Available Roster: ${context.filteredRoster.length}`}>
                {
                    context.filteredRoster.map((wrestler, index) => <Card key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/13)]'} />)
                }
            </RosterContainer>
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
                                    show.map((wrestler, index) => <Card key={index} wrestler={wrestler} index={index} widthClass={'w-[calc(100%/11)]'} />)
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
            <div className="absolute left-0 m-3">
                <button
                    className="bg-violet-500 w-full p-2 font-bold rounded-bl-lg rounded-lg"
                    onClick={() => context.setShowDraftMenu(true)}>
                    Open Draft Menu
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-slate-800">
                <h1 className="font-medium text-xl mb-4 mt-4">WWE 2k Draft Verse</h1>
            </div>
            {context.showCurrentRoster ? renderCurrentRoster() : null}
            {context.showCurrentRoster ? renderCustomRoster() : null}
            {!context.showCurrentRoster ? renderFilteredRoster() : null}
            {!context.showCurrentRoster ? renderShows() : null}
            <div className="absolute top-3 right-10">
                <a href="https://github.com/D3vlin/wwe-2k-draft-verse" target="_blank" rel="noopener noreferrer">
                    <img src="./Images/github.webp" alt="githubLogo" className="w-11 cursor-pointer hover:scale-125" />
                </a>
            </div>
            {context.openModal && (
                <Modal>
                    <WrestlerForm />
                </Modal>
            )}
        </Layout>
    )
}

export { Home }