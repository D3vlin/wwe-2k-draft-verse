import { useContext } from "react"
import { DraftVerseContext } from "../../Context"
import { SideMenu } from "../SideMenu"

const WrestlerInfoSideMenu = () => {
    const context = useContext(DraftVerseContext)
    const backgroundImage = import.meta.env.VITE_BACKGROUND_IMAGE_PATH

    return (
        <SideMenu openMenu={context.showWrestlerInfo} onCloseMenu={() => context.setShowWrestlerInfo(false)} position={'right'} title={"Wrestler Info"}>
            <div className="flex flex-col gap-3 px-6 mb-6">
                <figure
                    className="relative w-full rounded-tl-lg rounded-tr-lg"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <img
                        className={`w-full h-full object-cover bg-cover bg-center rounded-tl-lg rounded-tr-lg`}
                        src={context.wrestlerInfo.image}
                    />
                    <figcaption className="absolute top-0 right-0 bg-slate-600 rounded-lg text-white text-xl px-0.5 py-0.5">{context.wrestlerInfo.media}</figcaption>
                </figure>
                <h3 className="font-medium text-xl">
                    {context.wrestlerInfo.name}
                </h3>
                <button
                    className={`${context.showCurrentRoster ? 'hidden' : ''} bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg`}
                    onClick={() => context.sendToShow()}>
                    Send To Show #{context.activeShow+1}
                </button>
            </div>
        </SideMenu>
    )
}

export { WrestlerInfoSideMenu }