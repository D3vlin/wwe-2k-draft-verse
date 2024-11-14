import { createContext, useState } from "react";
import { RosterWwe2k24 } from "../LocalData/rosterWwe2k24"

const DraftVerseContext = createContext()

const DraftVerseProvider = ({ children }) => {
    const [rosterWwe2k24, setRosterWwe2k24] = useState([...RosterWwe2k24])
    const [showDraftMenu, setShowDraftMenu] = useState(true);
    const [showCurrentRoster, setShowCurrentRoster] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [customRoster, setCustomRoster] = useState([]);
    const [totalShows, setTotalShows] = useState(3);
    const [shows, setShows] = useState([]);

    const handleSetTotalShows = (total) => (total > 18) ? setTotalShows(18) : (total < 1) ? setTotalShows(1) : setTotalShows(total)

    const draft = () => {
        const copy = [...RosterWwe2k24, ...customRoster]
        copy.sort(() => 0.5 - Math.random())

        const newShows = Array.from({ length: totalShows }, () => [])

        copy.forEach((wrestler, index) => {
            const showIndex = index % totalShows
            newShows[showIndex].push(wrestler)
        })

        newShows.forEach(show => show.sort((a, b) => {
            const nameA = a.name.replace(/^"/, "");
            const nameB = b.name.replace(/^"/, "");
            return nameA.localeCompare(nameB)
        }))
        setShows(newShows)

        setShowCurrentRoster(false)
    }

    return (
        <DraftVerseContext.Provider value={
            {
                showDraftMenu, setShowDraftMenu,
                showCurrentRoster, setShowCurrentRoster,
                openModal, setOpenModal,
                customRoster, setCustomRoster,
                totalShows, handleSetTotalShows,
                rosterWwe2k24, setRosterWwe2k24,
                draft, shows
            }
        }>
            {children}
        </DraftVerseContext.Provider>
    )
}

export { DraftVerseContext, DraftVerseProvider }