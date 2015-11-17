/*
Github:     https://github.com/NinhDo/Roll20/blob/master/InitiativeWithoutTokens.js
By:         Ninh Do
Contact:    https://app.roll20.net/users/190323/ninh
Version:    1.2

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
*/
on("chat:message", function(msg) {
    if(msg.content.toLowerCase().indexOf("!initiative") !== -1) {
        var msgP = JSON.parse(msg.content);
        var text = msgP.rolls[2].text;
        var textSplit = text.split(" ");
        var roller = (textSplit[textSplit.length - 1].toLowerCase() == "!initiative")?msg.who:textSplit[textSplit.length - 1];
        log(roller);
        var turnorder = (Campaign().get("turnorder") == "") ? [] : JSON.parse(Campaign().get("turnorder"));
        turnorder.push({
            id: "-1",
            pr: msgP.total,
            custom: roller
        });
        Campaign().set("turnorder", JSON.stringify(turnorder));
    } else {
        return;
    }
});
