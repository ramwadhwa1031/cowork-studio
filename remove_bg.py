from PIL import Image
import os

# Process both logo files
logos = [
    ("pics/logo-banner.jpeg", "pics/logo-banner.png"),
    ("pics/logo.jpeg", "pics/logo.png"),
]

for src, dst in logos:
    if not os.path.exists(src):
        print(f"Skipping {src} - file not found")
        continue
    
    img = Image.open(src).convert("RGBA")
    
    # Crop out 5 pixels from all edges to remove faint border compression artifacts
    width, height = img.size
    img = img.crop((5, 5, width - 5, height - 5))
    
    data = img.getdata()
    
    new_data = []
    # More aggressive threshold to kill compression artifacts
    threshold = 200
    
    for pixel in data:
        r, g, b, a = pixel
        if r > threshold and g > threshold and b > threshold:
            # Make anything light grey/white completely transparent
            new_data.append((r, g, b, 0))
        else:
            new_data.append(pixel)
    
    img.putdata(new_data)
    img.save(dst, "PNG")
    print(f"Saved transparent logo: {dst}")

print("Done!")
