<%@ Language="JScript" CodePage="65001" %>
<!--#include file="resend-config.asp"-->
<%
// BSTF 2026 - form submissions -> Resend -> email notification
// Handles: register (registration modal), exhibitor (become an exhibitor modal), speaker (become a speaker modal)
// All three currently notify the same address while the project is being set up.
//
// RESEND_API_KEY comes from resend-config.asp (gitignored, not in this repo -
// see resend-config.example.asp for the template). Deploy that file manually.

Response.Buffer = true;
Response.CodePage = 65001;
Response.ContentType = "application/json";
Response.CharSet = "utf-8";
Response.CacheControl = "no-cache";

// TODO: once a domain is verified in Resend, switch this to e.g. "BSTF 2026 <noreply@bstf2026.bg>"
// "onboarding@resend.dev" is Resend's shared sandbox sender - it works before domain verification.
var FROM_EMAIL = "BSTF 2026 <onboarding@resend.dev>";

// Where every form submission is sent for now.
var TO_EMAIL = "ssabev@shopmetrics.com";

function jsonEscape(s) {
  s = String(s);
  var out = "";
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var code = s.charCodeAt(i);
    if (c === '"') out += '\\"';
    else if (c === '\\') out += '\\\\';
    else if (c === '\n') out += '\\n';
    else if (c === '\r') out += '\\r';
    else if (c === '\t') out += '\\t';
    else if (code < 0x20) out += '\\u' + ('0000' + code.toString(16)).slice(-4);
    else out += c;
  }
  return out;
}
function jsonStr(s) { return '"' + jsonEscape(s) + '"'; }

function sendJson(success, message) {
  Response.Write('{"success":' + (success ? 'true' : 'false') + ',"message":' + jsonStr(message) + '}');
  Response.End();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nl2br(s) { return escapeHtml(s).replace(/\n/g, '<br>'); }

function field(name) {
  var v = Request.Form(name);
  return v ? String(v) : "";
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

if (String(Request.ServerVariables("REQUEST_METHOD")) !== "POST") {
  Response.Status = "405 Method Not Allowed";
  sendJson(false, "Method not allowed");
}

var formType = field("formType");
var subject = "", htmlBody = "", textBody = "", replyTo = "";

if (formType === "register") {
  var rName = field("name"), rEmail = field("email"), rPhone = field("phone"), rTicket = field("ticket");
  if (!rName || !rEmail) sendJson(false, "Missing required fields");
  if (!isValidEmail(rEmail)) sendJson(false, "Invalid email");
  replyTo = rEmail;
  subject = "BSTF 2026 - \u041d\u043e\u0432\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f: " + rName;
  textBody = "\u041d\u043e\u0432\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0437\u0430 BSTF 2026\n\n" +
    "\u0418\u043c\u0435: " + rName + "\n" +
    "\u0418\u043c\u0435\u0439\u043b: " + rEmail + "\n" +
    "\u0422\u0435\u043b\u0435\u0444\u043e\u043d: " + (rPhone || "-") + "\n" +
    "\u0422\u0438\u043f \u0431\u0438\u043b\u0435\u0442: " + (rTicket || "-");
  htmlBody = "<h2>\u041d\u043e\u0432\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0437\u0430 BSTF 2026</h2>" +
    "<p><b>\u0418\u043c\u0435:</b> " + escapeHtml(rName) + "</p>" +
    "<p><b>\u0418\u043c\u0435\u0439\u043b:</b> " + escapeHtml(rEmail) + "</p>" +
    "<p><b>\u0422\u0435\u043b\u0435\u0444\u043e\u043d:</b> " + escapeHtml(rPhone || "-") + "</p>" +
    "<p><b>\u0422\u0438\u043f \u0431\u0438\u043b\u0435\u0442:</b> " + escapeHtml(rTicket || "-") + "</p>";
} else if (formType === "exhibitor") {
  var eCompany = field("company"), eContact = field("contact"), eEmail = field("email"),
      ePackage = field("package"), eNotes = field("notes");
  if (!eCompany || !eContact || !eEmail) sendJson(false, "Missing required fields");
  if (!isValidEmail(eEmail)) sendJson(false, "Invalid email");
  replyTo = eEmail;
  subject = "BSTF 2026 - \u0417\u0430\u044f\u0432\u043a\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b: " + eCompany;
  textBody = "\u041d\u043e\u0432\u0430 \u0437\u0430\u044f\u0432\u043a\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b - BSTF 2026\n\n" +
    "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f: " + eCompany + "\n" +
    "\u041b\u0438\u0446\u0435 \u0437\u0430 \u043a\u043e\u043d\u0442\u0430\u043a\u0442: " + eContact + "\n" +
    "\u0418\u043c\u0435\u0439\u043b: " + eEmail + "\n" +
    "\u041f\u0430\u043a\u0435\u0442: " + (ePackage || "-") + "\n" +
    "\u0414\u043e\u043f\u044a\u043b\u043d\u0438\u0442\u0435\u043b\u043d\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f: " + (eNotes || "-");
  htmlBody = "<h2>\u041d\u043e\u0432\u0430 \u0437\u0430\u044f\u0432\u043a\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b - BSTF 2026</h2>" +
    "<p><b>\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f:</b> " + escapeHtml(eCompany) + "</p>" +
    "<p><b>\u041b\u0438\u0446\u0435 \u0437\u0430 \u043a\u043e\u043d\u0442\u0430\u043a\u0442:</b> " + escapeHtml(eContact) + "</p>" +
    "<p><b>\u0418\u043c\u0435\u0439\u043b:</b> " + escapeHtml(eEmail) + "</p>" +
    "<p><b>\u041f\u0430\u043a\u0435\u0442:</b> " + escapeHtml(ePackage || "-") + "</p>" +
    "<p><b>\u0414\u043e\u043f\u044a\u043b\u043d\u0438\u0442\u0435\u043b\u043d\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f:</b><br>" + nl2br(eNotes || "-") + "</p>";
} else if (formType === "speaker") {
  var sName = field("name"), sEmail = field("email"), sCompany = field("company"),
      sTopic = field("topic"), sStream = field("stream"), sDesc = field("description");
  if (!sName || !sEmail || !sTopic) sendJson(false, "Missing required fields");
  if (!isValidEmail(sEmail)) sendJson(false, "Invalid email");
  replyTo = sEmail;
  subject = "BSTF 2026 - \u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0437\u0430 \u043b\u0435\u043a\u0442\u043e\u0440: " + sName;
  textBody = "\u041d\u043e\u0432\u043e \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0437\u0430 \u043b\u0435\u043a\u0442\u043e\u0440 - BSTF 2026\n\n" +
    "\u0418\u043c\u0435: " + sName + "\n" +
    "\u0418\u043c\u0435\u0439\u043b: " + sEmail + "\n" +
    "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f/\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f: " + (sCompany || "-") + "\n" +
    "\u0422\u0435\u043c\u0430 \u043d\u0430 \u043b\u0435\u043a\u0446\u0438\u044f\u0442\u0430: " + sTopic + "\n" +
    "\u0422\u0435\u043c\u0430\u0442\u0438\u0447\u0435\u043d \u043f\u043e\u0442\u043e\u043a: " + (sStream || "-") + "\n" +
    "\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435: " + (sDesc || "-");
  htmlBody = "<h2>\u041d\u043e\u0432\u043e \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0437\u0430 \u043b\u0435\u043a\u0442\u043e\u0440 - BSTF 2026</h2>" +
    "<p><b>\u0418\u043c\u0435:</b> " + escapeHtml(sName) + "</p>" +
    "<p><b>\u0418\u043c\u0435\u0439\u043b:</b> " + escapeHtml(sEmail) + "</p>" +
    "<p><b>\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f/\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f:</b> " + escapeHtml(sCompany || "-") + "</p>" +
    "<p><b>\u0422\u0435\u043c\u0430 \u043d\u0430 \u043b\u0435\u043a\u0446\u0438\u044f\u0442\u0430:</b> " + escapeHtml(sTopic) + "</p>" +
    "<p><b>\u0422\u0435\u043c\u0430\u0442\u0438\u0447\u0435\u043d \u043f\u043e\u0442\u043e\u043a:</b> " + escapeHtml(sStream || "-") + "</p>" +
    "<p><b>\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435:</b><br>" + nl2br(sDesc || "-") + "</p>";
} else {
  sendJson(false, "Unknown form type");
}

var payload = '{"from":' + jsonStr(FROM_EMAIL) +
  ',"to":[' + jsonStr(TO_EMAIL) + ']' +
  ',"reply_to":' + jsonStr(replyTo) +
  ',"subject":' + jsonStr(subject) +
  ',"html":' + jsonStr(htmlBody) +
  ',"text":' + jsonStr(textBody) +
  '}';

var resultOk = false, resultMsg = "";

try {
  var http = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0");
  http.open("POST", "https://api.resend.com/emails", false);
  http.setRequestHeader("Content-Type", "application/json");
  http.setRequestHeader("Authorization", "Bearer " + RESEND_API_KEY);
  http.send(payload);

  if (http.status >= 200 && http.status < 300) {
    resultOk = true;
    resultMsg = "OK";
  } else {
    Response.Status = "502 Bad Gateway";
    resultMsg = "Email service error (" + http.status + ")";
  }
} catch (e) {
  Response.Status = "500 Internal Server Error";
  resultMsg = "Server error: " + e.message;
}

// sendJson() calls Response.End(), which must happen after the try/catch above
// has fully resolved - calling it from inside that try block let its own
// catch(e) swallow the End() abort and re-emit a bogus second response.
sendJson(resultOk, resultMsg);
%>
