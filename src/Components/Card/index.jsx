/* eslint react/prop-types: "off" */
import { useContext } from "react"
import { DraftVerseContext } from "../../Context"

const Card = ({ image, media, name, widthClass, available, index, tags }) => {
    const backgroundImage = import.meta.env.VITE_BACKGROUND_IMAGE_PATH
    const context = useContext(DraftVerseContext)

    const handleAvailable = () => {
        if (context.showCurrentRoster) {
            if (tags.includes('Custom')) {
                context.setCustomRoster((prevRoster) =>
                    prevRoster.map((wrestler, i) =>
                        i === index ? { ...wrestler, available: !available } : wrestler
                    )
                )
            } else {
                context.setRosterWwe2k24((prevRoster) =>
                    prevRoster.map((wrestler, i) =>
                        i === index ? { ...wrestler, available: !available } : wrestler
                    )
                )
            }
        }
    }

    const renderDeleteBottom = () => {
        if (tags.includes('Custom')) {
            return (
                <figcaption
                    className="absolute bottom-0 right-0 bg-red-600 rounded-lg text-white text-xs px-2 py-1 hidden group-hover:block"
                    onClick={(event) => deleteWrestler(event)}>
                    X
                </figcaption>
            )
        }
    }

    const deleteWrestler = (event) => {
        event.preventDefault()
        context.setCustomRoster((currentRoster) => {
            return currentRoster.filter((_, i) => i !== index)
        })
    }

    return (
        <article className={`group cursor-pointer rounded-lg text-black ${widthClass} bg-slate-800 transition-transform transform hover:scale-125 duration-300 ease-in-out hover:z-10 relative ${available ? '' : 'grayscale'}`} onClick={handleAvailable}>
            <figure
                className="relative w-full rounded-tl-lg rounded-tr-lg"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <img
                    className={`w-full h-full object-cover bg-cover bg-center rounded-tl-lg rounded-tr-lg`}
                    src={image}
                />
                <figcaption className="absolute top-0 right-0 bg-slate-600 rounded-lg text-white text-xs px-0.5 py-0.5">{media}</figcaption>
                {renderDeleteBottom()}
            </figure>
            <p className="flex items-center justify-center text-center bg-slate-200 rounded-bl-lg rounded-br-lg h-[30px]">
                <span className="text-[9px] font-bold">{name}</span>
            </p>
        </article>
    )
}

export { Card }