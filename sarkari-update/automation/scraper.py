import hashlib
import json
import os
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

API_URL = os.getenv('API_URL', 'http://localhost:5000/api/articles/add')
API_KEY = os.getenv('API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_MODEL = 'gpt-4o-mini'
SEEN_FILE = os.path.join(os.path.dirname(__file__), 'seen_notifications.json')

client = OpenAI(api_key=OPENAI_API_KEY)

SOURCES = {
    'SSC': 'https://ssc.gov.in',
    'UPSC': 'https://upsc.gov.in',
    'RRB': 'https://indianrailways.gov.in',
    'IBPS': 'https://ibps.in',
    'NTA': 'https://nta.ac.in'
}


def load_seen_ids():
    if not os.path.exists(SEEN_FILE):
        return set()
    with open(SEEN_FILE, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return set(data)


def save_seen_ids(seen_ids):
    with open(SEEN_FILE, 'w', encoding='utf-8') as file:
        json.dump(sorted(list(seen_ids)), file, ensure_ascii=False, indent=2)


def notification_id(url, title):
    raw = f'{url}|{title}'.encode('utf-8')
    return hashlib.sha256(raw).hexdigest()


def fetch_notifications(source_name, base_url):
    notifications = []
    try:
        response = requests.get(base_url, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')
        for anchor in soup.select('a[href]')[:120]:
            text = anchor.get_text(' ', strip=True)
            if len(text) < 12:
                continue
            link = requests.compat.urljoin(base_url, anchor['href'])
            lowered = text.lower()
            if any(keyword in lowered for keyword in ['notification', 'recruitment', 'vacancy', 'exam', 'result', 'admit']):
                notifications.append({'title': text[:220], 'source': source_name, 'url': link})
        if not notifications and soup.title:
            notifications.append({'title': soup.title.text.strip()[:220], 'source': source_name, 'url': base_url})
    except Exception as exc:
        print(f'Failed to scrape {source_name}: {exc}')
    return notifications[:15]


def generate_hindi_article(notification):
    prompt = f"""
आप एक प्रोफेशनल हिंदी सरकारी नौकरी न्यूज़ लेखक हैं।
नीचे दी गई सूचना के आधार पर SEO friendly लेख तैयार करें।

सूचना विवरण:
- Source: {notification['source']}
- Raw Title: {notification['title']}
- URL: {notification['url']}

आउटपुट नियम:
1) एक आकर्षक हिंदी शीर्षक दें।
2) 300-500 शब्द का पूर्ण हिंदी लेख लिखें।
3) यदि संभव हो तो "महत्वपूर्ण तिथियां" अनुभाग जोड़ें।
4) यदि उपलब्ध हो तो "Apply Link" अनुभाग जोड़ें, वरना "आधिकारिक वेबसाइट देखें" लिखें।
5) आउटपुट JSON में दें:
{{
  "title": "...",
  "content_html": "<p>...</p><h3>महत्वपूर्ण तिथियां</h3>...",
  "last_date": "YYYY-MM-DD या खाली"
}}
"""
    completion = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0.4
    )
    text = completion.choices[0].message.content
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {
            'title': notification['title'],
            'content_html': f"<p>{text}</p>",
            'last_date': ''
        }


def post_article(notification, generated):
    payload = {
        'title': generated.get('title') or notification['title'],
        'content': generated.get('content_html', '<p>अपडेट जल्द उपलब्ध होगी।</p>'),
        'category': 'Update',
        'source': notification['source'],
        'apply_link': notification['url'],
        'last_date': generated.get('last_date') or datetime.now().strftime('%Y-%m-%d'),
        'status': 'published'
    }
    headers = {'x-api-key': API_KEY, 'Content-Type': 'application/json'}
    return requests.post(API_URL, json=payload, headers=headers, timeout=30)


def run_once():
    seen_ids = load_seen_ids()
    for source_name, source_url in SOURCES.items():
        notifications = fetch_notifications(source_name, source_url)
        for notification in notifications:
            unique_id = notification_id(notification['url'], notification['title'])
            if unique_id in seen_ids:
                continue
            generated = generate_hindi_article(notification)
            response = post_article(notification, generated)
            if response.ok:
                seen_ids.add(unique_id)
            print(f"{source_name} | {notification['title'][:60]} | {response.status_code}")
    save_seen_ids(seen_ids)


if __name__ == '__main__':
    while True:
        run_once()
        time.sleep(60 * 60 * 2)
