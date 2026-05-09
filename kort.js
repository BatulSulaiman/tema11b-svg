document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});
const steder = [
  {
    sted: "indgang",
    titel: "📍 Indgangen ved Kapelvej",
    tekst: "Her starter ruten gennem Assistens Kirkegård. Indgangen markerer overgangen fra byen til et mere roligt område med natur, historie og små oplevelser undervejs.",
    billede: "indgang",
  },
  {
    sted: "natasja",
    titel: "📍 Natasjas grav",
    tekst: "Musikeren Natasja Saad er begravet her på Assistens Kirkegård. Mange besøger stedet for at mindes hendes musik og den særlige stemning omkring gravstedet.",
    billede: "natasja",
  },
  {
    sted: "pause",
    titel: "📍 Stille pauseområde",
    tekst: "Dette område er omgivet af træer og små stier, som giver en rolig atmosfære midt i kirkegården. Her kan besøgende tage en pause og opleve naturen omkring sig.",
    billede: "pause",
  },
  {
    sted: "soe",
    titel: "📍 Søområdet",
    tekst: "Ved søen og den lille bro bliver området mere åbent og fredeligt. Vandet, træerne og dyrelivet gør stedet til et populært område at gå en tur igennem.",
    billede: "soe",
  },
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
    steder.forEach((sted) => {
      if (sted.sted === selectedId) {
        document.querySelector("#tekst").textContent = sted.tekst;
        document.querySelector("#stedbillede").src = "billeder/" + sted.billede + ".webp";
        document.querySelector("#titel").textContent = sted.titel;
      }
    });

    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
    if (active) {
      active.setAttribute("fill", fillColor);
    }
    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
    active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------
    if (fillColor == "#b62300") {
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
}
