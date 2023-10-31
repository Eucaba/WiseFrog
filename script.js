var API_Key = config.API_Key;
var API_Host = config.API_Host;

window.addEventListener("load", function () {

    document.getElementById("getquote").addEventListener("click", getquote)

    function getquote() {

        //Al haber solo un key-value podríamos hacerlo con un fetch que lo incluya ya, pero lo ideal es:
        //objeto con el/los pares key-value:
        const params = {
            language_code: "es",
        };
        //convierto los pares en queryString:
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        //creamos la url final con url + queryString
        const url = `https://quotes15.p.rapidapi.com/quotes/random/?${queryString}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": API_Key,
                "X-RapidAPI-Host": API_Host,
            }
        })
            .then(res => res.json())
            .then(objJson => {
                console.log(objJson)

                let quoteContentHTML = `<p>"${objJson.content}" - ${objJson.originator.name}</p>`;
                let textbubble = document.getElementById("speech")
                textbubble.innerHTML= quoteContentHTML;
            })
        
        let button = document.getElementById("getquote")
        button.innerText = "Obtener otra cita"

        let frog = document.getElementById("frog")
        frog.innerHTML = `<img src="/images/wisefrogglow.png"
        alt="un personaje de fantasía, una rana con capa y una bola de cristal resplandecientes" />`
    }
})
