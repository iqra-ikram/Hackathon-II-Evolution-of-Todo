import shutil
import os

src = r'C:\Users\iqra\.gemini\antigravity\brain\579a33b4-7740-4bbb-b017-351db8dd4e4f\chatbot_icon_lime_3d_1767467873478.png'
dst = r'c:\Users\iqra\Desktop\Hackathon-2\Phase-2\frontend\public\bot-icon.png'

print(f"Copying {src} to {dst}")
if os.path.exists(src):
    shutil.copy2(src, dst)
    print("Success")
else:
    print("Source does not exist")
