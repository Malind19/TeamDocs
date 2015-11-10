var currentUserId = "";
var currentUserLoginName = "";
var basePath = "";
var appWebUrl = "";
var hostWebUrl = "";
var appName = "teamdocs";
var documentUrl = "";

Office.initialize = function () {

    documentUrl = Office.context.document.url;

    $(document).ready(function () {
        console.log("Starting");

        // Get web urls
        basePath = window.location.toString();
        console.log(basePath);
        console.log(basePath.toLowerCase().indexOf(appName));
        basePath = basePath.substring(0, basePath.toLowerCase().indexOf(appName));
        console.log(basePath);

        appWebUrl = basePath + appName;
        console.log(appWebUrl);

        hostWebUrl = basePath.substring(0, basePath.indexOf('-')) + basePath.substring(basePath.indexOf('.'));
        console.log(hostWebUrl);

        // Get current user
        var userQueryUrl = appWebUrl + "/_api/Web/CurrentUser?$expand=groups";
        console.log(userQueryUrl);

        var currentUserCall = $.ajax({
            url: userQueryUrl,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });

        currentUserCall.done(function (data) {
            var userGroups = data.d.Groups.results;
            currentUserId = data.d.Id;
            console.log("current user id: " + currentUserId);

            currentUserLoginName = data.d.Title;
            console.log("current user login name: " + currentUserLoginName);

            // Load tasks
            var baseListUrl = appWebUrl + "/_api/web/lists/getbytitle('TaskTracker')/items"
            console.log(baseListUrl);

            console.log(currentUserId);
            var tasksAssignedToMeUrl = baseListUrl + "?$select=Id,Title,TaskStatus,TaskDescription,TaskDueDate,Priority,DocumentUrl,IsCompleted,TaskAssignees/Id,TaskAssignees/Title&$expand=TaskAssignees/Id&$filter=DocumentUrl eq '" + documentUrl + "'";
            console.log("Assigned To Me Url: " + tasksAssignedToMeUrl);

            var taskHtmlContent = "";

            $.ajax({
                url: tasksAssignedToMeUrl,
                type: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "contentType": "text/xml"
                },
                success: function (data) {
                    console.log(data);

                    $.each(data.d.results, function (index, item) {
                        var colorCode = "red";
                        var taskAssignee = item.TaskAssignees.Title;

                        console.log(item.TaskAssignees.Title);
                        console.log(item.TaskAssignees.Id);

                        if (item.Priority == "Normal") {
                            colorCode = "yellow";
                        }
                        else if (item.Priority == "Low") {
                            colorCode = "green";
                        }

                        if (item.IsCompleted) {
                            colorCode = "grey";
                        }
                        var taskDueDate = "";

                        if (item.TaskDueDate != null) {
                            taskDueDate = item.TaskDueDate.split("T")[0];
                        }

                        var currentHtml = "<table><tr><td style='background-color:" + colorCode + "; width:10px;' rowspan='3' >"
                            + "</td><td colspan='2' >" + item.Title + "</td></tr><tr><td style='width:100px'>"
                            + taskDueDate + "</td><td>" + taskAssignee + "</td></tr><tr><td style='width:100px'>"
                            + "<a href='UpdateTask.aspx?Id=" + item.Id + "'>View Task</a></td><td>"
                            + item.TaskStatus + "</td></tr></table>";

                        taskHtmlContent = taskHtmlContent + currentHtml;
                        console.log(colorCode);
                    });

                    $('#taskList').html(taskHtmlContent)
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });

        currentUserCall.fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error retrieving data: User Details");
        });

        console.log("Completed");
    });
}