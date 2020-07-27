

const init = () => {
    let btn = document.querySelector("#button-addon2");
    btn.addEventListener("click", displayWeatherInfo);
}

const displayWeatherInfo = () => {
    let zipCode = document.querySelector("#zip");
    let username = "jalexander";
    let country = "US";

    if (url = `http://api.geonames.org/postalCodeSearchJSON?username=${username}&postalcode=${zipCode.value}&countryCode=${country}`) {

         const callback = data => {
            let postalcodes = JSON.parse(data);
            let lat = `${postalcodes["postalCodes"][0].lat}`;
            let lng = `${postalcodes["postalCodes"][0].lng}`;
            let countryCode = `${postalcodes["postalCodes"][0].countryCode}`;
            let state = `${postalcodes["postalCodes"][0].adminName1}`;
            let cityName = `${postalcodes["postalCodes"][0].placeName}`;

            let myDivOne = document.querySelector(".outputOne");
            let myPOne = document.createElement("P");
            myPOne.innerHTML =`${countryCode}` + `<br/>` + `${state}` + `<br/>` + `${cityName}`;

            let newParagraph = document.createElement("p");
            newParagraph.id="newP";
            newParagraph.innerHTML = `${countryCode}` + `<br/>` + `${state}` + `<br/>` + `${cityName}`;

            let emptyParagraph = document.createElement("p");
            emptyParagraph.innerHTML = ""

             if(!myDivOne && zipCode.value) {
                 myDivOne = document.createElement("div");
                 myDivOne.classList.add("outputOne");
                 myDivOne.appendChild(myPOne);
                 document.body.appendChild(myDivOne);
             } else if(myDivOne && zipCode.value == "") {
                 myDivOne = document.createElement("div");
                 myDivOne.classList.add("outputOne");
                 myDivOne.appendChild(emptyParagraph);
                 document.body.appendChild(myDivOne);
             } else {
                 let oldChild = document.querySelector(".outputOne p");
                 oldChild.parentNode.replaceChild(newParagraph, oldChild);
             }
            console.log(postalcodes);

            if(url = `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${lng}&username=${username}`) {

                const callback = data => {
                    let weatherInfo = JSON.parse(data);
                    let temperature = `${weatherInfo["weatherObservation"].temperature}`;
                    let windSpeed = `${weatherInfo["weatherObservation"].windSpeed}`;
                    let windDirection = `${weatherInfo["weatherObservation"].windDirection}`;

                    // convert the temperature to farentheit
                    let convertToFarenheit = (temperature * 9/5) + 32;
                    // create div elements and image element
                    let myDivTemparature = document.querySelector(".outputTemp");
                    let myLabelOne = document.createElement("label");
                    myLabelOne.textContent = `${convertToFarenheit}° Farenheit`;
                    //create the warm image
                    let warmFarenheitImg = document.createElement("img");
                    warmFarenheitImg.src = "image/warm.jpg";
                    // create the cold image
                    let coldFarenheitImg = document.createElement("img");
                    coldFarenheitImg.src = "image/cold.jpg";

                    // create a new label for the value of the temparature in farentheit
                    let labelFarenheit = document.createElement("label");
                    labelFarenheit.textContent = `${convertToFarenheit}° Farenheit`;

                    // checking if the farentheit is less or equal 34 and display the appropriate image

                    if(!myDivTemparature && convertToFarenheit <= 34) {
                        myDivTemparature = document.createElement("div");
                        myDivTemparature.classList.add("outputTemp");
                        myDivTemparature.appendChild(myLabelOne);
                        myDivTemparature.appendChild(coldFarenheitImg);
                        document.body.appendChild(myDivTemparature);
                    } else if(!myDivTemparature && convertToFarenheit > 34) {
                        myDivTemparature = document.createElement("div");
                        myDivTemparature.classList.add("outputTemp");
                        myDivTemparature.appendChild(myLabelOne);
                        myDivTemparature.appendChild(warmFarenheitImg);
                        document.body.appendChild(myDivTemparature);
                    } else {
                        let oldImg = document.querySelector(".outputTemp img");
                        let oldChild = document.querySelector(".outputTemp label");
                         if (convertToFarenheit <= 34) {
                            oldImg.parentNode.replaceChild(coldFarenheitImg, oldImg);
                            oldChild.parentNode.replaceChild(labelFarenheit, oldChild);
                        } else if (convertToFarenheit > 34) {
                            oldImg.parentNode.replaceChild(warmFarenheitImg, oldImg);
                            oldChild.parentNode.replaceChild(labelFarenheit, oldChild);
                        }
                    }
                    // create div elements and the variable that has the value of the wind direction
                    let myDivWindDirection = document.querySelector(".outputWindDirection");
                    let windSpeedDiv = document.querySelector(".windSpeed");
                    // creating labels

                    let labelTwo = document.createElement("label");
                    labelTwo.textContent = `${windSpeed} mph`;

                    let northLabel = document.createElement("label");
                    northLabel.textContent = `${windSpeed} mph North Wind`;

                    let southLabel = document.createElement("label");
                    southLabel.textContent = `${windSpeed} mph South Wind`;

                    let eastLabel = document.createElement("label");
                    eastLabel.textContent = `${windSpeed} mph East Wind`;

                    let westLabel = document.createElement("label");
                    westLabel.textContent = `${windSpeed} mph West Wind`;
                    //create the wind North image
                    let northWindImg = document.createElement("img");
                    northWindImg.src = "image/windNorth350.png";
                    //create the wind South image
                    let southWindImg = document.createElement("img");
                    southWindImg.src = "image/windSouth180.png";
                    //create the wind East
                    let eastWindImg = document.createElement("img");
                    eastWindImg.src = "image/windEast80.png";
                    //create the West wind
                    let westWindImg = document.createElement("img");
                    westWindImg.src = "image/windWest200.png";

                    if (windSpeed > 15) {
                        if(!myDivWindDirection && windDirection >= 300 && windDirection <= 400) {
                            console.log(windDirection);
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(northLabel);
                            myDivWindDirection.appendChild(northWindImg);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection >= 100 && windDirection < 190) {
                            console.log(windDirection);
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(southLabel);
                            myDivWindDirection.appendChild(southWindImg);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection == 0 && windDirection < 80) {
                            console.log(windDirection);
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(labelTwo);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection >= 80 && windDirection <= 100) {
                            console.log(windDirection);
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(eastLabel);
                            myDivWindDirection.appendChild(eastWindImg);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection >= 190 && windDirection < 300) {
                                console.log(windDirection);
                                myDivWindDirection = document.createElement("div");
                                myDivWindDirection.classList.add("outputWindDirection");
                                myDivWindDirection.appendChild(westLabel);
                                myDivWindDirection.appendChild(westWindImg);
                                document.body.appendChild(myDivWindDirection);
                        } else {
                            let oldWindChild = document.querySelector(".outputWindDirection label");
                            let oldWindImg = document.querySelector(".outputWindDirection img");
                             if (windDirection >= 300 && windDirection <= 400) {
                                oldWindImg.parentNode.replaceChild(northWindImg, oldWindImg);
                                oldWindChild.parentNode.replaceChild(northLabel, oldWindChild);
                            } else if (windDirection >= 100 && windDirection < 190) {
                                oldWindImg.parentNode.replaceChild(southWindImg, oldWindImg);
                                oldWindChild.parentNode.replaceChild(southLabel, oldWindChild);
                            } else if (windDirection >= 80 && windDirection < 100) {
                                oldWindImg.parentNode.replaceChild(eastWindImg, oldWindImg);
                                oldWindChild.parentNode.replaceChild(eastLabel, oldWindChild);
                            } else if (windDirection >= 190 && windDirection < 300) {
                                console.log(windDirection);
                                oldWindChild.parentNode.replaceChild(westLabel, oldWindChild);
                                oldWindImg.parentNode.replaceChild(westWindImg, oldWindImg); // there is parentNode issues fix it

                            } else if (windDirection == 0 && windDirection < 80) {
                                oldWindChild.parentNode.replaceChild(labelTwo, oldWindChild);
                            }
                        }

                    } else {
                        if(!myDivWindDirection && windDirection >= 300 && windDirection <= 400) {
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(labelTwo);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection >= 100 && windDirection < 190) {
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(labelTwo);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection == 0 && windDirection < 80) {
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(labelTwo);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection >= 80 && windDirection <= 100) {
                            myDivWindDirection = document.createElement("div");
                            myDivWindDirection.classList.add("outputWindDirection");
                            myDivWindDirection.appendChild(labelTwo);
                            document.body.appendChild(myDivWindDirection);
                        } else if(!myDivWindDirection && windDirection >= 190 && windDirection < 300) {
                            console.log(windDirection);
                                myDivWindDirection = document.createElement("div");
                                myDivWindDirection.classList.add("outputWindDirection");
                                myDivWindDirection.appendChild(labelTwo);
                                document.body.appendChild(myDivWindDirection);
                        } else {
                            let oldWindSpeedChild = document.querySelector(".outputWindDirection label");
                             if (windDirection >= 300 && windDirection <= 400) {
                                oldWindSpeedChild.parentNode.replaceChild(labelTwo, oldWindSpeedChild);
                            } else if (windDirection >= 100 && windDirection < 190) {
                                oldWindSpeedChild.parentNode.replaceChild(labelTwo, oldWindSpeedChild);
                            } else if (windDirection >= 80 && windDirection < 100) {
                                oldWindSpeedChild.parentNode.replaceChild(labelTwo, oldWindSpeedChild);
                            } else if (windDirection >= 190 && windDirection < 300) {
                                oldWindSpeedChild.parentNode.replaceChild(labelTwo, oldWindSpeedChild);
                            } else if (windDirection == 0 && windDirection < 80) {
                                oldWindSpeedChild.parentNode.replaceChild(labelTwo, oldWindSpeedChild);
                            }
                        }
                    }
                    console.log(weatherInfo);
                }
                makeAjaxRequest(url, callback);
            }
        }
        makeAjaxRequest(url, callback);
    }
}

 const makeAjaxRequest = (url, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url);

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            if(xhr.responseXML) {
                callback(xhr.responseXML);
            } else {
                callback(xhr.responseText);
            }
        }
    });

    xhr.send(null);
 }

window.addEventListener("load", init);
