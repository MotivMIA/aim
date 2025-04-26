#!/usr/bin/env python3
import json
import re
import os
import argparse

def check_templates(branding_json_path):
    # Check if the file exists
    if not os.path.exists(branding_json_path):
        print(f"Error: {branding_json_path} not found.")
        exit(1)

    # Load branding.json
    with open(branding_json_path, 'r') as f:
        config = json.load(f)

    # Get valid keys from the "branding" section
    branding = config.get('branding', {})
    valid_keys = set(branding.keys())

    # Get templates, default to empty list if not present
    templates = config.get('templates', [])
    if not templates:
        print("No templates found in branding.json.")
        return

    # Flag to track if any invalid placeholders are found
    has_invalid = False

    # Check each template
    for template in templates:
        content = template.get('content', '')
        path = template.get('path', 'unknown')
        
        # Find all placeholders in the content
        placeholders = re.findall(r'\{[^}]+?\}', content)
        
        for ph in placeholders:
            key = ph[1:-1].strip()  # Extract the key inside { }
            
            # Check if the placeholder is invalid
            if ' ' in key or '\n' in key or key not in valid_keys:
                print(f"Invalid placeholder in {path}: {ph}")
                has_invalid = True

    # If no invalid placeholders were found, print success message
    if not has_invalid:
        print("All placeholders are valid. You can now run update_branding.py.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Check branding templates for invalid placeholders.")
    parser.add_argument('--config', default='branding.json', help="Path to branding.json")
    args = parser.parse_args()
    
    check_templates(args.config)
