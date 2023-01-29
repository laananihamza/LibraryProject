import { useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const Create = () => {
    const [place, setPlace] = useState('');
    const [options, setOptions] = useState('');
    const [degre, setDegre] = useState('');

    const navi = useNavigate();

    function GoTo() {
        navi.navigate('https://google.com')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (place && options && degre) {
            const New = {place, options, degre};
            console.log(New)
            fetch("http://localhost:8000/ISTA", {
                method: 'POST',
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(New)
            }).then(() => {
                console.log("New ISTA Added");
                window.location.replace('/')
            })
        }
    }
    return ( 
        <div className="create">
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Place</label>
                <input type="text" value={place} onInput={(e) => setPlace(e.target.value)} /><br />
                <label htmlFor="">Options</label>
                <input type="text" value={options} onChange={(e) => setOptions(e.target.value)} /><br />
                <label htmlFor="">Degre</label>
                <input type="number" step={0.1} min={0} max={20} value={degre} onChange={(e) => setDegre(e.target.valueAsNumber)} /><br />
                <input type="submit" value="Send" />
            </form>
            <a href='http://www.dopdfwn.com/cacnretra/scgdfnya/www.alkottob.com-Ibrahim_Arab_spies_and_traitors.Pdf' target="_blank">Download</a>
            {/* <button onClick={() => window.location.replace('https://google.com')}>Download</button> */}
             {/* navi('http://www.dopdfwn.com/cacnretra/scgdfnya/www.alkottob.com-Ibrahim_Arab_spies_and_traitors.Pdf') */}
        </div>
    );
}

export default Create;