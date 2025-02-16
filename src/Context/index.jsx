/* eslint react/prop-types: "off" */
import { createContext, useState, useEffect } from "react"
import { ManagersWwe2k24 } from "../LocalData/managersWwe2k24"
import { RosterWwe2k24 } from "../LocalData/rosterWwe2k24"

const DraftVerseContext = createContext()

const DraftVerseProvider = ({ children }) => {
    const [rosterWwe2k24, setRosterWwe2k24] = useState([...RosterWwe2k24])
    const [showWrestlerInfo, setShowWrestlerInfo] = useState(false)
    const [managersWwe2k24, setManagersWwe2k24] = useState([...ManagersWwe2k24])
    const [wrestlerInfo, setWrestlerInfo] = useState({})
    const [showCurrentRoster, setShowCurrentRoster] = useState(true)
    const [customRoster, setCustomRoster] = useState([])
    const [customManagers, setCustomManagers] = useState([])
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
        setShowWrestlerInfo(false)
        setShowCurrentRoster(false)
    }

    const addShow = () => {
        if (shows.length < 18) {
            setShows([...shows, []])
        } else {
            alert("18 show limit reached!")
        }
    }

    const sendToShow = () => {
        const index = filteredRoster.findIndex(item => item.image === wrestlerInfo.image)

        if (index !== -1) {
            const [wrestler] = filteredRoster.splice(index, 1)
            
            setShows(prevShows => {
                const updatedShows = [...prevShows]
                updatedShows[activeShow] = [...updatedShows[activeShow], wrestler]
                return updatedShows
            })
    
            setFilteredRoster([...filteredRoster])
        }

        setShowWrestlerInfo(false)
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
        const hasOwnProperty = Object.prototype.hasOwnProperty

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
                showCurrentRoster, setShowCurrentRoster,
                showWrestlerInfo, setShowWrestlerInfo,
                wrestlerInfo, setWrestlerInfo,
                customRoster, setCustomRoster,
                customManagers, setCustomManagers,
                totalShows, handleSetTotalShows,
                wrestlersPerShow, handleSetWrestlersPerShow,
                managersWwe2k24, setManagersWwe2k24,
                rosterWwe2k24, setRosterWwe2k24, filteredRoster,
                autoDraft, manualDraft, shows,
                exportCustomRoster, importCustomRoster,
                activeShow, setActiveShow, addShow, sendToShow
            }
        }>
            {children}
        </DraftVerseContext.Provider>
    )
}

export { DraftVerseContext, DraftVerseProvider }