/* eslint react/prop-types: "off" */
import { useState } from "react"
import { Button } from "../../Components/Button"
import { DraftSideMenu } from "../DraftSideMenu"
import { WrestlerInfoSideMenu } from "../../Components/WrestlerInfoSideMenu"

const Layout = ({ children }) => {
    const [showDraftMenu, setShowDraftMenu] = useState(false)

    return (
        <div className="flex flex-col items-center">
            <div className="absolute left-0 m-3">
                <Button
                    extraStyles={"bg-violet-500 w-full p-2"}
                    text={"Open Draft Menu"}
                    onClick={() => setShowDraftMenu(true)}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-slate-800">
                <h1 className="font-medium text-xl mb-4 mt-4">WWE 2k Draft Verse</h1>
            </div>
            <div className="absolute top-3 right-10">
                <a href="https://github.com/D3vlin/wwe-2k-draft-verse" target="_blank" rel="noopener noreferrer">
                    <img src="./Images/github.webp" alt="githubLogo" className="w-11 cursor-pointer hover:scale-125" />
                </a>
            </div>
            {children}
            <DraftSideMenu showDraftMenu={showDraftMenu} onCloseMenu={() => setShowDraftMenu(false)} />
            <WrestlerInfoSideMenu />
        </div>
    )
}

export { Layout }