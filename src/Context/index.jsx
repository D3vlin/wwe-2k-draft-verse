/* eslint react/prop-types: "off" */
import { createContext, useState, useEffect } from "react"
import { RosterWwe2k24 } from "../LocalData/rosterWwe2k24"

const DraftVerseContext = createContext()

const DraftVerseProvider = ({ children }) => {
    const [rosterWwe2k24, setRosterWwe2k24] = useState([...RosterWwe2k24])
    const [showDraftMenu, setShowDraftMenu] = useState(true)
    const [showCurrentRoster, setShowCurrentRoster] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [customRoster, setCustomRoster] = useState([])
    const [filteredRoster, setFilteredRoster] = useState([...rosterWwe2k24, ...customRoster])
    const [totalShows, setTotalShows] = useState(3)
    const [wrestlersPerShow, setWrestlersPerShow] = useState(10)
    const [shows, setShows] = useState([])
    const [activeShow, setActiveShow] = useState(0)

    const handleSetTotalShows = (total) => {
        (total > 18) ? setTotalShows(18) : (total < 1) ? setTotalShows(1) : setTotalShows(total)
        validMemberPerShow(undefined, total)
    }

    const handleSetWrestlersPerShow = (total) => {
        setWrestlersPerShow(total)
        validMemberPerShow(total)
    }

    useEffect(() => { setFilteredRoster([...rosterWwe2k24, ...customRoster].filter(item => item.available === true)) }, [rosterWwe2k24, customRoster])

    const autoDraft = () => {
        if (validMemberPerShow()) {
            const filteredRoster = getFilteredRoster()
            filteredRoster.sort(() => 0.5 - Math.random())

            const newShows = Array.from({ length: totalShows }, () => [])
            let currentShowIndex = 0

            while (filteredRoster.length > 0 && newShows.some(show => show.length < wrestlersPerShow)) {
                const wrestler = filteredRoster.shift()

                if (newShows[currentShowIndex].length < wrestlersPerShow) {
                    newShows[currentShowIndex].push(wrestler)
                } else {
                    currentShowIndex++
                    if (currentShowIndex >= totalShows) currentShowIndex = 0
                    newShows[currentShowIndex].push(wrestler)
                }
                
                setFilteredRoster(filteredRoster)
            }

            newShows.forEach(show => show.sort((a, b) => {
                const nameA = a.name.replace(/^"/, "")
                const nameB = b.name.replace(/^"/, "")
                return nameA.localeCompare(nameB)
            }))
            
            draft(filteredRoster, newShows)
        }
    }

    const manualDraft = () => {
        const filteredRoster = getFilteredRoster()
        const newShows = Array.from({ length: 2 }, () => [])

        draft(filteredRoster, newShows)
    }

    const draft = (roster, newShows) => {
        setFilteredRoster(roster.sort((a, b) => {
            const nameA = a.name.replace(/["']/g, "")
            const nameB = b.name.replace(/["']/g, "")
            return nameA.localeCompare(nameB)
        }))

        setShows(newShows)
        setActiveShow(0)
        setShowCurrentRoster(false)
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
        const customRosterData = JSON.stringify(customRoster, null, 2)
        const blob = new Blob([customRosterData], { type: "application/json" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "custom_roster.json"
        a.click()

        URL.revokeObjectURL(url)
    }

    const importCustomRoster = (event) => {
        const file = event.target.files[0]

        if (file && file.type === "application/json" || file.name.endsWith(".json")) {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result)

                    if (Array.isArray(importedData) && importedData.every(isValidWrestler)) {
                        setCustomRoster(importedData)
                    } else {
                        alert("Invalid roster format.")
                    }
                } catch (error) {
                    alert("Error reading the file." + error)
                }
            }

            reader.readAsText(file)

        } else {
            alert("Please select a valid JSON file.")
        }
    }

    const isValidWrestler = (wrestler) => {
        const hasOwnProperty = Object.prototype.hasOwnProperty;

        return hasOwnProperty.call(wrestler,'dlc') &&
            hasOwnProperty.call(wrestler,'cardPerson') &&
            hasOwnProperty.call(wrestler,'gender') &&
            hasOwnProperty.call(wrestler,'image') &&
            hasOwnProperty.call(wrestler,'name') &&
            hasOwnProperty.call(wrestler,'category') &&
            hasOwnProperty.call(wrestler,'media') &&
            hasOwnProperty.call(wrestler,'weight') &&
            hasOwnProperty.call(wrestler,'tags') &&
            hasOwnProperty.call(wrestler,'available')
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
                autoDraft, manualDraft, shows,
                exportCustomRoster, importCustomRoster,
                activeShow, setActiveShow
            }
        }>
            {children}
        </DraftVerseContext.Provider>
    )
}

export { DraftVerseContext, DraftVerseProvider }