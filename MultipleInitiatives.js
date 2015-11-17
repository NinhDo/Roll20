/*
Github:     https://github.com/NinhDo/Roll20/blob/master/MultipleInitiatives.js
By:         Ninh Do
Contact:    https://app.roll20.net/users/190323/ninh
Version:    1.0
#########################
Multiple Initiatives
#########################

To be used with InitiativeWithoutTokens.js (https://github.com/NinhDo/Roll20/blob/master/InitiativeWithoutTokens.js)

Use by entering !multiInit followed by either the name, amount of times, or modifier for the roll. The modifier of the roll must have text before saying "mod"
For example, I want to add 10 John Doe's with a modifier of 5:
!multiInit John Doe mod 5 10
OR
!multiInit mod 5 John Doe 10
OR 
!multiInit mod 5 10 John Doe
OR 
!multiInit mod 5 John 10 Doe

The script is smart enough to find out where the modifier is and how many times it is supposed to roll
*/

on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!multiInit ") !== -1) {
        var content = msg.content;
        var textSplit = content.split(" ");
        var mod = 0;
        var times = 1;
        var name = "";
        
        for(var a = 1; a < textSplit.length; a++) {
            try {
                if(textSplit[a - 1].toLowerCase() == "mod") {
                    mod = parseInt(textSplit[a]);
                    if(mod > 0) break;
                }
            } catch (e) { continue; }
        }
        
        for(var i = 1; i < textSplit.length; i++) {
            if (i == a) continue;
            try {
                var times = parseInt(textSplit[i]);
                if(times > 0) {
                    break;
                }
            } catch (e) { continue; }
        }
        
        for(var n = 1; n < textSplit.length; n++) {
            if(n == a || n == a - 1 || n == i) continue;
            name += textSplit[n] + "-";
        }
        
        if(!(mod >= 0)) mod = 0;
        
        if(times > 1) {
            for(var m = 1; m <= times; m++) {
                sendChat(msg.who, "/roll 1d20 + " + mod + " !initiative " + name + m);
            }
        } else {
                sendChat(msg.who, "/roll 1d20 + " + mod + " !initiative " + name);
        }
    }
});
