import React from 'react'
import html2canvas from "html2canvas";

export default function Meme() {
    const [allMemes, setAllMemes] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data))
    }, [])

    

    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into mordor",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    function getMeme() {
        const meme = allMemes.data.memes[Math.floor(Math.random() * allMemes.data.memes.length)]
        setMeme(prevMeme => ({...prevMeme, randomImage: meme.url})) 
    }

    function handleTextboxChange(event) {
        const {name, value} = event.target
        return setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    function downloadMeme() {
        html2canvas( document.querySelector(".image-container"), { logging: true, letterRendering: 1,  allowTaint: false,  useCORS: true } ).then(canvas => { 
            let link = document.createElement('a');
            link.download = 'meme.png';
            link.href = canvas.toDataURL()
            link.click();
        })
    }

    return (
        <div className="meme">
            <div className="meme-form">
                <div className="textbox-container">
                    <div className="top-textbox-container">
                        <label htmlFor="top-textbox">Top Text</label>
                        <input id="top-textbox" className="top-textbox" type="text" placeholder="Top Text"   name="topText" value={meme.topText} onChange={handleTextboxChange}/>
                    </div>
                    <div className="bottom-textbox-container">
                        <label htmlFor="bottom-textbox">Bottom Text</label>
                        <input className="bottom-textbox" type="text" placeholder="Bottom Text" name="bottomText" value={meme.bottomText} onChange={handleTextboxChange}/>
                    </div>
            
                </div>
                <button onClick={getMeme} className="btn">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    New Meme
                </button>
                <button onClick={downloadMeme} className="btn">
                    <i class="fa-solid fa-circle-down"></i>
                    Download Meme
                </button>
            </div>
            <div className="image-container">
                <h2 className="top-text">{meme.topText}</h2>
                <img className="meme-image" src={meme.randomImage} alt="meme" />
                <h2 className="bottom-text">{meme.bottomText}</h2>
            </div>
            

        </div>
    )
}