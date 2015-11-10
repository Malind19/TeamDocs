var taskAssigneeId = 0;
var basePath = "";
var appWebUrl = "";
var documentUrl = "";
var appName = "teamdocs";

function initializePeoplePicker(peoplePickerElementId) {

    var schema = {};
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '180px';

    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function getUserInfo() {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

    var users = peoplePicker.GetAllUserInfo();
    var userInfo = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        for (var userProperty in user) {
            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
        }
    }

    var keys = peoplePicker.GetAllUserKeys();

    getUserId(users[0].Key);
}

// Get the user ID.
function getUserId(loginName) {
    var context = new SP.ClientContext.get_current();
    this.user = context.get_web().ensureUser(loginName);
    context.load(this.user);
    context.executeQueryAsync(
         Function.createDelegate(null, ensureUserSuccess),
         Function.createDelegate(null, onFail)
    );
}

function ensureUserSuccess() {
    taskAssigneeId = this.user.get_id();

    $('#userId').html("App Web url: " + appWebUrl);

    $.ajax({
        url: appWebUrl + "/_api/contextinfo",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "contentType": "text/xml"
        },
        success: function (data) {
            requestdigest = data;
            formDigest = data.d.GetContextWebInformation.FormDigestValue;

            var taskTitle = $('#taskTitle').val();
            var taskDescription = $('#taskDescription').val();
            var taskDueDate = $('#taskdueDate').val();
            var taskPriority = $('#taskPriority').val();

            var postUrl = appWebUrl + "/_api/web/lists/GetByTitle('TaskTracker')/items";
            console.log("POST URL: " + postUrl);
            console.log("Request Digest: " + formDigest);

            $('#userId').html("Request Digest: " + formDigest);

            var item = {
                "__metadata": { "type": 'SP.Data.TaskTrackerListItem' },
                "Title": taskTitle,
                "TaskDescription": taskDescription,
                "Priority": taskPriority,
                "DocumentUrl": documentUrl,
                "TaskStatus": "Not Started",
                "TaskAssigneesId": taskAssigneeId,
                "TaskDueDate": new Date(taskDueDate).toISOString()
            };

            $('#userId').html(documentUrl);

            $.ajax({
                url: postUrl,
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(item),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    $('#userId').html(data);
                },
                error: function (data) {
                    $('#userId').html(data);
                }
            });

        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }

    });


}

function onFail(sender, args) {
    alert('Query failed. Error: ' + args.get_message());
}

Office.initialize = function () {
    $(document).ready(function () {
        initializePeoplePicker('peoplePickerDiv');

        documentUrl = Office.context.document.url;
        //$("#documentPathLabel").text(documentUrl);

        //determine the appweb url based on the window.location
        console.log("Starting");
        basePath = window.location.toString();

        console.log(basePath);
        console.log(basePath.toLowerCase().indexOf(appName));
        basePath = basePath.substring(0, basePath.toLowerCase().indexOf(appName));
        console.log(basePath);

        appWebUrl = basePath + appName;
        console.log(appWebUrl);

        var hostWebUrl = basePath.substring(0, basePath.indexOf('-')) + basePath.substring(basePath.indexOf('.'));
        console.log(hostWebUrl);

        var formDigest = "";

        console.log(formDigest);

        $("#createTaskButton").click(function () {
            getUserInfo();

        });
    });
}