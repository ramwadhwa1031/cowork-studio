import os
import glob

def replace_in_files():
    html_files = glob.glob('*.html')
    css_files = glob.glob('*.css')
    all_files = html_files + css_files
    
    for file_path in all_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace .jpeg and .jpg and .png with .webp, but only in the pics/ directory
        # Be careful with the icon link which is currently .png
        new_content = content.replace('.jpeg', '.webp').replace('.jpg', '.webp').replace('logo-banner.png', 'logo-banner.webp').replace('logo.png', 'logo.webp')
        
        # Write back if changed
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_path}")

if __name__ == "__main__":
    replace_in_files()
