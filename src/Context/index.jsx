import { createContext, useState, useEffect } from "react";
import { RosterWwe2k24 } from "../LocalData/rosterWwe2k24"

const DraftVerseContext = createContext()

const DraftVerseProvider = ({ children }) => {
    const [rosterWwe2k24, setRosterWwe2k24] = useState([...RosterWwe2k24])
    const [showDraftMenu, setShowDraftMenu] = useState(true);
    const [showCurrentRoster, setShowCurrentRoster] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [customRoster, setCustomRoster] = useState([]);
    const [filteredRoster, setFilteredRoster] = useState([...rosterWwe2k24, ...customRoster]);
    const [totalShows, setTotalShows] = useState(3);
    const [wrestlersPerShow, setWrestlersPerShow] = useState(10);
    const [shows, setShows] = useState([]);

    const handleSetTotalShows = (total) => {
        (total > 18) ? setTotalShows(18) : (total < 1) ? setTotalShows(1) : setTotalShows(total)
        validMemberPerShow(undefined, total)
    }

    const handleSetWrestlersPerShow = (total) => {
        setWrestlersPerShow(total)
        validMemberPerShow(total)
    }

    useEffect(() => { setFilteredRoster(getFilteredRoster()) }, [rosterWwe2k24, customRoster])

    const draft = () => {
        if (validMemberPerShow()) {
            const filteredRoster = getFilteredRoster()
            filteredRoster.sort(() => 0.5 - Math.random())

            const newShows = Array.from({ length: totalShows }, () => [])
            let currentShowIndex = 0;

            for (const wrestler of filteredRoster) {
                if (newShows.every(show => show.length >= wrestlersPerShow)) break;

                if (newShows[currentShowIndex].length < wrestlersPerShow) {
                    newShows[currentShowIndex].push(wrestler);
                } else {
                    currentShowIndex++;
                    if (currentShowIndex >= totalShows) currentShowIndex = 0;
                    newShows[currentShowIndex].push(wrestler);
                }
            }

            newShows.forEach(show => show.sort((a, b) => {
                const nameA = a.name.replace(/^"/, "");
                const nameB = b.name.replace(/^"/, "");
                return nameA.localeCompare(nameB)
            }))

            setShows(newShows)
            setShowCurrentRoster(false)
        }
    }

    const validMemberPerShow = (members = wrestlersPerShow, shows = totalShows) => {
        const filteredRoster = getFilteredRoster()

        if ((members * shows) > filteredRoster.length) {
            alert(`Your current roster contains ${filteredRoster.length} members, your settings require at least ${(members * shows)} members`)
            return false
        }

        return true
    }

    const getFilteredRoster = () => [...rosterWwe2k24, ...customRoster].filter(item => item.available === true)

    const exportCustomRoster = () => {
        const customRosterData = JSON.stringify(customRoster, null, 2);
        const blob = new Blob([customRosterData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "custom_roster.json";
        a.click();

        URL.revokeObjectURL(url);
    }

    const importCustomRoster = (event) => {
        const file = event.target.files[0];

        if (file && file.type === "application/json" || file.name.endsWith(".json")) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);

                    if (Array.isArray(importedData) && importedData.every(isValidWrestler)) {
                        setCustomRoster(importedData)
                    } else {
                        alert("Invalid roster format.");
                    }
                } catch (error) {
                    alert("Error reading the file.");
                }
            };

            reader.readAsText(file);

        } else {
            alert("Please select a valid JSON file.");
        }
    }

    const isValidWrestler = (wrestler) => {
        return wrestler.hasOwnProperty('dlc') &&
            wrestler.hasOwnProperty('cardPerson') &&
            wrestler.hasOwnProperty('gender') &&
            wrestler.hasOwnProperty('image') &&
            wrestler.hasOwnProperty('name') &&
            wrestler.hasOwnProperty('category') &&
            wrestler.hasOwnProperty('media') &&
            wrestler.hasOwnProperty('weight') &&
            wrestler.hasOwnProperty('tags') &&
            wrestler.hasOwnProperty('available');
    }

    return (
        <DraftVerseContext.Provider value={
            {
                showDraftMenu, setShowDraftMenu,
                showCurrentRoster, setShowCurrentRoster,
                openModal, setOpenModal,
                customRoster, setCustomRoster,
                totalShows, handleSetTotalShows,
                wrestlersPerShow, handleSetWrestlersPerShow,
                rosterWwe2k24, setRosterWwe2k24, filteredRoster,
                draft, shows, exportCustomRoster, importCustomRoster
            }
        }>
            {children}
        </DraftVerseContext.Provider>
    )
}

export { DraftVerseContext, DraftVerseProvider }