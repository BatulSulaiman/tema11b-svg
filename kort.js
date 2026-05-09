document.addEventListener("DOMContentLoaded", function () {
    runProgram();
});
const steder = [
    {
      "sted":"sti",
      "titel":"📍 Hyggelig sti",
      "tekst":"Her starter en flot sti gennem Assistentens Kirkegård. Følg stien og oplev naturen og de spændende  gravsteder. Turen god til børnefamilier og giver mulighed for både oplevelse, læring og en hyggelig pause sammen.",
      "billede":"sti"
    },
    {
      "sted":"grav",
      "titel":"📍 Hans Scherfig's gravsted",
      "tekst":"Her finder du forfatteren Hans Scherfigs gravsted, som er noget helt særligt. Stenen består af en skildpadde - et symbol på tidens ro og et ekko af de mange dyr, Scherfig portrætterede i sine malerier. Børnene elsker ofte at klatre og lege på skulpturen, så stedet bliver både lærerigt og sjovt at opleve. Under de gamle trækroner kan I gå en tur langs stien, nyde naturen og mærke årstidernes skiften, mens I lærer lidt om Scherfig og hans verden.",
      "billede":"gravsted"
    },
    {
      "sted":"pause",
      "titel":"📍 Pausested",
      "tekst":"Hvis du trænger til en pause, så stå her og træk vejret ved den fine sø. Bliv her, indtil du føler dig klar til at gå tilbage til løbet igen. Alle har brug for en pause og derfor kan du blive her, sidde på bænken og tage en slapper.",
      "billede":"pause"
    },
    {
        "sted":"blomster",
        "titel":"📍 Blomsterområde",
        "tekst":"På Assistens Kirkegård findes der et særligt blomsterområde, som er noget helt andet end de gamle, klassiske gravsteder. Her er stemningen lysere og mere åben. I stedet for høje gravsten og indhegnede familiegravsteder mødes man af blomsterbede, grønne planter og små, personlige mindetegn. Det føles som et fredeligt sted, hvor naturen spiller hovedrollen.",
        "billede":"blomster"
      }
    
    ];

async function runProgram() {
  let selected;
  let selectedId;
  let fillColor;
  let active;
  const popover = document.querySelector("#info");
    // 1. Load svg map
    //------------------------------------------------------------------------------------	
let rawSvg = await fetch("KORT.svg");
let svg = await rawSvg.text();
document.querySelector("#map").innerHTML = svg;

    // 2. Skift farve ved klik, og vis tekst
    //-----------------------------------------------------------------------
document.querySelector("#map #steder").addEventListener("click", (evt) => clicked(evt));
console.log("Klikket element:", selected);
console.log("Klikket ID:", selectedId);
    //function clicked
    //--------------------------------------------------------------------
function clicked(evt) {

  
    // a. find det klikkede element
    //----------------------------------------------
    selected = evt.target;
 
    // b. find det klikkede elementets ID
    //---------------------------------------------
selectedId = selected.id;

    // c. find  det klikkede elements fillfarve
fillColor = selected.getAttribute("fill");

 
    // d. vis info
    //--------------------------------------------
steder.forEach(sted => {
    if (sted.sted === selectedId) {
        document.querySelector("#tekst").textContent = sted.tekst;
        document.querySelector("#stedbillede").src ="billeder/" + sted.billede + ".webp";
        document.querySelector("#titel").textContent = sted.titel;
    }
});


    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
if(active){
    active.setAttribute("fill", fillColor)
}
    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------
if (fillColor == "#b62300"){
    document.querySelector("#" + selectedId).setAttribute("fill", "#123456");
}

    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
else {
    document.querySelector("#" + selectedId).setAttribute("fill", "#b62300");

}
popover.togglePopover();
}
document.addEventListener("click", () => {
    if (!popover.matches(":popover-open")) {
        selected.setAttribute("fill", "#b62300");
    }
});

};
