/*
Github:     https://github.com/NinhDo/Roll20/blob/master/InitiativeWithoutTokens.js
By:         Ninh Do
Contact:    https://app.roll20.net/users/190323/ninh
Version:    1.1

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
*/
on("chat:message", function(msg) {
    if(msg.content.toLowerCase().indexOf("!initiative") !== -1) {
        var roller = msg.who;
        var msgP = JSON.parse(msg.content);
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
