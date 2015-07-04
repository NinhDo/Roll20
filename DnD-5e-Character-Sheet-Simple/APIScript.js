on("add:character", function(obj) {
    createObj("attribute", {
        name: "Level",
        current: 0,
        max: 20,
        characterid: obj.id,
    });
    createObj("attribute", {
        name: "NextLevel",
        current: 300,
        max: "",
        characterid: obj.id,
    });
    createObj("attribute", {
        name: "Experience",
        current: 0,
        max: "",
        characterid: obj.id,
    });
});

on("change:attribute", function(obj) {
    if(obj.get("name") == "Experience" && isNumeric(obj.get("current"))) {
        CalculateEXP(obj);
    }
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function CalculateEXP(obj) {
    var EXP = parseInt(obj.get("current"));
    var charID = obj.get("_characterid");
    var Level = findObjs({
        _type: 'attribute',
        _characterid: charID,
        name: 'Level',
    })[0];
    var NextLevel = findObjs({
        _type: 'attribute',
        _characterid: charID,
        name: 'NextLevel',
    })[0];
    var EXPArray = [300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
    for(var i = 0; i < EXPArray.length; i++) {
        if(EXP < EXPArray[i]) {
            NextLevel.set("current", EXPArray[i].toString());
            Level.set("current", (i+1).toString());
            break;
        } else if(EXP >= 355000) {
            NextLevel.set("current", "N/A");
            Level.set("current", "20");
            break;
        }
    }
    log(Level);
    log(NextLevel);
}
