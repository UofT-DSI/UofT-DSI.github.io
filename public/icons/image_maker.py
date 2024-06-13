from PIL import Image

def resize_icon(input_path, output_sizes):
    img = Image.open(input_path)
    for size in output_sizes:
        img_resized = img.resize((size, size), Image.LANCZOS)
        img_resized.save(f'icon-{size}x{size}.png')

input_icon_path = '/dsi.png'
output_sizes = [192, 144, 72, 48, 32, 16, 384, 512]
resize_icon(input_icon_path, output_sizes)