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

// --- Ticket/package price lookup, matching the real prices shown on the site
// (Tickets and Details section, sponsor tier cards). The submitted form value
// differs by page: some pages send a short code ("vip"), others (expo.html's
// ticket select, index.html's exhibitor select) send the full option text
// instead, since those <option> tags have no value= attribute. Matching by
// prefix on either the code or the visible text handles both cases.
var TICKET_PRICE_RULES = [
  { test: /^ultra[-\s]?vip\b/i, label: "ULTRA VIP", price: "€749" },
  { test: /^vip\b/i, label: "VIP", price: "€399" },
  { test: /^standard\b/i, label: "Standard (Full Event)", price: "€199" }
];
// registration modal's "company type" select sends a short code (e.g. "sme");
// map it to the Bulgarian label shown in the email, same approach as tickets/packages.
var COMPANY_TYPE_LABELS = {
  "startup": "Стартъп",
  "sme": "МСП",
  "corporate": "Корпорация",
  "public": "Държавна институция",
  "ngo": "НПО",
  "other": "Друго"
};
function formatCompanyType(raw) {
  if (!raw) return "";
  return COMPANY_TYPE_LABELS.hasOwnProperty(raw) ? COMPANY_TYPE_LABELS[raw] : raw;
}
var PACKAGE_PRICE_RULES = [
  { test: /^expo\b/i, label: "Expo", price: "€1,700" },
  { test: /^silver\b/i, label: "Silver", price: "€7,500" },
  { test: /^gold\b/i, label: "Gold", price: "€12,000" },
  { test: /^stage\b/i, label: "Stage", price: "€18,000" },
  { test: /^institution\b/i, label: "Institution", price: "€30,000" }
];

function formatWithPrice(raw, rules) {
  if (!raw) return raw;
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].test.test(raw)) return rules[i].label + " - " + rules[i].price;
  }
  return raw; // unrecognized value (e.g. "Not sure yet") - show as submitted, no price
}
function formatTicketValue(raw) { return formatWithPrice(raw, TICKET_PRICE_RULES); }
function formatPackageValue(raw) { return formatWithPrice(raw, PACKAGE_PRICE_RULES); }

// --- Branded HTML email template (table-based layout, inline styles, no CSS
// variables/external assets - safe for Outlook/Gmail/etc). No templating
// engine is available in classic ASP, so this is hand-built string
// concatenation, same as the rest of this file.
function fieldRowsHtml(fields) {
  var html = "";
  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    var raw = f.value || "-";
    var displayValue = f.multiline ? nl2br(raw) : escapeHtml(raw);
    var isLast = (i === fields.length - 1);
    html += "<tr><td style='padding:16px 40px 0 40px;font-family:IBM Plex Mono,Courier New,monospace;" +
      "font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#00a0cc;'>" +
      escapeHtml(f.label) + "</td></tr>";
    var valueStyle = "padding:4px 40px " + (isLast ? "20px" : "16px") + " 40px;" +
      (isLast ? "" : "border-bottom:1px solid #EDF7FA;") +
      "font-family:Inter,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1a1a2e;";
    html += "<tr><td style='" + valueStyle + "'>" + displayValue + "</td></tr>";
  }
  return html;
}

function emailHeaderHtml(eyebrow) {
  return "<tr><td height='4' style='background-color:#00cdff;font-size:1px;line-height:1px;' bgcolor='#00cdff'>&nbsp;</td></tr>" +
    "<tr><td style='background-color:#0B3954;padding:28px 40px 22px 40px;' bgcolor='#0B3954'>" +
    "<div style='font-family:Space Grotesk,Segoe UI,Arial,sans-serif;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;'>BSTF 2026</div>" +
    "<div style='font-family:IBM Plex Mono,Courier New,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#00cdff;margin-top:6px;'>" +
    escapeHtml(eyebrow) + "</div></td></tr>";
}

function emailTitleHtml(title, sourceNote) {
  return "<tr><td style='background-color:#EDF7FA;padding:20px 40px;border-bottom:1px solid #d9e9ee;' bgcolor='#EDF7FA'>" +
    "<div style='font-family:Space Grotesk,Segoe UI,Arial,sans-serif;font-size:20px;font-weight:700;color:#0B3954;'>" +
    escapeHtml(title) + "</div>" +
    "<div style='font-family:Inter,Segoe UI,Arial,sans-serif;font-size:13px;color:#666666;margin-top:4px;'>" +
    escapeHtml(sourceNote) + "</div></td></tr>";
}

function emailFooterHtml(replyToEmail) {
  return "<tr><td style='background-color:#F5F7F9;padding:20px 40px;text-align:center;" +
    "font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#666666;border-top:1px solid #e2eef2;' bgcolor='#F5F7F9'>" +
    "Автоматично известие от формата на <span style='color:#0B3954;font-weight:600;'>bstf2026.bg</span><br>" +
    "Отговорете директно на този имейл, за да пишете на " + escapeHtml(replyToEmail) + "." +
    "</td></tr>";
}

function buildNotificationEmail(eyebrow, title, sourceNote, fields, replyToEmail) {
  var card = "<table role='presentation' width='600' cellpadding='0' cellspacing='0' border='0' " +
    "style='width:600px;max-width:600px;background-color:#FFFFFF;'>" +
    emailHeaderHtml(eyebrow) +
    emailTitleHtml(title, sourceNote) +
    fieldRowsHtml(fields) +
    emailFooterHtml(replyToEmail) +
    "</table>";
  var canvas = "<table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0' " +
    "style='background-color:#F5F7F9;'><tr><td align='center' style='padding:24px 16px;'>" +
    card + "</td></tr></table>";
  return "<!DOCTYPE html><html lang='bg'><head><meta charset='utf-8'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
    "<title>" + escapeHtml(title) + "</title>" +
    "<!--[if mso]><style type='text/css'>table {border-collapse:collapse;}</style><![endif]-->" +
    "</head><body style='margin:0;padding:0;background-color:#F5F7F9;'>" +
    canvas + "</body></html>";
}

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
  var rName = field("name"), rEmail = field("email"), rPhone = field("phone"), rTicket = field("ticket"),
      rCompanyType = field("companyType"), rPromoCode = field("promoCode"), rPromoSource = field("promoSource"),
      rPromoCompany = field("promoCompany"), rPromoDiscountPercent = field("promoDiscountPercent"),
      rPromoDiscountVisible = field("promoDiscountVisible");
  var rTicketDisplay = formatTicketValue(rTicket);
  var rCompanyTypeDisplay = formatCompanyType(rCompanyType);
  var PROMO_SOURCE_LABELS = { "url": "\u043b\u0438\u043d\u043a", "form": "\u0432\u044a\u0432\u0435\u0434\u0435\u043d \u0440\u044a\u0447\u043d\u043e" };
  var rPromoSourceDisplay = PROMO_SOURCE_LABELS.hasOwnProperty(rPromoSource) ? PROMO_SOURCE_LABELS[rPromoSource] : "";
  // Promo code is always recorded (partner attribution), even when no
  // discount was shown to the registrant - so this field is always present,
  // "-" only when no code was submitted at all.
  var rPromoDisplay = rPromoCode
    ? rPromoCode + (rPromoSourceDisplay ? " (" + rPromoSourceDisplay + ")" : "")
    : "-";
  var rPromoMatched = !!(rPromoCode && rPromoCompany);
  var rPromoCompanyDisplay = rPromoMatched ? rPromoCompany : (rPromoCode ? "\u041d\u0435\u043f\u043e\u0437\u043d\u0430\u0442 \u043a\u043e\u0434" : "-");

  // Ticket base price in EUR, keyed by the <select> value codes (standard/vip/ultra-vip),
  // so we can compute actual money - not just show a percentage.
  var TICKET_BASE_PRICES = { "standard": 199, "vip": 399, "ultra-vip": 749 };
  var rBasePrice = TICKET_BASE_PRICES.hasOwnProperty(rTicket) ? TICKET_BASE_PRICES[rTicket] : 0;
  var rPromoPct = Number(rPromoDiscountPercent) || 0;
  var rPromoVisible = rPromoDiscountVisible === "true";

  // Two distinct business models behind the same "discountPercent" number:
  // - discountVisible=true:  the BUYER gets the discount and pays less.
  // - discountVisible=false: the buyer pays FULL price; that same percentage
  //   becomes a commission owed to the partner instead.
  var rPromoTypeDisplay = "-";
  if (rPromoMatched && rPromoPct > 0) {
    if (rPromoVisible) {
      rPromoTypeDisplay = "\u041e\u0442\u0441\u0442\u044a\u043f\u043a\u0430 \u0437\u0430 \u043a\u043b\u0438\u0435\u043d\u0442\u0430 (" + rPromoPct + "%) - \u043a\u043b\u0438\u0435\u043d\u0442\u044a\u0442 \u043f\u043b\u0430\u0449\u0430 \u043f\u043e-\u043c\u0430\u043b\u043a\u043e";
      if (rBasePrice) {
        var rPaidPrice = Math.round(rBasePrice * (1 - rPromoPct / 100));
        rPromoTypeDisplay += " (\u20ac" + rPaidPrice + " \u0432\u043c\u0435\u0441\u0442\u043e \u20ac" + rBasePrice + ")";
      }
    } else {
      rPromoTypeDisplay = "\u041a\u043e\u043c\u0438\u0441\u0438\u043e\u043d\u0430 \u0437\u0430 \u043f\u0430\u0440\u0442\u043d\u044c\u043e\u0440\u0430 (" + rPromoPct + "%) - \u043a\u043b\u0438\u0435\u043d\u0442\u044a\u0442 \u043f\u043b\u0430\u0449\u0430 \u043f\u044a\u043b\u043d\u0430 \u0446\u0435\u043d\u0430";
      if (rBasePrice) {
        var rCommission = Math.round(rBasePrice * rPromoPct / 100);
        rPromoTypeDisplay += " (\u20ac" + rBasePrice + " \u043f\u043b\u0430\u0442\u0435\u043d\u0438, \u0434\u044a\u043b\u0436\u0438\u043c\u0430 \u043a\u043e\u043c\u0438\u0441\u0438\u043e\u043d\u0430: \u20ac" + rCommission + ")";
      }
    }
  }

  if (!rName || !rEmail) sendJson(false, "Missing required fields");
  if (!isValidEmail(rEmail)) sendJson(false, "Invalid email");
  replyTo = rEmail;
  subject = "BSTF 2026 - \u041d\u043e\u0432\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f: " + rName;
  textBody = "\u041d\u043e\u0432\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0437\u0430 BSTF 2026\n\n" +
    "\u0418\u043c\u0435: " + rName + "\n" +
    "\u0418\u043c\u0435\u0439\u043b: " + rEmail + "\n" +
    "\u0422\u0435\u043b\u0435\u0444\u043e\u043d: " + (rPhone || "-") + "\n" +
    "\u0422\u0438\u043f \u0431\u0438\u043b\u0435\u0442: " + (rTicketDisplay || "-") + "\n" +
    "\u0422\u0438\u043f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f: " + (rCompanyTypeDisplay || "-") + "\n" +
    "\u041f\u0440\u043e\u043c\u043e \u043a\u043e\u0434: " + rPromoDisplay + "\n" +
    "\u041f\u0430\u0440\u0442\u043d\u044c\u043e\u0440: " + rPromoCompanyDisplay + "\n" +
    "\u0422\u0438\u043f \u043d\u0430 \u043f\u0440\u043e\u043c\u043e\u0446\u0438\u044f\u0442\u0430: " + rPromoTypeDisplay;
  htmlBody = buildNotificationEmail(
    "BSTF 2026 \u00b7 \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u042f",
    "\u041d\u043e\u0432\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0437\u0430 BSTF 2026",
    "\u041d\u043e\u0432\u043e \u0437\u0430\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u043e\u0442 \u0444\u043e\u0440\u043c\u0430\u0442\u0430 \u0437\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f",
    [
      { label: "\u0418\u043c\u0435", value: rName },
      { label: "\u0418\u043c\u0435\u0439\u043b", value: rEmail },
      { label: "\u0422\u0435\u043b\u0435\u0444\u043e\u043d", value: rPhone },
      { label: "\u0422\u0438\u043f \u0431\u0438\u043b\u0435\u0442", value: rTicketDisplay },
      { label: "\u0422\u0438\u043f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f", value: rCompanyTypeDisplay },
      { label: "\u041f\u0440\u043e\u043c\u043e \u043a\u043e\u0434", value: rPromoDisplay },
      { label: "\u041f\u0430\u0440\u0442\u043d\u044c\u043e\u0440", value: rPromoCompanyDisplay },
      { label: "\u0422\u0438\u043f \u043d\u0430 \u043f\u0440\u043e\u043c\u043e\u0446\u0438\u044f\u0442\u0430", value: rPromoTypeDisplay }
    ],
    rEmail
  );
} else if (formType === "exhibitor") {
  var eCompany = field("company"), eContact = field("contact"), eEmail = field("email"),
      ePackage = field("package"), eNotes = field("notes");
  var ePackageDisplay = formatPackageValue(ePackage);
  if (!eCompany || !eContact || !eEmail) sendJson(false, "Missing required fields");
  if (!isValidEmail(eEmail)) sendJson(false, "Invalid email");
  replyTo = eEmail;
  subject = "BSTF 2026 - \u0417\u0430\u044f\u0432\u043a\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b: " + eCompany;
  textBody = "\u041d\u043e\u0432\u0430 \u0437\u0430\u044f\u0432\u043a\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b - BSTF 2026\n\n" +
    "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f: " + eCompany + "\n" +
    "\u041b\u0438\u0446\u0435 \u0437\u0430 \u043a\u043e\u043d\u0442\u0430\u043a\u0442: " + eContact + "\n" +
    "\u0418\u043c\u0435\u0439\u043b: " + eEmail + "\n" +
    "\u041f\u0430\u043a\u0435\u0442: " + (ePackageDisplay || "-") + "\n" +
    "\u0414\u043e\u043f\u044a\u043b\u043d\u0438\u0442\u0435\u043b\u043d\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f: " + (eNotes || "-");
  htmlBody = buildNotificationEmail(
    "BSTF 2026 \u00b7 \u0418\u0417\u041b\u041e\u0416\u0418\u0422\u0415\u041b",
    "\u041d\u043e\u0432\u0430 \u0437\u0430\u044f\u0432\u043a\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b - BSTF 2026",
    "\u041d\u043e\u0432\u043e \u0437\u0430\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u043e\u0442 \u0444\u043e\u0440\u043c\u0430\u0442\u0430 \u0437\u0430 \u0438\u0437\u043b\u043e\u0436\u0438\u0442\u0435\u043b",
    [
      { label: "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f", value: eCompany },
      { label: "\u041b\u0438\u0446\u0435 \u0437\u0430 \u043a\u043e\u043d\u0442\u0430\u043a\u0442", value: eContact },
      { label: "\u0418\u043c\u0435\u0439\u043b", value: eEmail },
      { label: "\u041f\u0430\u043a\u0435\u0442", value: ePackageDisplay },
      { label: "\u0414\u043e\u043f\u044a\u043b\u043d\u0438\u0442\u0435\u043b\u043d\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f", value: eNotes, multiline: true }
    ],
    eEmail
  );
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
  htmlBody = buildNotificationEmail(
    "BSTF 2026 \u00b7 \u041b\u0415\u041a\u0422\u041e\u0420",
    "\u041d\u043e\u0432\u043e \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0437\u0430 \u043b\u0435\u043a\u0442\u043e\u0440 - BSTF 2026",
    "\u041d\u043e\u0432\u043e \u0437\u0430\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u043e\u0442 \u0444\u043e\u0440\u043c\u0430\u0442\u0430 \u0437\u0430 \u043b\u0435\u043a\u0442\u043e\u0440",
    [
      { label: "\u0418\u043c\u0435", value: sName },
      { label: "\u0418\u043c\u0435\u0439\u043b", value: sEmail },
      { label: "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f/\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f", value: sCompany },
      { label: "\u0422\u0435\u043c\u0430 \u043d\u0430 \u043b\u0435\u043a\u0446\u0438\u044f\u0442\u0430", value: sTopic },
      { label: "\u0422\u0435\u043c\u0430\u0442\u0438\u0447\u0435\u043d \u043f\u043e\u0442\u043e\u043a", value: sStream },
      { label: "\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435", value: sDesc, multiline: true }
    ],
    sEmail
  );
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
  // Fail fast instead of hanging until Cloudflare/the browser gives up:
  // resolve, connect, send, receive timeouts in milliseconds.
  http.setTimeouts(5000, 5000, 10000, 15000);
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
