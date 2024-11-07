model.biomes.push('bz_luna')
model.biomes.push('bz_ice')
model.biomes.push('bz_lava')
model.biomes.push('bz_mountain')


function ChatMessageViewModel(name, type  /* 'invalid' | 'lobby' | 'server' */, payload) {
  var self = this;

  self.username = ko.observable(name);
  self.type = type; /* 'invalid' | 'lobby' | 'server' */
  self.payload = ko.observable(payload);
}

model.localChatMessageAdvisory = function (name, message) {
  model.chatMessages.push(new ChatMessageViewModel(name, 'settings', message));
};

model.localChatMessageWarning = function (name, message) {
  model.chatMessages.push(new ChatMessageViewModel(name, 'settings', message));
};


var bzNewGameLoaded;

if (!bzNewGameLoaded) {
  bzNewGameLoaded = true;

  function bzNewGame() {
    try {
      var bzOverhaulEnabled = false;

      model.enableBz = function () {
        if (bzOverhaulEnabled) {
          return;
        }

        bzOverhaulEnabled = true;

        var newBuild = _.isFunction(model.aiPersonalities);

        var aiPersonalities = newBuild
          ? model.aiPersonalities()
          : model.aiPersonalities;

        if (newBuild) {
          model.aiPersonalities.valueHasMutated();
        } else {
          model.aiPersonalityNames(_.keys(aiPersonalities));
        }

        model.bzClientModLoaded = ko.observable(false);

        model.bzDoNotShowWelcome = ko
          .observable(false)
          .extend({ local: "bz_welcome_dontshow" });

        model.bzToggleDoNotShowWelcome = function () {
          model.bzDoNotShowWelcome(!model.bzDoNotShowWelcome());
        };

        model.bzUrlClicked = function (data, event) {
          if (_.has(event, "target.href")) {
            model.bzOpenUrl(event.target.href);
          }
        };

        model.bzOpenUrl = function (url) {
          engine.call("web.launchPage", url);
        };

        model.bzCloseWelcome = function () {
          $("#bz-welcome").fadeOut();
          $("body").off("keypress", model.bzCloseWelcome);
        };

        model.bzShowWelcome = function () {
          $("body").on("keypress", model.bzCloseWelcome);
          $("#bz-welcome").delay(1000).fadeIn();
        };

        //bz commander picker colouring
        loadCSS(
          "coui://ui/mods/com.pa.bz-overhaul/css/bz_faction_commander_picker.css"
        );

        //bz welcome screen
        loadCSS("coui://ui/mods/com.pa.bz-overhaul/css/welcome.css");
        $("body").append(
          loadHtml(
            "coui://ui/mods/com.pa.bz-overhaul/new_game/welcome.html"
          )
        );

        api.mods.getMounted("client").then(function (mods) {
          var bzClientLoaded =
            _.intersection(_.pluck(mods, "identifier"), [
              "com.pa.bz-overhaul-client",
              "com.pa.bz-overhaul-client-dev",
            ]).length > 0;

          model.bzClientModLoaded(bzClientLoaded);

          if (!bzClientLoaded) {
            if (model.registerHoldReady) {
              model.registerHoldReady(
                "com.pa.bz-overhaul-client",
                "Battlezone Client Mod Missing"
              );
            }
            if (model.localChatMessage) {
              model.localChatMessage(
                "Battlezone: RTS Tactics Overhaul",
                "Battlezone: RTS Tactics Overhaul client mod is not installed!"
              );
            }
          }

          if (!model.bzDoNotShowWelcome() && !model.returnFromLoad()) {
            model.bzShowWelcome();
          }
        });

        loadScript("coui://ui/mods/com.pa.bz-overhaul/common.js");

        model.isNSDF = function (commander) {

          return _.includes(nsdfCommanders, commander);
        };

        model.isCCA = function (commander) {

          return _.includes(ccaCommanders, commander);
        }

        model.isCustomFaction = function (commander) {
          return (model.isNSDF(commander) || model.isCCA(commander))
        }

        //Style Commander Picker bz
        $("#commander-picker .div-commander-picker-item.btn_std_ix").attr(
          "data-bind",
          "css: {nsdfCommander: model.isNSDF($data), ccaCommander: model.isCCA($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'"
        );
        $("#ai-commander-picker .div-commander-picker-item.btn_std_ix").attr(
          "data-bind",
          "css: {nsdfCommander: model.isNSDF($data), ccaCommander: model.isCCA($data)}, click: function () { model.setAICommander(model.selectedAI(), $data) }, click_sound: 'default', rollover_sound: 'default'"
        );

        //Style Slot bz
        $(".slot-player").attr(
          "data-bind",
          "css: {nsdfSlot: !$data.isEmpty() && model.isNSDF($data.commander()), ccaSlot: !$data.isEmpty() && model.isCCA($data.commander()), mlaslot: !$data.isEmpty() && !model.isCustomFaction($data.commander()), ready: isReady, loading: isLoading}"
        );
      };

      if (
        _.intersection(model.gameModIdentifiers(), [
          "com.pa.bz-overhaul-server",
          "com.pa.bz-overhaul-server-dev",
        ]).length > 0
      ) {
        model.enableBz();
      }

      _.defer(function () {
        model.localChatMessage(
          loc("!LOC:Battlezone: RTS Tactics (Server)"),
          loc("!LOC:As this is an overhaul only NSDF and CCA factions are recommened to be played against eachother, and have not been balanced against PA factions. To play NSDF select commanders highlighted in blue. To play CCA select commanders highlighted in red.")
        );
      });

      _.defer(function () {
        model.localChatMessage(
          loc("!LOC:Battlezone: RTS Tactics (Server)"),
          loc("")
        );
      });
      _.defer(function () {
        model.localChatMessageWarning(
          loc("!LOC:Battlezone: RTS Tactics (Server)"),
          loc("!LOC:[Advisory] You will need to download the audio to get the intended experience for this mod. If you have not done so please head to the main menu and click the download audio button.")
        );
      });

      _.defer(function () {
        model.localChatMessage(
          loc("!LOC:Battlezone: RTS Tactics (Server)"),
          loc("")
        );
      });
      _.defer(function () {
        model.localChatMessageAdvisory(
          loc("!LOC:Battlezone: RTS Tactics (Server)"),
          loc("!LOC:[Advisory] It is highly recommended to play with maps that have the prefix [BZ] at the start as these have been made and balanced for this mod.")
        );
      });
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  bzNewGame();
}

var bzLearnMoreOnSteam = function () {
  engine.call('web.launchPage', 'https://steamcommunity.com/app/386070/discussions/0/4703538708010312949');
}

var bzDiscussOnPatreon = function () {
  engine.call('web.launchPage', 'https://www.patreon.com/tristanashlin');
}











