<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <script src="https://appsforoffice.microsoft.com/lib/1/hosted/Office.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="UpdateTask.js" type="text/javascript"></script>
    <style type="text/css">
        #s4-titlerow, #s4-ribbonrow, #suiteBarDelta {
            display: none !important;
        }
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <a href="TaskViewer.html">Tasks View</a>
    <table>
        <tr>
            <td colspan="3">
                <div id="taskPriorityDiv"></div>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <b>
                    <label id="taskTitleLabel"></label>
                </b>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <label id="taskDescriptionLabel"></label>
            </td>
        </tr>
        <tr>
            <td>Due Date</td>
            <td>: </td>
            <td>
                <label id="taskDueDateLabel"></label>
            </td>
        </tr>
        <tr>
            <td>Assigned To</td>
            <td>: </td>
            <td>
                <label id="taskAssignedToLabel"></label>
            </td>
        </tr>
        <tr>
            <td>Created</td>
            <td>: </td>
            <td>
                <label id="taskCreatedLabel"></label>
            </td>
        </tr>
        <tr>
            <td>Created By</td>
            <td>: </td>
            <td>
                <label id="taskCreatedByLabel"></label>
            </td>
        </tr>
        <tr>
            <td>Last Comment</td>
            <td>: </td>
            <td>
                <label id="lastCommentLabel"></label>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <div id="versionHistoryDiv" ></div>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                New Comments
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <input type="text" id="newCommentsTextBox" />
            </td>
        </tr>
        <tr>
            <td>Status</td>
            <td>: </td>
            <td>
                <select id="statusSelectionBox">
                    <option value="Not Started" >Not Started</option>
                    <option value="In Progress" >In Progress</option>
                    <option value="Completed" >Completed</option>
                    <option value="Waiting on someone else" >Waiting on someone else</option>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <button id="saveChangesButton">Save Changes</button>
            </td>
        </tr>
    </table>
    <input type="hidden" id="initialStatus" />
    <input type="hidden" id="itemId" />
</asp:Content>
