My project contains two main folders:
1.	ComputerVision-GestureControl_Source_Code
2.	Educational_Web_Application_Source_Code
   
Technologies Used:

These are Python libraries and modules used in the project. Here's what type each one is:
1.	Flask – Web framework
2.	Threading – Built-in module for multi-threading
3.	Subprocess – Built-in module to run external programs
4.	OpenCV (cv2) – Computer vision library
5.	MediaPipe – Hand tracking and pose detection
6.	NumPy – Numerical computations
7.	Math – Built-in module for math operations
8.	PyAutoGUI – GUI automation (mouse, keyboard)
9.	Time – Built-in module for time handling
10.	Pycaw – Control system volume
11.	comtypes – Windows COM interface (used by Pycaw)
    
Key Files Included:
•	HandTrackingModule.py (handles hand gesture detection and system actions)
•	app.py (Flask API to activate the hand tracking module from the website)

How to Run:

1.  Download both the folders from this github account.
2.	Make sure required libraries are installed on your computer  (cv2, mediapipe, numpy, pyautogui, pycaw, flask)
3.	Open the app.py and in the command below add the path of the HandTrackingModule.py based on where you place it.
    --->     subprocess.call(['python', 'Add-Path'])
  
4.	Open a terminal in the ComputerVision-GestureControl_Source_Code folder
5.	Run the following command:
   
    --> python app.py
  	
6.	This will start the volume and scroll control feature on the website based on hand gestures.

2. Folder 2 ( Educational_Web_Application_Source_Code )

An interactive educational website enhanced with gesture control and an AI chatbot.


Features:
•	Volume Control: Adjust using thumb + index finger
•	Scroll Down: Close pinky only
•	Stop Scrolling: Close pinky + ring fingers
•	Scroll Up: Close pinky + ring + middle fingers
•	Chatbot: Ask questions anytime through built-in AI assistant

Purpose
This project demonstrates how AI can go beyond theoretical algorithms and be integrated into real-time user interaction. It bridges gesture recognition with web control, making learning more interactive and intelligent.

Thank you.
 
— Syed Muhammad Abdullah ( SP23672 )


