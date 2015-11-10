var appName = "teamdocs";

$(document).ready(function () {
    console.log("Starting");

    var itemId = getParameterByName('Id');
    console.log(itemId);

    // TO DO: If item id is null, return to all tasks

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

        // Load task
        var baseListUrl = appWebUrl + "/_api/web/lists/getbytitle('TaskTracker')/items(" + itemId + ")?$select=Id,TaskStatus,Created,UserComments,Title,TaskDescription,TaskDueDate,Priority,DocumentUrl,IsCompleted,TaskAssignees/Id,TaskAssignees/Title,Author/Id,Author/Title&$expand=TaskAssignees/Id&$expand=Author/Id"

        $.ajax({
            url: baseListUrl,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "contentType": "text/xml"
            },
            success: function (data) {
                console.log(data);

                var colorCode = "red";

                if (data.d.Priority == "Normal") {
                    colorCode = "yellow";
                }
                else if (data.d.Priority == "Low") {
                    colorCode = "green";
                }

                if (data.d.IsCompleted) {
                    colorCode = "grey";
                }

                var taskDueDate = "";

                if (data.d.TaskDueDate != null) {
                    taskDueDate = data.d.TaskDueDate.split("T")[0];
                }

                var taskCreated = data.d.Created.split("T")[0];

                $('#taskDueDateLabel').text(taskDueDate)
                $('#taskTitleLabel').text(data.d.Title)
                $('#taskDescriptionLabel').text(data.d.TaskDescription)
                $('#taskAssignedToLabel').text(data.d.TaskAssignees.Title)
                $('#taskCreatedLabel').text(taskCreated)
                $('#taskCreatedByLabel').text(data.d.Author.Title)
                $('#lastCommentLabel').text(data.d.UserComments)
                $('#initialStatus').val(data.d.TaskStatus)
                $('#itemId').val(itemId)
                $('#statusSelectionBox').val(data.d.TaskStatus)

                var taskStatus = data.d.TaskStatus;

                if (taskStatus == "Completed") {
                    $("#statusSelectionBox").attr("disabled", "disabled");
                    $("#newCommentsTextBox").attr("disabled", "disabled");
                    $("#saveChangesButton").attr("disabled", "disabled");
                }

                var versionHistoryDivContent = "<a href='https://malin-d4e9beb771623c.sharepoint.com/TeamDocs/_layouts/15/Versions.aspx?list={C682EBA3-5157-4AE3-90D4-417BD440B27F}&ID=" + itemId + "&IsDlg=1' target='_blank'>Version History</a>";
                $('#versionHistoryDiv').html(versionHistoryDivContent)

            }
        });

        console.log("Completed");

        $("#saveChangesButton").click(function () {
            var userComments = $('#newCommentsTextBox').val();
            var currentStatus = $('#statusSelectionBox').val();
            var oldStatus = $('#initialStatus').val();
            var itemId = $('#itemId').val();

            var itemProperties = {};

            console.log(userComments);

            if (userComments != null) {
                itemProperties["UserComments"] = userComments;
            }
            if (oldStatus != currentStatus) {
                itemProperties["TaskStatus"] = currentStatus;

                if (currentStatus == "Completed") {
                    itemProperties["IsCompleted"] = true;
                }
            }

            updateListItem(appWebUrl, "TaskTracker", itemId, itemProperties)
        });
    });

    function updateListItem(webUrl, listTitle, listItemId, itemProperties) {
        var listItemUri = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + listItemId + ")";
        var itemPayload = {
            '__metadata': { "type": 'SP.Data.TaskTrackerListItem' }
        };
        for (var prop in itemProperties) {
            itemPayload[prop] = itemProperties[prop];
        }
        updateJson(listItemUri, itemPayload);
    }

    function updateJson(endpointUri, payload) {
        $.ajax({
            url: endpointUri,
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "MERGE",
                "If-Match": "*"
            },
            success: function (data) {
                console.log("Item updated.");
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});