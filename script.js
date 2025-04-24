fetch("https://www.finnkino.fi/xml/TheatreAreas/")
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const alueet = xml.querySelectorAll("TheatreArea");
        //Haetaan teatteri tiedot, luodaan muuttuja parserille, joka muuttaa tiedot DOM:ksi, luodaan muuttuja, jossa on DOM muodossa tagin sisallot.//
        
        



        const select = document.getElementById("valikko");

        alueet.forEach((area, index) => {
            if (index === 0) return;

            const option = document.createElement("option");
            option.value = area.querySelector("ID").textContent;
            option.textContent = area.querySelector("Name").textContent;
            select.appendChild(option);
            });
        });

//Valitaan HTML tiedostosta valikko tagi
//kaydaan lapi alueet (Eli XML tiedoston theatreArea tagi) ja poimitaan sielta  Name tagit, jossa on alueet ja lisataan ne valikkoon.


document.getElementById("valikko").addEventListener("change", function () {
    const theatreId = this.value;



    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${theatreId}`)
        .then(response => response.text())
        .then(str => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, "text/xml");
            const leffat = xml.querySelectorAll("Show");

            const leffataulukko = document.getElementById("näytökset");
            leffataulukko.innerHTML = "";

            leffat.forEach(show => {
                const kuva = show.querySelector("EventMediumImagePortrait").textContent;
                const nimi = show.querySelector("Title").textContent;
                const aika = show.querySelector("dttmShowStart").textContent;
                const sali = show.querySelector("TheatreAndAuditorium").textContent;
                const  linkki = show.querySelector("ShowURL").textContent;

                const div = document.createElement("div");
                div.innerHTML = `<a href="${linkki}" target="_blank" class="linkit">
                    <img src="${kuva}">
                    <strong>${nimi}</strong>
                    <br>${sali}
                    <br>${new Date(aika).toLocaleString()}<hr>
                    </a>`;
                leffataulukko.appendChild(div);
                

            

            });

        });

});


