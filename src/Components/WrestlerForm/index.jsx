import React from "react";
import { useContext, useRef, useState } from "react";
import { DraftVerseContext } from "../../Context";

function WrestlerForm() {
    const context = useContext(DraftVerseContext);
    const genders = ['Male', 'Female']

    const [availableTags, setAvailableTags] = useState([{ tag: 'Manager', selected: false }])
    const [selectedGender, setSelectedGender] = useState('Male')
    const [imageBase64, setImageBase64] = useState('./Images/RosterWwe2k24/customWrestler.webp')

    const form = useRef(null)

    const handleTagClick = (index) => {
        const updatedTags = availableTags.map((tag, i) => (i === index) ? { ...tag, selected: !tag.selected } : tag);
        setAvailableTags(updatedTags);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImageBase64(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form.current)

        const customWrestler = {
            dlc: null,
            cardPerson: false,
            gender: selectedGender,
            image: imageBase64,
            name: formData.get('name'),
            category: 'High Flyer',
            media: formData.get('media'),
            weight: 'Light Heavyweight',
            tags: availableTags.filter(tag => tag.selected).map(tag => tag.tag)
        }
        context.setCustomRoster(currentRoster => [...currentRoster, customWrestler])
        context.setOpenModal(false)
    };

    return (
        <form ref={form} className="flex flex-col gap-2 bg-slate-400 p-3 rounded-lg" onSubmit={onSubmit}>
            <label className="font-bold w-full text-center">Add your custom wrestler!</label>
            <div className="flex justify-between gap-2">
                <label htmlFor="name" className="font-light">Name:</label>
                <input
                    className="bg-slate-600 text-white font-bold px-1 rounded-tl-lg rounded-tr-lg focus:outline-none"
                    type="text" id="name" name="name" placeholder="Custom Wrestler" required
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="media" className="font-light">Media:</label>
                <input
                    className="bg-slate-600 text-white font-bold px-1 rounded-tl-lg rounded-tr-lg focus:outline-none"
                    type="number" min='50' max='99' id="media" name="media" placeholder="50" required
                    onBlur={(event) => (event.target.value > 99) ? event.target.value = 99 : (event.target.value < 50) ? event.target.value = 50 : null}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label className="font-light">Image:</label>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="flex justify-between gap-2 mt-3">
                <label className="font-light">Gender:</label>
                {
                    genders.map((g, index) => {
                        return (
                            <div key={index}>
                                <label
                                    className={`${selectedGender === g ? 'bg-violet-600' : 'bg-slate-600'} p-2 rounded-lg cursor-pointer`}
                                    htmlFor={`gender-${index}`
                                    }>
                                    {g}
                                </label>
                                <input
                                    name="gender"
                                    type="radio"
                                    id={`gender-${index}`}
                                    className="hidden"
                                    checked={selectedGender === g}
                                    onChange={() => setSelectedGender(g)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between gap-2 mt-3">
                <label>Tags:</label>
                {
                    availableTags.map((t, index) => {
                        return (
                            <div key={index}>
                                <label
                                    className={`${t.selected ? 'bg-violet-600' : 'bg-slate-600'} p-2 rounded-lg cursor-pointer`}
                                    htmlFor={`tag-${index}`}>
                                    {t.tag}
                                </label>
                                <input
                                    type="checkbox"
                                    checked={t.selected}
                                    onChange={() => handleTagClick(index)}
                                    id={`tag-${index}`}
                                    className="hidden"
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between gap-2 mt-3">
                <button
                    type="button"
                    className="bg-gray-800 w-full py-2 font-bold rounded-bl-lg rounded-lg"
                    onClick={() => { context.setOpenModal(false) }}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-violet-800 w-full py-2 font-bold rounded-bl-lg rounded-lg">
                    Add
                </button>
            </div>
        </form>
    );
}

export { WrestlerForm };
