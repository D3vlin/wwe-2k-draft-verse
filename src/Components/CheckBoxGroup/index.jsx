/* eslint-disable react/prop-types */
const CheckBoxGroup = ({ title, values, selectedColor, unselectedColor, onChange }) => {
    return (
        <>
            <p className="mb-6">
                <span className="font-bold">{title}</span>
            </p>
            <div className="flex flex-wrap justify-between gap-6 mb-6">
                {
                    values.map((value, index) => {
                        return (
                            <div key={index}>
                                <label
                                    className={`${value.selected ? selectedColor : unselectedColor} p-2 rounded-lg cursor-pointer`}
                                    htmlFor={`${title}-${index}`}>
                                    {value.tag}
                                </label>
                                <input
                                    type="checkbox"
                                    checked={value.selected}
                                    onChange={() => onChange(index)}
                                    id={`${title}-${index}`}
                                    className="hidden"
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export { CheckBoxGroup }