from PIL import Image
import os
import glob

def convert_to_webp(folder_path):
    # Find all jpeg, jpg, png files
    patterns = ['*.jpeg', '*.jpg', '*.png']
    files_to_convert = []
    
    for pattern in patterns:
        files_to_convert.extend(glob.glob(os.path.join(folder_path, pattern)))
        
    print(f"Found {len(files_to_convert)} images to process.")
    
    for file_path in files_to_convert:
        filename = os.path.basename(file_path)
        name, ext = os.path.splitext(filename)
        
        # Don't convert favicon.ico if it exists, or maybe skip logo if it needs exact alpha, 
        # but webp supports alpha.
        webp_path = os.path.join(folder_path, f"{name}.webp")
        
        # Skip if already exists and is webp
        if ext.lower() == '.webp':
            continue
            
        try:
            img = Image.open(file_path)
            # Save as webp with 80 quality for good compression/quality ratio
            img.save(webp_path, 'webp', quality=80)
            print(f"Converted: {filename} -> {name}.webp")
            
            # Optionally, we could remove the old files, but let's keep them as backups for now
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    convert_to_webp("pics")
