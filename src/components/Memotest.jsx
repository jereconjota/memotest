import { useEffect, useState } from "react"

// Creamos el array de imágenes y con la funcion flatMap lo convertimos en un array plano de dos elementos por cada imagen
// Luego con la funcion sort lo mezclamos
const IMAGES = [
    "https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/express-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/git-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/github-original.svg?size=128&color=currentColor",
]
    .flatMap((image) => [`a|${image}`, `b|${image}`])
    .sort(() => Math.random() - 0.5);

export default function Memotest() {

    const [guessed, setGuessed] = useState([])
    const [selected, setSelected] = useState([])

    // Si el array selected tiene dos elementos, comparamos si son iguales
    // Si son iguales, los agregamos al array guessed
    // Si no son iguales, los quitamos del array selected con un setTimeout de 1 segundo
    useEffect(() => {
        if (selected.length === 2) {
            if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
                setGuessed((guessed) => guessed.concat(selected));
            }
            setTimeout(() => setSelected([]), 1000)
        }
    }, [selected])


    // Si el array guessed tiene la misma cantidad de elementos que el array IMAGES, significa que ganó
    // Mostramos un alert y recargamos la página
    useEffect(() => {
        if (guessed.length === IMAGES.length) {
            alert("You won!")
            location.reload()
        }
    }, [guessed])

    return (
        <ul style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
            gap: 24,
        }}
        >
            {IMAGES.map((image) => {
                const [, url] = image.split("|")

                // Si el elemento está en el array guessed, mostramos la imagen
                // Si no, mostramos el icono de cerveza
                return (
                    <li
                        key={image}
                        style={{
                            cursor: 'pointer',
                            border: '1px solid whitesmoke',
                            borderRadius: 12,
                            padding: 12,
                        }}
                        onClick={() => { 
                            if (selected.includes(image)) return;
                            if (guessed.includes(image)) return;
                            selected.length < 2 && setSelected((selected) => selected.concat(image)) 
                        }}
                    >
                        {/* Si el elemento está en el array selected o guessed, mostramos la imagen */}
                        {selected.includes(image) || guessed.includes(image) ? (
                            <img alt='icon' src={url} />
                        ) : (
                            <img
                                alt='icon'
                                src='https://icongr.am/jam/beer.svg?size=128&color=currentColor'
                            />
                        )
                        }
                    </li>
                )
            })}
        </ul>
    )
}

