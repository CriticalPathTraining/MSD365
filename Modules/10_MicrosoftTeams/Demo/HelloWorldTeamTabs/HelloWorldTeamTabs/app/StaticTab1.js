$(function () {


  microsoftTeams.initialize();

  microsoftTeams.getContext(function (context) {

    console.log(context);

    var table = $("<table>")
      .append($("<tr>").append($("<td>").text("Team Name:")).append($("<td>").text(context.teamName)))
      .append($("<tr>").append($("<td>").text("Team Id:")).append($("<td>").text(context.teamId)))
      .append($("<tr>").append($("<td>").text("channel Id:")).append($("<td>").text(context.channelId)))
      .append($("<tr>").append($("<td>").text("channel Name:")).append($("<td>").text(context.channelName)))
      .append($("<tr>").append($("<td>").text("locale:")).append($("<td>").text(context.locale)))
      .append($("<tr>").append($("<td>").text("entityId:")).append($("<td>").text(context.entityId)))
      .append($("<tr>").append($("<td>").text("groupId:")).append($("<td>").text(context.groupId)))
      .append($("<tr>").append($("<td>").text("hostClientType:")).append($("<td>").text(context.hostClientType)))
      .append($("<tr>").append($("<td>").text("teamSiteDomain:")).append($("<td>").text(context.teamSiteDomain)))
      .append($("<tr>").append($("<td>").text("teamSitePath:")).append($("<td>").text(context.teamSitePath)))
      .append($("<tr>").append($("<td>").text("teamSiteUrl:")).append($("<td>").text(context.teamSiteUrl)))
      .append($("<tr>").append($("<td>").text("userPrincipalName:")).append($("<td>").text(context.userPrincipalName)))
      .append($("<tr>").append($("<td>").text("userObjectId:")).append($("<td>").text(context.userObjectId)));

    $("#tab-content").empty().append(table);


  });








});