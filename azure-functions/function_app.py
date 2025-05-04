import azure.functions as func
from azure.functions import FunctionApp
import logging
import requests
import json

app = FunctionApp()

@app.function_name(name="fetch-mails")
@app.route(route="fetch-mails", auth_level=func.AuthLevel.ANONYMOUS, methods=["POST"])
def fetch_mails(req: func.HttpRequest) -> func.HttpResponse:
    try:
        raw_token = req.headers.get("Authorization")
        if not raw_token or not raw_token.startswith("Bearer "):
            return func.HttpResponse("アクセストークンがありません", status_code=401)

        access_token = raw_token.replace("Bearer ", "")
        logging.info("🔐 access_token を受け取りました")

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Prefer": 'outlook.body-content-type="text"'
        }
        url = "https://graph.microsoft.com/v1.0/me/mailFolders/Inbox/messages?$filter=isRead eq false"
        res = requests.get(url, headers=headers)

        if res.status_code != 200:
            logging.error(f"Graph API error: {res.status_code} - {res.text}")
            return func.HttpResponse(
                f"Graph API error: {res.status_code}\n{res.text}",
                status_code=res.status_code
            )

        mails = res.json().get("value", [])
        simplified = [
            {
                "subject": mail.get("subject"),
                "body": mail.get("body", {}).get("content")
            }
            for mail in mails
        ]

        return func.HttpResponse(
            json.dumps(simplified, ensure_ascii=False),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        logging.error(f"❌ エラー: {str(e)}")
        return func.HttpResponse(f"Internal error: {str(e)}", status_code=500)
