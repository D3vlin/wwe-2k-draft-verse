const Card = ({ image, media, name }) => {
    return (
        <article className="cursor-pointer rounded-lg text-black w-[calc(100%/13)] bg-slate-800">
            <figure className="relative w-full">
                <img className="w-full h-full object-cover bg-[url('./Images/RosterWwe2k24/backgroundCard.webp')] bg-cover bg-center rounded-tl-lg rounded-tr-lg"
                    src={image} />
                <figcaption className="absolute top-0 right-0 bg-slate-600 rounded-lg text-white text-xs px-0.5 py-0.5">{media}</figcaption>
            </figure>
            <p className="flex items-center justify-center text-center bg-slate-200 rounded-bl-lg rounded-br-lg h-[30px]">
                <span className="text-[9px] font-bold">{name}</span>
            </p>
        </article>
    )
}

export { Card }