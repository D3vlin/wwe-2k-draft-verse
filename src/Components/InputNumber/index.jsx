/* eslint-disable react/prop-types */
const InputNumber = ({id, title, value, onChange}) => {
    return (
        <div className="flex justify-between mb-3">
            <p>
                <span className="font-light">{title}</span>
            </p>
            <input
                className="bg-slate-600 text-white font-bold text-center rounded-tl-lg rounded-tr-lg focus:outline-none w-1/3"
                id={id} type="number" value={value} min='1' max='18' onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}

export { InputNumber }