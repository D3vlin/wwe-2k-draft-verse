import { useContext } from "react"
import { DraftVerseContext } from "../../Context"
import { Layout } from "../../Components/Layout"
import { Card } from "../../Components/Card"
import { Modal } from "../../Components/Modal"
import { WrestlerForm } from "../../Components/WrestlerForm"

const Home = () => {
    const context = useContext(DraftVerseContext)

    const renderCurrentRoster = () => {
        return (
            <div className=" mt-3 w-full max-w-screen-xl">
                <div className="flex flex-col items-center justify-center w-full bg-slate-700">
                    <h2 className="font-medium text-lg mb-4 mt-4">WWE 2K24 Current Roster: {context.rosterWwe2k24.length}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full h-[350px] overflow-y-scroll bg-slate-800 p-3 rounded-lg">
                    {
                        context.rosterWwe2k24.map((wrestler, index) => <Card key={index} image={wrestler.image} media={wrestler.media} name={wrestler.name} widthClass={'w-[calc(100%/13)]'} available={wrestler.available} index={index} tags={wrestler.tags} />)
                    }
                </div>
            </div>
        )
    }

    const renderCustomRoster = () => {
        return (
            <div className="mt-3 w-full max-w-screen-xl">
                <div className="flex flex-col items-center justify-center w-full bg-slate-700">
                    <h2 className="font-medium text-lg mb-4 mt-4">Your Custom Roster: {context.customRoster.length}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full h-[350px] overflow-y-scroll bg-slate-800 p-3 rounded-lg">
                    {
                        context.customRoster.map((wrestler, index) => <Card key={index} image={wrestler.image} media={wrestler.media} name={wrestler.name} widthClass={'w-[calc(100%/13)]'} available={wrestler.available} index={index} tags={wrestler.tags} />)
                    }
                </div>
            </div>
        )
    }

    const renderShows = () => {
        return (
            <div className="grid grid-cols-2 w-full gap-2 max-w-screen-xl mb-3">
                {
                    context.shows.map((show, index) => (
                        <div key={index} className="flex flex-col bg-slate-800 rounded-lg mb-6">
                            <div className="flex justify-between">
                                <input
                                    className="w-1/2 text-black rounded-tl-lg rounded-tr-lg focus:outline-none"
                                    type="text" defaultValue={`New Show #${index + 1}`}
                                />
                                <h3 className="w-1/2 text-center">Roster Size {show.length}</h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 h-[350px] max-h-[350px] overflow-y-scroll p-2 rounded-lg mb-3">
                                {
                                    show.map((wrestler, index) => <Card key={index} image={wrestler.image} media={wrestler.media} name={wrestler.name} widthClass={'w-[calc(100%/11)]'} available={wrestler.available} index={index} tags={wrestler.tags}/>)
                                }
                            </div>
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
            {!context.showCurrentRoster ? renderShows() : null}
            {context.openModal && (
                <Modal>
                    <WrestlerForm />
                </Modal>
            )}
        </Layout>
    )
}

export { Home }