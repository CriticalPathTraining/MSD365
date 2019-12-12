function getQuerystringParameter(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

$(function () {

  var backgroundcolor = getQuerystringParameter("backgroundColor");

  if (backgroundcolor) {
    $("#tab-content").css({ "backgroundColor": backgroundcolor}); 
  }

  microsoftTeams.initialize();

  microsoftTeams.getContext(function (context) {

    console.log(context);
    // create table
    var table = $("<table>");
    AddTableRow(table, "Team Name:", context.teamName);
    AddTableRow(table, "Channel Name:", context.channelName);
    AddTableRow(table, "Team ID:", context.teamId);
    AddTableRow(table, "Channel ID:", context.channelId);
    AddTableRow(table, "Group ID:", context.groupId);
    AddTableRow(table, "Tenant ID:", context.tid);
    AddTableRow(table, "Entity ID:", context.entityId);
    AddTableRow(table, "Host Client Type:", context.hostClientType);
    AddTableRow(table, "userObjectId:", context.userObjectId);
    AddTableRow(table, "userPrincipalName:", context.userPrincipalName);
    AddTableRow(table, "loginHint:", context.loginHint);
    AddTableRow(table, "teamSiteDomain:", context.teamSiteDomain);
    AddTableRow(table, "tenantSKU:", context.tenantSKU);
    AddTableRow(table, "theme:", context.theme);
    AddTableRow(table, "locale:", context.locale);

    $("#tab-content").empty().append(table);

  });


});

function AddTableRow(table, col1, col2) {
  table.append($("<tr>")
    .append($("<td>").text(col1))
    .append($("<td>").text(col2)));
}