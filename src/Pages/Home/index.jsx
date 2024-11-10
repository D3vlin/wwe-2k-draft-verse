import { RosterWwe2k24 } from "../../LocalData/rosterWwe2k24"
import { Layout } from "../../Components/Layout"
import { Card } from "../../Components/Card"

const Home = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center relative w-80">
                <h1 className="font-medium text-xl mb-4 mt-4">WWE 2k Draft Verse</h1>
                <h2 className="font-medium text-lg mb-4 mt-4">WWE 2K24 Current Roster: {RosterWwe2k24.length}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full max-w-screen-xl h-[400px] max-h-[400px] overflow-y-scroll bg-slate-800 p-3 rounded-lg">
                {
                    RosterWwe2k24.map((wrestler, index) => <Card key={index} image={wrestler.image} media={wrestler.media} name={wrestler.name} />)
                }
            </div>
        </Layout>
    )
}

export { Home }