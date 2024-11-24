import { useContext, useEffect, useState } from "react"
import { DraftVerseContext } from "../../Context"
import { SideMenu } from "../SideMenu"

const DraftSideMenu = () => {
    const context = useContext(DraftVerseContext)
    const [includedTags, setIncludedTags] = useState([{ tag: 'Custom', selected: true }, { tag: 'Male', selected: true }, { tag: 'Female', selected: true }, { tag: 'Manager', selected: false }])
    const [excludedTags, setExcludedTags] = useState(() => includedTags.map(tag => ({ ...tag, selected: !tag.selected })))

    const { setRosterWwe2k24, setCustomRoster } = context;

    useEffect(() => { 
        const selectedTags = includedTags.filter(tag => tag.selected).map(tag => tag.tag)
        const excludedTagList = excludedTags.filter(tag => tag.selected).map(tag => tag.tag)

        setRosterWwe2k24(prevRoster => prevRoster.map(wrestler => {
            const matchesGender = selectedTags.includes(wrestler.gender)
            const matchesTag = wrestler.tags.some(tag => selectedTags.includes(tag))

            const matchesExcludedGender = excludedTagList.includes(wrestler.gender)
            const matchesExcludedTag = wrestler.tags.some(tag => excludedTagList.includes(tag))

            return {
                ...wrestler,
                available: (matchesGender || matchesTag) && !(matchesExcludedGender || matchesExcludedTag)
            }
        }))

        setCustomRoster(prevRoster => prevRoster.map(wrestler => {
            const matchesGender = selectedTags.includes(wrestler.gender)
            const matchesTag = wrestler.tags.some(tag => selectedTags.includes(tag))

            const matchesExcludedGender = excludedTagList.includes(wrestler.gender)
            const matchesExcludedTag = wrestler.tags.some(tag => excludedTagList.includes(tag))

            return {
                ...wrestler,
                available: (matchesGender || matchesTag) && !(matchesExcludedGender || matchesExcludedTag)
            }
        }))
        
     }, [includedTags, excludedTags, setRosterWwe2k24, setCustomRoster])

    const handleIncludeTagClick = (index) => {
        const updatedIncludeTags = includedTags.map((tag, i) => i === index ? { ...tag, selected: !tag.selected } : tag)
        setIncludedTags(updatedIncludeTags)
        setExcludedTags(prevExcludedTags => prevExcludedTags.map((tag, i) => i === index ? { ...tag, selected: !tag.selected } : tag))
    }

    const handleExcludeTagClick = (index) => {
        const updatedExcludeTags = excludedTags.map((tag, i) => i === index ? { ...tag, selected: !tag.selected } : tag)
        setExcludedTags(updatedExcludeTags)
        setIncludedTags(prevIncludedTags => prevIncludedTags.map((tag, i) => i === index ? { ...tag, selected: !tag.selected } : tag))
    }

    const renderDraftConfig = () => {
        return (
            <div className="flex flex-col">
                <button
                    className="bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg mb-3"
                    onClick={() => context.setOpenModal(true)}>
                    Add Custom Wrestler
                </button>
                <div className="flex gap-2 mb-6">
                    <button
                        className="bg-violet-800 w-1/2 py-2 font-bold rounded-bl-lg rounded-lg"
                        onClick={() => context.exportCustomRoster(true)}>
                        Export Custom Roster
                    </button>
                    <label
                        htmlFor="file-input"
                        className="bg-violet-800 w-1/2 py-2 font-bold rounded-bl-lg rounded-lg text-center cursor-pointer"
                    >
                        Import Custom Roster
                    </label>
                    <input
                        className="hidden"
                        type="file" id="file-input" accept=".json" onChange={(event) => context.importCustomRoster(event)} />
                </div>
                <p className="mb-6">
                    <span className="font-bold">Tags Included</span>
                </p>
                <div className="flex flex-wrap justify-between gap-6 mb-6">
                    {
                        includedTags.map((t, index) => {
                            return (
                                <div key={index}>
                                    <label
                                        className={`${t.selected ? 'bg-violet-600' : 'bg-slate-600'} p-2 rounded-lg cursor-pointer`}
                                        htmlFor={`includeTag-${index}`}>
                                        {t.tag}
                                    </label>
                                    <input
                                        type="checkbox"
                                        checked={t.selected}
                                        onChange={() => handleIncludeTagClick(index)}
                                        id={`includeTag-${index}`}
                                        className="hidden"
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <p className="mb-6">
                    <span className="font-bold">Tags Excluded</span>
                </p>
                <div className="flex flex-wrap justify-between gap-6 mb-6">
                    {
                        excludedTags.map((t, index) => {
                            return (
                                <div key={index}>
                                    <label
                                        className={`${t.selected ? 'bg-violet-600' : 'bg-slate-600'} p-2 rounded-lg cursor-pointer`}
                                        htmlFor={`excludeTag-${index}`}>
                                        {t.tag}
                                    </label>
                                    <input
                                        type="checkbox"
                                        checked={t.selected}
                                        onChange={() => handleExcludeTagClick(index)}
                                        id={`excludeTag-${index}`}
                                        className="hidden"
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <p className="mb-6">
                    <span className="font-bold">Filtered Roster {context.filteredRoster.length}</span>
                </p>
                <div className="flex justify-between mb-3">
                    <p>
                        <span className="font-light">Number of shows</span>
                    </p>
                    <input
                        className="bg-slate-600 text-white font-bold text-center rounded-tl-lg rounded-tr-lg focus:outline-none w-1/3"
                        id="file-input" type="number" value={context.totalShows} min='1' max='18' onChange={(event) => context.handleSetTotalShows(event.target.value)}
                    />
                </div>
                <div className="flex justify-between mb-3">
                    <p>
                        <span className="font-light">Wrestlers per show</span>
                    </p>
                    <input
                        className="bg-slate-600 text-white font-bold text-center rounded-tl-lg rounded-tr-lg focus:outline-none w-1/3"
                        id="wrestlers" type="number" value={context.wrestlersPerShow} min='10' onChange={(event) => context.handleSetWrestlersPerShow(event.target.value)}
                    />
                </div>
            </div>
        )
    }

    return (
        <SideMenu openMenu={context.showDraftMenu} onCloseMenu={() => context.setShowDraftMenu(false)} title={"Draft Menu"}>
            <div className="flex flex-col gap-3 px-6 mb-6">
                {context.showCurrentRoster ? renderDraftConfig() : null}
                <button
                    className={`${context.showCurrentRoster ? '' : 'hidden'} bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg`}
                    onClick={() => context.autoDraft()}>
                    Auto Draft
                </button>
                <button
                    className={`${context.showCurrentRoster ? '' : 'hidden'} bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg`}
                    onClick={() => context.manualDraft()}>
                    Manual Draft
                </button>
                <button
                    className={`${context.showCurrentRoster ? 'hidden' : ''} bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg`}
                    onClick={() => context.manualDraft()}>
                    Add Show
                </button>
                <button
                    className={`${context.showCurrentRoster ? 'hidden' : ''} bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg`}
                    onClick={() => context.setShowCurrentRoster(true)}>
                    Reset Draft
                </button>
            </div>
        </SideMenu>
    )
}

export { DraftSideMenu }