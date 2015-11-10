<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink Name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <script src="https://appsforoffice.microsoft.com/lib/1/hosted/Office.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css">
    <script src="https://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" type="text/javascript"></script>
    <script src="CreateTask.js" type="text/javascript"></script>
    <style type="text/css">
        #s4-titlerow, #s4-ribbonrow, #suiteBarDelta {
            display: none !important;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            $("#taskdueDate").datepicker();
        });
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <a href="TaskViewer.html">Tasks View</a>
    <table>
        <tr>
            <td>
                <label>Title</label>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="taskTitle" required />
            </td>
        </tr>
        <tr>
            <td>
                <label>Description</label>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="taskDescription" />
            </td>
        </tr>
        <tr>
            <td>
                <label>Assignee</label>
            </td>
        </tr>
        <tr>
            <td>
                <div id="peoplePickerDiv"></div>
                <p id="userId"></p>
                <%--<div>
                    <br />
                    <input type="button" value="Get User Info" onclick="getUserInfo()"></input>
                    <br />
                    <h1>User info:</h1>
                    <p id="resolvedUsers"></p>
                    <h1>User keys:</h1>
                    <p id="userKeys"></p>
                    <h1>User ID:</h1>
                    
                </div>--%>
            </td>
        </tr>
        <tr>
            <td>
                <label>Due Date</label>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="taskdueDate" required />
            </td>
        </tr>
        <tr>
            <td>
                <label>Priority</label>
            </td>
        </tr>
        <tr>
            <td>
                <select id="taskPriority">
                    <option value="Low">Low</option>
                    <option value="Normal" selected="selected">Normal</option>
                    <option value="High">High</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>
                <button id="createTaskButton">Create Task</button>
            </td>
        </tr>
    </table>
    <label id="documentPathLabel"></label>
</asp:Content>
