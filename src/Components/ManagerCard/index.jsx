/* eslint react/prop-types: "off" */
import { useContext } from "react"
import { InformationCircleIcon, UserMinusIcon } from "@heroicons/react/24/outline"
import { DraftVerseContext } from "../../Context"
import { Card } from "../Card"

const ManagerCard = ({ manager, index, widthClass }) => {
    const context = useContext(DraftVerseContext)

    const showManagerInfo = () => {
        context.setWrestlerInfo(manager)
        context.setShowWrestlerInfo(true)
    }

    const handleAvailable = () => {
        if (context.showCurrentRoster) {
            if (manager.tags.includes('Custom')) {
                context.setCustomManagers((prevRoster) =>
                    prevRoster.map((manager, i) =>
                        i === index ? { ...manager, available: !manager.available } : manager
                    )
                )
            } else {
                context.setManagersWwe2k24((prevRoster) =>
                    prevRoster.map((manager, i) =>
                        i === index ? { ...manager, available: !manager.available } : manager
                    )
                )
            }
        }
    }

    const renderInfoBottom = () => {
        return (
            <figcaption
                className="absolute bottom-0 left-0 bg-blue-600 rounded-full text-white text-xs px-0.5 py-0.5 hidden group-hover:block"
                onClick={(event) => { event.stopPropagation(); showManagerInfo() }}>
                <InformationCircleIcon className="h-5 w-5" />
            </figcaption>
        )
    }

    const renderDeleteBottom = () => {
        if (manager.tags.includes('Custom') && context.showCurrentRoster) {
            return (
                <figcaption
                    className="absolute bottom-0 right-0 bg-red-600 rounded-full text-white text-xs px-0.5 py-0.5 hidden group-hover:block"
                    onClick={(event) => deleteManager(event)}>
                    <UserMinusIcon className="h-5 w-5" />
                </figcaption>
            )
        }
    }

    const deleteManager = (event) => {
        event.preventDefault()
        event.stopPropagation()
        context.setCustomManagers((currentRoster) => {
            return currentRoster.filter((_, i) => i !== index)
        })
    }    

    return (
        <Card
            widthClass={widthClass}
            available={manager.available}
            onClick={() => context.showCurrentRoster ? handleAvailable() : showManagerInfo()}
            image={manager.image}
            text={manager.name}
            figcaption={manager.media}
        >
            {renderDeleteBottom()}
            {renderInfoBottom()}
        </Card>
    )
}

export { ManagerCard }