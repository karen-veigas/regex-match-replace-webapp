from django.conf import settings
from openai import OpenAI

client = OpenAI(api_key= settings.OPENAI_API_KEY)

def nl_str_to_regex(query: str) -> str:
    prompt = f"Convert this into a valid Python regex: {query}."
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a regex generator. Your goal is to receive a Natural Language input and convert it to a valid regex pattern. You must only return the regex."},
            {"role": "user", "content": prompt}
        ]
    )
    return resp.choices[0].message.content.strip()
