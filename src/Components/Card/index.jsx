/* eslint react/prop-types: "off" */
import { useContext } from "react"
import { DraftVerseContext } from "../../Context"
import { InformationCircleIcon, UserMinusIcon } from "@heroicons/react/24/outline"

const Card = ({ wrestler, index, widthClass }) => {
    const backgroundImage = import.meta.env.VITE_BACKGROUND_IMAGE_PATH
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
                onClick={(event) => {event.stopPropagation(); showWrestlerInfo()}}>
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
        <article
            className={`group cursor-pointer rounded-lg text-black ${widthClass} bg-slate-800 transition-transform transform hover:scale-125 duration-300 ease-in-out hover:z-10 relative ${wrestler.available ? '' : 'grayscale'}`}
            onClick={() => context.showCurrentRoster ? handleAvailable() : showWrestlerInfo()}>
            <figure
                className="relative w-full rounded-tl-lg rounded-tr-lg"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <img
                    className={`w-full h-full object-cover bg-cover bg-center rounded-tl-lg rounded-tr-lg`}
                    src={wrestler.image}
                />
                <figcaption className="absolute top-0 right-0 bg-slate-600 rounded-lg text-white text-xs px-0.5 py-0.5">{wrestler.media}</figcaption>
                {renderDeleteBottom()}
                {renderInfoBottom()}
            </figure>
            <p className="flex items-center justify-center text-center bg-slate-200 rounded-bl-lg rounded-br-lg h-[30px]">
                <span className="text-[9px] font-bold">{wrestler.name}</span>
            </p>
        </article>
    )
}

export { Card }