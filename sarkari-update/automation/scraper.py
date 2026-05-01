import os, hashlib, datetime, requests, mysql.connector
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SOURCES = [
    "https://ssc.gov.in",
    "https://upsc.gov.in",
    "https://indianrailways.gov.in",
    "https://ibps.in",
    "https://nta.ac.in"
]

def db_conn():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"), port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER"), password=os.getenv("DB_PASSWORD"), database=os.getenv("DB_NAME")
    )

def scrape_headlines(url):
    try:
        r = requests.get(url, timeout=20)
        soup = BeautifulSoup(r.text, "html.parser")
        items = []
        for a in soup.select("a")[:80]:
            text = (a.get_text() or "").strip()
            href = a.get("href") or url
            if len(text) > 30:
                items.append({"title": text[:200], "link": href if href.startswith("http") else url})
        return items[:5]
    except Exception:
        return []

def gen_article(title, link):
    prompt = f"""तुम एक सरकारी नौकरी पोर्टल एडिटर हो।
इस नोटिफिकेशन पर 300-500 शब्दों का हिंदी लेख लिखो:
शीर्षक: {title}
लिंक: {link}
आउटपुट JSON दो: {{"title":"...","content":"...","apply_link":"...","last_date":null}}"""
    out = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}],
        response_format={"type":"json_object"}
    )
    import json
    return json.loads(out.choices[0].message.content)

def save_article(item):
    uid = hashlib.sha256((item["title"] + item.get("apply_link","" )).encode()).hexdigest()
    slug = item["title"].lower().replace(" ", "-")[:240]
    conn = db_conn(); cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS scraper_logs (id INT AUTO_INCREMENT PRIMARY KEY, uid VARCHAR(64) UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")
    cur.execute("SELECT id FROM scraper_logs WHERE uid=%s", (uid,))
    if cur.fetchone():
        conn.close(); return False
    cur.execute("INSERT INTO articles(title,slug,content,source,apply_link,last_date,status,created_at) VALUES(%s,%s,%s,%s,%s,%s,'published',%s)", (
        item["title"], slug, item["content"], "auto-scraper", item.get("apply_link"), item.get("last_date"), datetime.datetime.utcnow()
    ))
    cur.execute("INSERT INTO scraper_logs(uid) VALUES(%s)", (uid,))
    conn.commit(); conn.close(); return True

if __name__ == "__main__":
    for src in SOURCES:
        for n in scrape_headlines(src):
            data = gen_article(n["title"], n["link"])
            ok = save_article(data)
            print("saved" if ok else "skip", data.get("title"))
