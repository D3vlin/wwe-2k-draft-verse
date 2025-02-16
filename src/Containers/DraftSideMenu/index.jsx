/* eslint react/prop-types: "off" */
import { useContext, useEffect, useState } from "react"
import { DraftVerseContext } from "../../Context"
import { SideMenu } from "../../Components/SideMenu"
import { Button } from "../../Components/Button"
import { CheckBoxGroup } from "../../Components/CheckBoxGroup"
import { InputNumber } from "../../Components/InputNumber"
import { Modal } from "../../Components/Modal"
import { WrestlerForm } from "../../Components/WrestlerForm"

const DraftSideMenu = ({ showDraftMenu, onCloseMenu }) => {
    const context = useContext(DraftVerseContext)
    const [openModal, setOpenModal] = useState(false)
    const [includedTags, setIncludedTags] = useState([{ tag: 'Custom', selected: true }, { tag: 'Male', selected: true }, { tag: 'Female', selected: true }])
    const [excludedTags, setExcludedTags] = useState(() => includedTags.map(tag => ({ ...tag, selected: !tag.selected })))

    const { setRosterWwe2k24, setCustomRoster } = context

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
                <Button
                    extraStyles={"bg-violet-800 w-full py-2 mb-3"}
                    text={"Add Custom Wrestler"}
                    onClick={() => setOpenModal(true)}
                />
                <div className="flex gap-2 mb-6">
                    <Button
                        extraStyles={"bg-violet-800 w-1/2 py-2"}
                        text={"Export Custom Roster"}
                        onClick={() => context.exportCustomRoster(true)}
                    />
                    <label
                        htmlFor="file-input"
                        className="bg-violet-800 w-1/2 py-2 font-bold rounded-bl-lg rounded-lg text-center cursor-pointer"
                    >
                        Import Custom Roster
                    </label>
                    <input
                        className="hidden"
                        type="file" id="file-input" accept=".json"
                        onChange={(event) => context.importCustomRoster(event)}
                    />
                </div>
                <CheckBoxGroup title={'Tags Included'} values={includedTags} selectedColor={"bg-violet-600"} unselectedColor={"bg-slate-600"} onChange={(index) => handleIncludeTagClick(index)} />
                <CheckBoxGroup title={'Tags Excluded'} values={excludedTags} selectedColor={"bg-red-400"} unselectedColor={"bg-slate-600"} onChange={(index) => handleExcludeTagClick(index)} />
                <p className="mb-6">
                    <span className="font-bold">Wrestlers {context.filteredRoster.length}</span>
                </p>
                <p className="mb-6">
                    <span className="font-bold">Managers {context.managersWwe2k24.length}</span>
                </p>
                <p className="mb-6">
                    <span className="font-bold">Filtered Roster {context.filteredRoster.length}</span>
                </p>
                <InputNumber id={"shows"} title={"Number of shows"} value={context.totalShows} onChange={(value) => context.handleSetTotalShows(value)} />
                <InputNumber id={"wrestlers"} title={"Wrestlers per show"} value={context.wrestlersPerShow} onChange={(value) => context.handleSetWrestlersPerShow(value)} />
            </div>
        )
    }

    return (
        <SideMenu openMenu={showDraftMenu} onCloseMenu={onCloseMenu} position={'left'} title={"Draft Menu"}>
            <div className="flex flex-col gap-3 px-6 mb-6">
                {context.showCurrentRoster ? renderDraftConfig() : null}
                <Button
                    extraStyles={`${context.showCurrentRoster ? '' : 'hidden'} bg-violet-800 w-full py-2`}
                    text={"Auto Draft"}
                    onClick={() => context.autoDraft()}
                />
                <Button
                    extraStyles={`${context.showCurrentRoster ? '' : 'hidden'} bg-violet-800 w-full py-2`}
                    text={"Manual Draft"}
                    onClick={() => context.manualDraft()}
                />
                <Button
                    extraStyles={`${!context.showCurrentRoster ? '' : 'hidden'} bg-violet-800 w-full py-2`}
                    text={"Add Show"}
                    onClick={() => context.addShow()}
                />
                <Button
                    extraStyles={`${!context.showCurrentRoster ? '' : 'hidden'} bg-violet-800 w-full py-2`}
                    text={"Reset Draft"}
                    onClick={() => context.setShowCurrentRoster(true)}
                />
            </div>
            {openModal && (
                <Modal>
                    <WrestlerForm setOpenModal={() => setOpenModal(false)} />
                </Modal>
            )}
        </SideMenu>
    )
}

export { DraftSideMenu }