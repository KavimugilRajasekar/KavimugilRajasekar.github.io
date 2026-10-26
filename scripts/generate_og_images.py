import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = "assets/images"
PROFILE_PATH = os.path.join(OUTPUT_DIR, "profile.jpg")
ROUINT_PATH = os.path.join(OUTPUT_DIR, "projects", "rouint.png")

def get_fonts():
    try:
        font_badge = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 22)
        font_mono = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 20)
        font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 44)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 23)
        font_footer = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 22)
    except Exception as e:
        print("Font load warning:", e)
        font_badge = font_mono = font_title = font_sub = font_footer = ImageFont.load_default()
    return font_badge, font_mono, font_title, font_sub, font_footer

def create_card(badge_text, title_lines, sub_lines, output_filename, side_image_path=None, badge_color=(158, 255, 191), fit_contain=False):
    W, H = 1200, 630
    bg_color = (20, 44, 32)
    grid_color = (32, 64, 48)
    
    img = Image.new("RGB", (W, H), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Grid background
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)
        
    # Hairline blueprint frame
    p = 36
    draw.rectangle([p, p, W - p, H - p], outline=(158, 255, 191), width=2)
    
    # Corner pluses
    plus_len = 12
    for cx, cy in [(p, p), (W - p, p), (p, H - p), (W - p, H - p)]:
        draw.line([(cx - plus_len, cy), (cx + plus_len, cy)], fill=(158, 255, 191), width=2)
        draw.line([(cx, cy - plus_len), (cx, cy + plus_len)], fill=(158, 255, 191), width=2)
        
    font_badge, font_mono, font_title, font_sub, font_footer = get_fonts()
    
    # Draw badge/pill top left
    badge_x, badge_y = p + 30, p + 30
    bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    draw.rectangle([badge_x, badge_y, badge_x + tw + 24, badge_y + th + 14], fill=(26, 60, 43), outline=badge_color, width=2)
    draw.text((badge_x + 12, badge_y + 5), badge_text, fill=badge_color, font=font_badge)
    
    # Draw Left Content
    curr_y = badge_y + th + 40
    
    # Title lines
    for line in title_lines:
        draw.text((p + 30, curr_y), line, fill=(247, 247, 245), font=font_title)
        curr_y += 56
        
    curr_y += 10
    
    # Subtitle lines
    for line in sub_lines:
        draw.text((p + 30, curr_y), line, fill=(185, 205, 195), font=font_sub)
        curr_y += 34
        
    # Domain Footer at bottom
    footer_text = "https://kavimugilrajasekar.github.io"
    draw.text((p + 30, H - p - 45), footer_text, fill=(158, 255, 191), font=font_footer)

    # Right side image embedding (if provided)
    if side_image_path and os.path.exists(side_image_path):
        try:
            side_img = Image.open(side_image_path).convert("RGBA")
            target_w = 340
            target_h = 440
            
            side_x = W - p - target_w - 30
            side_y = (H - target_h) // 2
            
            # Container card background
            draw.rectangle([side_x - 4, side_y - 4, side_x + target_w + 4, side_y + target_h + 4], fill=(26, 60, 43), outline=(158, 255, 191), width=2)

            if fit_contain:
                # Fit inside without cropping
                ratio = min(target_w / side_img.width, target_h / side_img.height)
                new_w = int(side_img.width * ratio)
                new_h = int(side_img.height * ratio)
                resized_img = side_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                
                px = side_x + (target_w - new_w) // 2
                py = side_y + (target_h - new_h) // 2
                img.paste(resized_img, (px, py), resized_img)
            else:
                # Cover & center crop
                aspect = side_img.width / side_img.height
                if aspect > target_w / target_h:
                    new_h = target_h
                    new_w = int(new_h * aspect)
                else:
                    new_w = target_w
                    new_h = int(new_w / aspect)
                    
                side_img = side_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                left = (new_w - target_w) // 2
                top = (new_h - target_h) // 2
                cropped = side_img.crop((left, top, left + target_w, top + target_h))
                
                # Mask with rounded corners
                mask = Image.new("L", (target_w, target_h), 0)
                mask_draw = ImageDraw.Draw(mask)
                mask_draw.rounded_rectangle([0, 0, target_w, target_h], radius=12, fill=255)
                
                img.paste(cropped, (side_x, side_y), mask)
        except Exception as e:
            print(f"Error embedding side image {side_image_path}:", e)
            
    out_path = os.path.join(OUTPUT_DIR, output_filename)
    img.save(out_path, "PNG", optimize=True)
    print(f"Generated: {out_path} ({os.path.getsize(out_path)} bytes)")

def generate_all():
    # 1. Main portfolio
    create_card(
        badge_text="COMPUTER SCIENCE ENGINEER & FLUTTER DEV",
        title_lines=["Kavimugil Rajasekar (Kavi)", "Portfolio & Projects"],
        sub_lines=[
            "Creator of N Queens Studio Game, ResponseRally & Heeba.",
            "Building high-performance mobile, web, CLI, IoT,",
            "and AI-driven software solutions."
        ],
        output_filename="og-main.png",
        side_image_path=PROFILE_PATH
    )
    
    # 2. About page
    create_card(
        badge_text="ABOUT THE DEVELOPER",
        title_lines=["About Kavimugil Rajasekar", "Background & Technical Stack"],
        sub_lines=[
            "Computer Science Engineer at GCT Coimbatore.",
            "Specialized in Flutter, Dart, Python, Full-Stack Web,",
            "AI/ML tooling, and System Architecture."
        ],
        output_filename="og-about.png",
        side_image_path=PROFILE_PATH
    )
    
    # 3. Projects page
    create_card(
        badge_text="PROJECT PORTFOLIO — 23 REPOSITORIES",
        title_lines=["Software Projects & Labs", "Mobile, Web, AI & Hardware"],
        sub_lines=[
            "Explore 23+ projects: N Queens Studio Game, ResponseRally,",
            "Heeba, Rouint CLI, Splitr, MiCroPy-ESP, and AI Studio.",
            "Open source code, live demos, and documentation."
        ],
        output_filename="og-projects.png",
        side_image_path=PROFILE_PATH
    )
    
    # 4. Resume page
    create_card(
        badge_text="RESUME & CURRICULUM VITAE",
        title_lines=["Kavimugil Rajasekar", "Professional Resume & Skills"],
        sub_lines=[
            "Software Engineering & Mobile App Development experience.",
            "View technical expertise, education, project breakdown,",
            "and download official PDF CV."
        ],
        output_filename="og-resume.png",
        side_image_path=PROFILE_PATH,
        badge_color=(255, 140, 105) # Coral badge accent
    )
    
    # 5. Rouint page
    create_card(
        badge_text="PYPI PACKAGE // CLI API CLIENT",
        title_lines=["Rouint CLI Tool", "API Endpoint Testing"],
        sub_lines=[
            "Terminal-native API management & testing client.",
            "pip install rouint | PyPI Package.",
            "Manage REST API templates, environments,",
            "bearer tokens, and multipart request bodies."
        ],
        output_filename="og-rouint.png",
        side_image_path=ROUINT_PATH,
        badge_color=(244, 211, 94), # Gold badge accent
        fit_contain=True
    )
    
    # 6. Contact page
    create_card(
        badge_text="GET IN TOUCH",
        title_lines=["Contact Kavimugil Rajasekar", "Collaborations & Inquiries"],
        sub_lines=[
            "Connect for software development, Flutter mobile apps,",
            "AI integrations, open-source projects, or engineering roles.",
            "Email: kavimugil28@gmail.com | Phone: +91 75503 47146"
        ],
        output_filename="og-contact.png",
        side_image_path=PROFILE_PATH
    )
    
    # 7. LinkedIn feed page
    create_card(
        badge_text="LINKEDIN POSTS & ENGINEERING UPDATES",
        title_lines=["LinkedIn Feed & Insights", "Technical Writing & Demos"],
        sub_lines=[
            "Updates on N Queens Studio, Flutter architectures,",
            "AI benchmark testing, CLI tool releases,",
            "and software engineering articles."
        ],
        output_filename="og-linkedin.png",
        side_image_path=PROFILE_PATH
    )

    # 8. Bottle Art page
    create_card(
        badge_text="CREATIVE ARTWORK PORTFOLIO",
        title_lines=["Bottle Art Showcase", "Upcycled Glass Artworks"],
        sub_lines=[
            "Creative portfolio of handcrafted bottle art",
            "made from discarded brewery bottles.",
            "Artistic expressions, gallery, and creation details."
        ],
        output_filename="og-bottle-art.png",
        side_image_path=PROFILE_PATH,
        badge_color=(255, 140, 105)
    )

if __name__ == "__main__":
    generate_all()
