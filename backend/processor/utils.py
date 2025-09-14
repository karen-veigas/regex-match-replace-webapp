from django.conf import settings
from openai import OpenAI
import json

client = OpenAI(api_key= settings.OPENAI_API_KEY)

def nl_str_to_regex(query: str) -> dict:
    prompt = f"""
    Analyze the following instruction and return a JSON object with strictly these three fields:
    1. column: The name of the column to target.
    2. regex: A valid Python regex that represents the data to be replaced as described by the user.
    3. replacement_str: The exact replacement string given by the user.

    User instruction: {query}
    ONLY return the JSON and nothing extra.
    """
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a regex generator. Your goal is to process a Natural Language input and convert it to a valid regex pattern. You must strictly adhere to the output format."},
            {"role": "user", "content": prompt}
        ]
    )
    # return resp.choices[0].message.content.strip()
    
    raw_output = resp.choices[0].message.content.strip()
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```")[1]
        raw_output = raw_output.replace("json", "", 1).strip()

    try:
        return json.loads(raw_output)
    except json.JSONDecodeError:
        raise ValueError(f"Invalid LLM response: {raw_output}")
