import argparse
import json
import os
import re

def load_config(config_path):
    """Load configuration from a JSON file."""
    with open(config_path, 'r') as f:
        return json.load(f)

def create_template_files(branding, templates, project_root):
    """Create files from templates if they don't exist."""
    for template in templates:
        file_path = os.path.join(project_root, template["path"])
        if not os.path.exists(file_path):
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            content = template["content"].format(**branding)
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Created {file_path}")
        else:
            print(f"File {file_path} already exists, skipping creation")

def update_branding(branding, directories):
    """Update branding in existing files across specified directories."""
    for directory in directories:
        for root, _, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                if file.endswith('.html'):
                    update_html(file_path, branding)
                elif file.endswith('.py'):
                    update_python(file_path, branding)
                elif file.endswith('.css'):
                    update_css(file_path, branding)
                elif file.endswith('.txt'):
                    update_text(file_path, branding)

def update_html(file_path, branding):
    """Update HTML files with new branding elements."""
    with open(file_path, 'r') as f:
        content = f.read()
    new_content = content
    new_content = re.sub(r'<title>.*?</title>', f'<title>{branding["project_name"]}</title>', new_content)
    new_content = re.sub(r'<h1>.*?</h1>', f'<h1>{branding["project_name"]}</h1>', new_content)
    new_content = re.sub(r'src="assets/images/logo\.png"', f'src="{branding["logo_path"]}"', new_content)
    if "risk-warning" not in new_content:
        new_content = new_content.replace('</body>', f'<div class="risk-warning">{branding["risk_warning"]}</div></body>')
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")

def update_python(file_path, branding):
    """Update Python files with new branding variables."""
    with open(file_path, 'r') as f:
        content = f.read()
    new_content = content
    new_content = re.sub(r'project_name\s*=\s*".*?"', f'project_name = "{branding["project_name"]}"', new_content)
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")

def update_css(file_path, branding):
    """Update CSS files with new color variables."""
    with open(file_path, 'r') as f:
        content = f.read()
    new_content = content
    new_content = re.sub(r'--primary-color:\s*#.*?;', f'--primary-color: {branding["primary_color"]};', new_content)
    new_content = re.sub(r'--secondary-color:\s*#.*?;', f'--secondary-color: {branding["secondary_color"]};', new_content)
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")

def update_text(file_path, branding):
    """Update text files by replacing old project name with new one."""
    with open(file_path, 'r') as f:
        content = f.read()
    new_content = content.replace("MNX Coin", branding["project_name"])
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")

def main():
    parser = argparse.ArgumentParser(description="Update branding and create files across project.")
    parser.add_argument('--config', default=os.path.expanduser('~/Documents/AIM/branding.json'),
                        help="Path to branding config file")
    args = parser.parse_args()

    config = load_config(args.config)
    project_root = os.path.dirname(args.config)
    branding = config["branding"]
    templates = config.get("templates", [])
    directories = [os.path.join(project_root, d) for d in config.get("directories", [])]

    if templates:
        create_template_files(branding, templates, project_root)

    if directories:
        update_branding(branding, directories)

    print("Branding updated and files created. Please review changes with 'git diff' and commit if satisfied.")

if __name__ == "__main__":
    main()
