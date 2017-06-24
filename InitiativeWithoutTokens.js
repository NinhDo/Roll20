/*
Github:     https://github.com/NinhDo/Roll20/blob/master/InitiativeWithoutTokens.js
By:         Ninh Do
Contact:    https://app.roll20.net/users/190323/ninh
Version:    1.3

#########################
Initiative without tokens
#########################

Roll as usual, but add "!initiative" at the end.
/r d20+5 !initiative
/roll d20+5 !initiative

Adding "!initiative" before will make the message type api and the script will not work correctly

I suggest making a macro querying the player for a modifier.
/r d20+?{Initiative(DEX)|0} !initiative
/roll d20+?{Initiative(DEX)|0} !initiative

Does not work with inline rolls yet

VERSION 1.2 CHANGES
You can now add text at THE END of the roll, and that name will be added to the turn order
For example:
/r d20+5 !initiative John
Will add "John" in the turn order

VERSION 1.3 CHANGES
Added support for inline rolls
*/

var InitiativeWithoutTokens = InitiativeWithoutTokens || {};

InitiativeWithoutTokens.ChatTag = "!initiative";

InitiativeWithoutTokens.PushInitiative = function (character, order, uniqueId = "-1") {
    var turnorder = (Campaign().get("turnorder") == "") ? [] : JSON.parse(Campaign().get("turnorder"));
    turnorder.push({ id: uniqueId, pr: order, custom: character });
    Campaign().set("turnorder", JSON.stringify(turnorder));
};

InitiativeWithoutTokens.AddInitiativeByRollInfo = function (rollInfo, roller) {
    if(rollInfo.rolls.length >= 2) {
        var textSplit = rollInfo.rolls[2].text.split(InitiativeWithoutTokens.ChatTag);
        if(textSplit[textSplit.length - 1] !== "") {
            roller = textSplit[textSplit.length - 1];
        }
    }
    InitiativeWithoutTokens.PushInitiative(roller, rollInfo.total);
};

on("chat:message", function(msg) {
    if(msg.content.toLowerCase().indexOf(InitiativeWithoutTokens.ChatTag) !== -1) {
        InitiativeWithoutTokens.AddInitiativeByRollInfo(JSON.parse(msg.content), msg.who);
    }
    
    if(msg.inlinerolls) {
        for (x = 0; x < msg.inlinerolls.length; ++x) {
            if(msg.inlinerolls[x] && msg.inlinerolls[x].expression.toLowerCase().indexOf(InitiativeWithoutTokens.ChatTag) !== -1 && msg.inlinerolls[x].results) {
                InitiativeWithoutTokens.AddInitiativeByRollInfo(msg.inlinerolls[x].results, msg.who);
            }
        }
    }
});

