$(function () {

  microsoftTeams.initialize();

  microsoftTeams.getContext(function (context) {
    console.log(context);
    // create table
    var table = $("<table>");
    AddTableRow(table, "entityId:", context.entityId);
    AddTableRow(table, "appSessionId:", context.appSessionId);
    AddTableRow(table, "tid:", context.tid);
    AddTableRow(table, "userObjectId:", context.userObjectId);
    AddTableRow(table, "userPrincipalName:", context.userPrincipalName);
    AddTableRow(table, "loginHint:", context.loginHint);
    AddTableRow(table, "teamSiteDomain:", context.teamSiteDomain);
    AddTableRow(table, "tenantSKU:", context.tenantSKU);
    AddTableRow(table, "hostClientType:", context.hostClientType);
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