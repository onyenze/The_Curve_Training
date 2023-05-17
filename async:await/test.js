function percentageGen() {
    E = Math.floor(Math.random()*100)
   var Y = Math.floor(Math.random()*100)
    return E,Y
}
function averageCalc (){
   var average = (E + Y)/2
    return average
}
function verdict (){
    if (0<= average && average <31) {console.log("Do not try this");}
    else if (30< average && average <51){console.log("Not Compactible")}
    else if (50< average && average <71){console.log("Slightly Compactible")}
    else if (70< average && average <91){console.log("Very Compactible")}
    else {console.log("Best option")}
}

const loveCalculator = async (name1,name2) => {
    try { 
        await percentageGen()
        await averageCalc ()
        console.log(`${name1} :`+E+"%"+","+`${name2} :` + Y+"%" + ` => ${average}%`);
        await verdict ()        
     }
catch (e){console.log(e.message)}
}

loveCalculator("Elvis","Yewande")