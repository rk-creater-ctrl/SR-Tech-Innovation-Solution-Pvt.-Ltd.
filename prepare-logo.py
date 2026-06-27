from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parent
SOURCE_CANDIDATES = [
    ROOT / "new-company-logo.png",
    ROOT / "new-company-logo.jpg",
    ROOT / "new-company-logo.jpeg",
    ROOT / "new-logo.png",
    ROOT / "new-logo.jpg",
    ROOT / "new-logo.jpeg",
]
OUTPUT = ROOT / "company_logo.png"
BACKUP = ROOT / "company_logo.previous.png"
CANVAS_SIZE = 1200
LOGO_MAX_SIZE = 970


def find_source() -> Path:
    for source in SOURCE_CANDIDATES:
        if source.exists():
            return source

    names = ", ".join(source.name for source in SOURCE_CANDIDATES)
    raise FileNotFoundError(f"Save the new logo as one of: {names}")


def remove_near_white_background(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a and r > 232 and g > 232 and b > 232:
                fade = max(0, 255 - max(r, g, b))
                pixels[x, y] = (r, g, b, min(a, fade * 3))

    return image


def trim_transparent_edges(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    bounds = alpha.getbbox()
    if not bounds:
        return image
    return image.crop(bounds)


def build_theme_background() -> Image.Image:
    canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), "#020817")
    draw = ImageDraw.Draw(canvas, "RGBA")

    for radius in range(CANVAS_SIZE, 0, -10):
        alpha = int(92 * (radius / CANVAS_SIZE) ** 2)
        color = (94, 233, 255, alpha)
        box = (
            (CANVAS_SIZE - radius) // 2,
            (CANVAS_SIZE - radius) // 2,
            (CANVAS_SIZE + radius) // 2,
            (CANVAS_SIZE + radius) // 2,
        )
        draw.ellipse(box, fill=color)

    for offset in range(-CANVAS_SIZE, CANVAS_SIZE, 34):
        draw.line(
            [(offset, CANVAS_SIZE), (offset + CANVAS_SIZE, 0)],
            fill=(255, 255, 255, 16),
            width=2,
        )

    vignette = Image.new("L", (CANVAS_SIZE, CANVAS_SIZE), 0)
    vignette_draw = ImageDraw.Draw(vignette)
    vignette_draw.ellipse((80, 80, CANVAS_SIZE - 80, CANVAS_SIZE - 80), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(90))

    dark = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 150))
    canvas = Image.composite(canvas, Image.alpha_composite(canvas, dark), vignette)

    border = ImageDraw.Draw(canvas, "RGBA")
    border.rounded_rectangle(
        (36, 36, CANVAS_SIZE - 36, CANVAS_SIZE - 36),
        radius=180,
        outline=(94, 233, 255, 86),
        width=5,
    )
    border.rounded_rectangle(
        (58, 58, CANVAS_SIZE - 58, CANVAS_SIZE - 58),
        radius=155,
        outline=(212, 175, 55, 70),
        width=3,
    )

    return canvas


def main() -> None:
    source = find_source()

    if OUTPUT.exists() and not BACKUP.exists():
        OUTPUT.replace(BACKUP)

    logo = ImageOps.exif_transpose(Image.open(source))
    logo = remove_near_white_background(logo)
    logo = trim_transparent_edges(logo)
    logo.thumbnail((LOGO_MAX_SIZE, LOGO_MAX_SIZE), Image.Resampling.LANCZOS)

    canvas = build_theme_background()
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    x = (CANVAS_SIZE - logo.width) // 2
    y = (CANVAS_SIZE - logo.height) // 2 + 16
    shadow.alpha_composite(logo, (x, y))
    shadow_alpha = shadow.getchannel("A").filter(ImageFilter.GaussianBlur(30))
    shadow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 130))
    canvas = Image.alpha_composite(canvas, Image.composite(shadow_layer, Image.new("RGBA", canvas.size), shadow_alpha))
    canvas.alpha_composite(logo, (x, y))

    canvas.save(OUTPUT, optimize=True)
    print(f"Created {OUTPUT.name} from {source.name}")


if __name__ == "__main__":
    main()
