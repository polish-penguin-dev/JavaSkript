//Custom Join Message
skript.on("join", () => {
    skript.setJoinMessage("§l%player% Joined The Server! Say Hi!");
    skript.sendMessagePlayer("Welcome to our Server!", "%player%");
});

