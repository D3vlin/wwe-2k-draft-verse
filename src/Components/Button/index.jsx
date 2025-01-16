/* eslint react/prop-types: "off" */
const Button = ({ text, onClick, extraStyles }) => {
    return (
        <button
                      //
            className={`font-bold rounded-lg ${extraStyles}`}
            onClick={onClick}>
            {text}
        </button>
    )
}

export { Button }