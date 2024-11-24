/* eslint react/prop-types: "off" */
import { DraftSideMenu } from "../DraftSideMenu"

const Layout = ({children}) => {

    return (
        <div className="flex flex-col items-center">
            {children}
            <DraftSideMenu />
        </div>
    )
}

export {Layout}