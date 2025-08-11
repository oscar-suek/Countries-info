document.addEventListener('DOMContentLoaded', function(){
    //fetch the json data and execute the functions
    fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData
        showCountries()
        showCountryDetail()
        goBack()
        darkMode()
    })

    //fuction to show the countries
    function showCountries(){
        let output = "";
        if(data.length > 0){
            data.forEach((item,index) => {
                output += `
                        <div class="country-card" data-item-index="${index}">
                            <img src="${item.flags.png}" alt="${item.flags.png}" class="img1">
                            <p class="c-name">${item.name}</p>
                            <p class="c-pop"><span class="c-det">Population: </span> ${item.population}</p>
                            <p class="c-reg"><span class="c-det">Region: </span> <span class="region-spec">${item.region}</span></p>
                            <p class="c-cap"><span class="c-det">Capital: </span> ${item.capital}</p>
                        </div>
                    `
            })
            document.querySelector('#main-div').innerHTML = output
        }

        //function to filter by region
        regions = document.querySelectorAll('.region-spec')
        region = document.querySelector('#region')
        region.addEventListener('change', function(){
            console.log(region.value)
            regions.forEach(w => {
                if (region.value == w.innerHTML){
                    w.parentElement.parentElement.style.display = 'block'
                }
                else if (region.value == 'fbr'){
                    w.parentElement.parentElement.style.display = 'block'
                }
                else{
                    w.parentElement.parentElement.style.display = 'none'
                }
            })
        })

        //adding the search bar functionality
        searchBar = document.querySelector('#c-search')
        countryName = document.querySelectorAll('.c-name')
        countryName.forEach(q=>{
            searchBar.addEventListener('input', function(){
                a = q.innerHTML.toLowerCase()
                let check = a.includes(searchBar.value)
                if(check == true){
                    q.parentElement.style.display = 'block'
                }else{q.parentElement.style.display = 'none'}
            })
        })
    }

    //show more country detail when a country is clicked
    function showCountryDetail(){
        ovContainer = document.querySelector('#overall-container')
        newDetails = document.querySelector('#new-details')
        countries = document.querySelectorAll('.country-card')
        countries.forEach(a => {
            a.addEventListener('click', function(){
                ovContainer.style.display = 'none'
                newDetails.style.display = 'block'
                let newPage = ""
                newPage = `
                        <div class="back-button"><img src="icons8-arrow-50.png" alt="icons8-arrow-50.png" class="img2"><p>Back</p></div>
                        <div class="main-det">
                            <div><img src="${data[a.dataset.itemIndex].flags.png}" class="img3"></div>
                            <div class="mc1">
                                <p class="coun-name">${data[a.dataset.itemIndex].name}</p>
                                <div class="mc2">
                                    <div class="mc3">
                                        <p class="p-det"><span class="c-det">Native Name: </span> ${data[a.dataset.itemIndex].nativeName}</p>
                                        <p class="p-det"><span class="c-det">Population: </span> ${data[a.dataset.itemIndex].population}</p>
                                        <p class="p-det"><span class="c-det">Region: </span> ${data[a.dataset.itemIndex].region}</p>
                                        <p class="p-det"><span class="c-det">Sub Region: </span> ${data[a.dataset.itemIndex].subregion}</p>
                                        <p class="p-det"><span class="c-det">Capital: </span> ${data[a.dataset.itemIndex].capital}</p>
                                    </div>
                                    <div class="mc4">
                                        <p class="p-det"><span class="c-det">Top Level Domain: </span> ${data[a.dataset.itemIndex].topLevelDomain}</p>
                                        <p class="p-det"><span class="c-det">Currencies: </span> ${data[a.dataset.itemIndex].currencies[0].name}</p>
                                        <p class="p-det"><span class="c-det">Languages: </span> <span id="l-name"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                newDetails.innerHTML = newPage
                goBack()
                //adding the country language(s)
                data[a.dataset.itemIndex].languages.forEach((g) => {
                    /* console.log(g.name) */
                    alo = []
                    alo.push(g.name)
                    document.querySelector('#l-name').innerHTML += g.name + ', '
                }) 
                sg = document.querySelector('#l-name').innerHTML
                lg = sg.substr(0, sg.length - 2)
                document.querySelector('#l-name').innerHTML = lg
                //adding the border countries
                mc1 = document.querySelectorAll('.mc1')
                if(data[a.dataset.itemIndex].borders == 'undefined'){
                    console.log('no borders')
                }else{
                    mc1.forEach(p=>{
                        p.innerHTML += `<div class="bor-div"><span class="c-det">Border Countries: </span> <p class="bor-cont">${data[a.dataset.itemIndex].borders[0]}</p>
                                <p class="bor-cont">${data[a.dataset.itemIndex].borders[1]}</p><p class="bor-cont">${data[a.dataset.itemIndex].borders[2]}</p>
                                <p class="bor-cont">${data[a.dataset.itemIndex].borders[3]}</p><p class="bor-cont">${data[a.dataset.itemIndex].borders[4]}</p>
                                <p class="bor-cont">${data[a.dataset.itemIndex].borders[5]}</p></div>`
                    })
                }
                borCont = document.querySelectorAll('.bor-cont')
                borCont.forEach(v=>{
                    if (v.innerHTML == 'undefined'){
                        v.style.display = 'none'
                    }
                })
            })
        })
    }

    //fumction to go back to the main page
    function goBack(){
        backButton = document.querySelectorAll('.back-button')
        backButton.forEach(t=>{
            t.addEventListener('click', function(){
                newDetails.style.display = 'none'
                ovContainer.style.display = 'block'
                console.log('clicked')
            })
        })
    }

    //function to toggle between light mode and dark mode
    function darkMode(){
        modeSelector = document.querySelector('#hd2')
        moonImage = document.querySelector('#dm-img')
        mainDiv = document.querySelector('#main-div')
        countriess = document.querySelectorAll('.country-card')
        hr = document.querySelector('hr')
        dmText = document.querySelector('#dm-text')
        body = document.querySelector('body')
        fodder = document.querySelector('#fodder')
        oc = document.querySelector('#overall-container')
        modeSelector.addEventListener('click', function(){
            if(dmText.innerHTML == 'Dark Mode'){
                moonImage.src = 'icons8-sun.svg'
                body.style.color = 'white'
                body.style.backgroundColor = 'hsl(209, 23%, 22%)'
                hr.style.borderColor = 'hsl(209, 23%, 22%)'
                fodder.style.backgroundColor = 'hsl(207, 26%, 17%)'
                mainDiv.style.backgroundColor = 'hsl(207, 26%, 17%)'
                oc.style.backgroundColor = 'hsl(207, 26%, 17%)'
                dmText.innerHTML = 'Light Mode'
                countriess.forEach(n=>{
                    n.style.backgroundColor = 'hsl(209, 23%, 22%)'
                })
            }
            else{
                moonImage.src='icons8-moon-50.png'
                body.style.color = 'black'
                body.style.backgroundColor = 'white'
                hr.style.borderColor = 'hsl(0, 0%, 99%)'
                fodder.style.backgroundColor = 'hsl(0, 27%, 96%)'
                mainDiv.style.backgroundColor = 'hsl(0, 27%, 96%)'
                oc.style.backgroundColor = 'hsl(0, 27%, 96%)'
                dmText.innerHTML = 'Dark Mode'
                countriess.forEach(n=>{
                    n.style.backgroundColor = 'white'
                })
            }
        })
    }
})

