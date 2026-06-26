from pathlib import Path
from shutil import copyfile

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_SIZE = (1600, 1200)
QUALITY = 82
COMPANY_LOGO = "company_logo.png"
EXCLUDED_NAMES = {"logo.png", "logo01.png", COMPANY_LOGO}
OUTPUT_NAMES = {
    "pdf-summerizer.png": "pdf-summarizer.webp",
    "Object-distance-ditector.png": "object-distance-detector.webp",
    "ActivityDitector.png": "activity-detector.webp",
    "YT-video-installer.png": "youtube-downloader.webp",
}


def optimize_image(source: Path) -> str | None:
    if source.name in EXCLUDED_NAMES or source.suffix.lower() not in IMAGE_EXTENSIONS:
        return None

    if source.stat().st_size < 40_000:
        return None

    destination = ROOT / OUTPUT_NAMES.get(source.name, source.with_suffix(".webp").name)

    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)

        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        save_kwargs = {
            "format": "WEBP",
            "quality": QUALITY,
            "method": 6,
        }

        image.save(destination, **save_kwargs)

    before = source.stat().st_size
    after = destination.stat().st_size
    savings = max(0, before - after)
    return f"{source.name} -> {destination.name} ({before // 1024} KB to {after // 1024} KB, saved {savings // 1024} KB)"


def main() -> None:
    results = []
    logo_source = ROOT / "logo.png"
    logo_destination = ROOT / COMPANY_LOGO

    if logo_source.exists():
        copyfile(logo_source, logo_destination)
        results.append(f"logo.png -> {COMPANY_LOGO} (site logo)")

    for source in sorted(ROOT.iterdir()):
        if source.is_file():
            result = optimize_image(source)
            if result:
                results.append(result)

    if not results:
        print("No images needed optimization.")
        return

    print("Optimized images:")
    for result in results:
        print(f"- {result}")


if __name__ == "__main__":
    main()
