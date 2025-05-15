import cv2
import mediapipe as mp
import numpy as np
import math
import pyautogui
import time
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

# Webcam
cap = cv2.VideoCapture(0)

# MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
mp_draw = mp.solutions.drawing_utils

# pycaw for volume
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))
vol_range = volume.GetVolumeRange()
min_vol = vol_range[0]
max_vol = vol_range[1]

def fingers_up(lm_list):
    fingers = []
    tip_ids = [4, 8, 12, 16, 20]  # Thumb to Pinky

    # Thumb
    if lm_list[4][0] > lm_list[3][0]:
        fingers.append(1)
    else:
        fingers.append(0)

    # Fingers
    for id in range(1, 5):
        if lm_list[tip_ids[id]][1] < lm_list[tip_ids[id] - 2][1]:
            fingers.append(1)
        else:
            fingers.append(0)

    return fingers  # 1 = up, 0 = down

while True:
    success, img = cap.read()
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(img_rgb)

    if result.multi_hand_landmarks:
        for hand_lms in result.multi_hand_landmarks:
            lm_list = []
            for id, lm in enumerate(hand_lms.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                lm_list.append((cx, cy))

            mp_draw.draw_landmarks(img, hand_lms, mp_hands.HAND_CONNECTIONS)

            if lm_list:
                fingers = fingers_up(lm_list)

                # Volume control only if pinky is up
                if fingers[0] == 1 and fingers[1] == 1 and fingers[4] == 1:
                    x1, y1 = lm_list[4]
                    x2, y2 = lm_list[8]
                    length = math.hypot(x2 - x1, y2 - y1)
                    vol = np.interp(length, [30, 300], [min_vol, max_vol])
                    volume.SetMasterVolumeLevel(vol, None)
                    cv2.putText(img, f'Volume: {int(np.interp(length, [30, 300], [0, 100]))}%', 
                                (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

                # Volume lock if pinky is down
                if fingers[4] == 0:
                    cv2.putText(img, 'Volume Locked 🔒', (30, 60),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

                # Scroll if all fingers except pinky are up
                if fingers == [1, 1, 1, 1, 0]:
                    pyautogui.scroll(-100)  # Faster scroll (more distance)
                    time.sleep(0.005)  # Shorter delay for faster scroll
                    cv2.putText(img, 'Scrolling...', (30, 100),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

                # Scroll up if Pinky and Middle are closed
                if fingers[4] == 0 and fingers[2] == 0:
                    pyautogui.scroll(100)  # Faster scroll (more distance)
                    time.sleep(0.005)  # Shorter delay for faster scroll
                    cv2.putText(img, 'Scrolling Up...', (30, 140),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

    cv2.imshow("Hand Control", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
