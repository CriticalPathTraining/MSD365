
var baseUrl = "https://" + document.location.host;
var dynamicPageUrl = baseUrl + "/DynamicTab.html";

console.log("dynamicPageUrl: " + dynamicPageUrl);

microsoftTeams.initialize();
microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {

  var radios = document.getElementsByName("backgroundColor");
  if (radios[0].checked) {

    microsoftTeams.settings.setSettings({
      entityId: "cptteamstabs.bluepage",
      contentUrl: dynamicPageUrl + "?backgroundColor=lightblue",
      suggestedTabName: "Blue Page",
      removeUrl: baseUrl + "/RemoveTab.html"
    });
  } else {
    microsoftTeams.settings.setSettings({
      entityId: "cptteamstabs.greenpage",
      contentUrl: dynamicPageUrl + "?backgroundColor=lightgreen",
      suggestedTabName: "Green Page",
      removeUrl: baseUrl + "/RemoveTab.html"
    });
  }

  saveEvent.notifySuccess();
});

function onSelectColor() {
  microsoftTeams.settings.setValidityState(true);
}