/* eslint react/prop-types: "off" */
import { DraftSideMenu } from "../DraftSideMenu"
import { WrestlerInfoSideMenu } from "../WrestlerInfoSideMenu"

const Layout = ({children}) => {

    return (
        <div className="flex flex-col items-center">
            {children}
            <DraftSideMenu />
            <WrestlerInfoSideMenu />
        </div>
    )
}

export {Layout}