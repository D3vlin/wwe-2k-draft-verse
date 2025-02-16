/* eslint react/prop-types: "off" */
import { useContext } from "react"
import { InformationCircleIcon, UserMinusIcon } from "@heroicons/react/24/outline"
import { DraftVerseContext } from "../../Context"
import { Card } from "../Card"

const WrestlerCard = ({ wrestler, index, widthClass }) => {
    const context = useContext(DraftVerseContext)

    const showWrestlerInfo = () => {
        context.setWrestlerInfo(wrestler)
        context.setShowWrestlerInfo(true)
    }

    const handleAvailable = () => {
        if (context.showCurrentRoster) {
            if (wrestler.tags.includes('Custom')) {
                context.setCustomRoster((prevRoster) =>
                    prevRoster.map((wrestler, i) =>
                        i === index ? { ...wrestler, available: !wrestler.available } : wrestler
                    )
                )
            } else {
                context.setRosterWwe2k24((prevRoster) =>
                    prevRoster.map((wrestler, i) =>
                        i === index ? { ...wrestler, available: !wrestler.available } : wrestler
                    )
                )
            }
        }
    }

    const renderInfoBottom = () => {
        return (
            <figcaption
                className="absolute bottom-0 left-0 bg-blue-600 rounded-full text-white text-xs px-0.5 py-0.5 hidden group-hover:block"
                onClick={(event) => { event.stopPropagation(); showWrestlerInfo() }}>
                <InformationCircleIcon className="h-5 w-5" />
            </figcaption>
        )
    }

    const renderDeleteBottom = () => {
        if (wrestler.tags.includes('Custom') && context.showCurrentRoster) {
            return (
                <figcaption
                    className="absolute bottom-0 right-0 bg-red-600 rounded-full text-white text-xs px-0.5 py-0.5 hidden group-hover:block"
                    onClick={(event) => deleteWrestler(event)}>
                    <UserMinusIcon className="h-5 w-5" />
                </figcaption>
            )
        }
    }

    const deleteWrestler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        context.setCustomRoster((currentRoster) => {
            return currentRoster.filter((_, i) => i !== index)
        })
    }

    return (
        <Card
            widthClass={widthClass}
            available={wrestler.available}
            onClick={() => context.showCurrentRoster ? handleAvailable() : showWrestlerInfo()}
            image={wrestler.image}
            text={wrestler.name}
            figcaption={wrestler.media}
        >
            {renderDeleteBottom()}
            {renderInfoBottom()}
        </Card>
    )
}

export { WrestlerCard }