//JavaSkript Functionality Showcase
skript.on("load", () => {
    skript.broadcast("JavaSkript Sample Skript Enabled.");
});

skript.on("right click", () => {
    skript.isBlockA("furnace"); //If Not, It Returns
    skript.entityHasItem("player", 1, "raw chicken"); //Must Have 1 Raw Chicken; If Not, Returns
    skript.entityIs("player", "sneaking"); //Must Sneak; If Not, Returns

    skript.entityRemoveItem(1, "raw chicken", "player"); //Removes 1 Raw Chicken
    skript.entityGiveItem("player", 1, "cooked chicken"); //Gives 1 Cooked Chicken
    skript.sendMessagePlayer("You Got A Cooked Chicken!", "player"), skript.sendMessageConsole("%player% Obtained Cooked Chicken.")
});

skript.on("right click", () => {
    skript.isBlockA("lodestone");
    skript.createExplosion(20, "targeted block");
});

skript.loopEverySecond(30, () => {
    skript.broadcast("[TIP] Please Take A Shower Immediately.");
});

skript.on("join", () => {
    skript.playSound("block.note_block.pling", 1, 2, "player"); //Play 'pling' At Vol. 1, Pitch 2, For Player
    skript.entityWalkSpeed("player", 10);
    skript.sendMessagePlayer("Rats. And rats make him crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy.", "player");
});

skript.on("quit", () => {
    skript.setLeaveMessage("%player% Left Because They Are Big DooDoo Head.");
});

skript.on("damage", () => {
    skript.sendMessagePlayer("You Damaged %victim%", "attacker");
    skript.entityIs("victim", "pig"); //If Not, Return

    skript.damageEntity("attacker", 4);
    skript.healEntity("victim", 10);
});

skript.on("damage", () => {
    skript.entityIs("victim", "creeper"); //If Not, Return

    skript.entityGiveItem("attacker", 64, "diamond blocks");
    skript.executeCommandConsole("effect give %attacker% levitation infinite 255 true");
});