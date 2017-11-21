# Gif command
# If you want to just some specific hours use "*-00.png"
# -r defines fps (screenshots per second)
# -crf defines quality (lower means better)

ffmpeg -pattern_type glob -r 15 -i "./screenshots/*.png" -vcodec libx264 -crf 20  -pix_fmt yuv420p video.mp4
