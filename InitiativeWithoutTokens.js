/*
Github:     https://github.com/NinhDo/Roll20/blob/master/InitiativeWithoutTokens.js
By:         Ninh Do
Contact:    https://app.roll20.net/users/190323/ninh

#########################
Initiative without tokens
#########################

Use by typing "!initiative" in chat, followed by the modifier. No modifier is counted as a 0.
I reccomend making a macro prompting the user to add their modifier:
    !initiative ?{Initiative(DEX|0)}

Examples on how this script works:
!initiative -> rolls 1d20 and adds it to the turn order
!initiative 4 -> rolls 1d20+4 and adds it to the turn order
*/
on("chat:message", function(msg) {
    if(msg.type !== "api") {
        return;
    }
    var roller = msg.who;
    var splitMsg = msg.content.split(" ");
    var command = splitMsg[0];
    // Modifier is 0 if no number is added after the command
    var modifier = (splitMsg[1] != null) ? splitMsg[1] : 0;
    var string = "[[d20+" + modifier + "]]";
    if(command == "!initiative") {
        sendChat(roller, string, function(ops) {
            var rollResults = ops[0];
            var rollValue = rollResults.inlinerolls[1].results.total;
            var turnorder = (Campaign().get("turnorder") == "") ? [] : JSON.parse(Campaign().get("turnorder"));
            turnorder.push({
                id: "-1",
                pr: rollValue,
                custom: roller
            });
            Campaign().set("turnorder", JSON.stringify(turnorder));
            // Writes the result to chat
            sendChat(roller, "/me rolling for initiative: " 
                + rollResults.inlinerolls[1].expression + " = " 
                + rollValue + " (" + rollResults.inlinerolls[1].results.rolls[0].results[0].v 
                + rollResults.inlinerolls[1].results.rolls[1].expr + ")");
        })
    }
});
