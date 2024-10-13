

# 🧬 Clinical Trial Management App

## Introduction 📖
This app provides a user-friendly platform to manage clinical trial participants effectively. Designed for ease of use, it allows administrators to register and track participants in multiple clinical trial protocols, send daily task reminders, and ensure that trial requirements are met with minimal hassle.

## About Exosomm 🌐
The Clinical Trial Management App was developed for [Exosomm](https://www.exosomm.com/), a pioneering biotech company creating innovative bioactive solutions to improve gut health, particularly for Crohn's disease and ulcerative colitis. Exosomm leverages the power of exosomes to develop science-based products that support better health outcomes. This application supports Exosomm’s ongoing clinical research by enabling efficient and streamlined trial management.

## Demo 🚀
Access the live application here: [Clinical Trial Management App](https://clinical-trial-app-phi.vercel.app/)

> <img src="https://github.com/user-attachments/assets/49a1899f-67b1-4b45-8f41-fbec52801756" alt="image" width="600"/>




## Technologies Used 🛠️
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Messaging Service**: Twilio (for WhatsApp reminders)
- **Email Service**: Nodemailer

## Features ✨
The app includes specific features tailored for both administrators and users:

### Administrator Features:
- **Register New Participants**: Managed by the clinical trial coordinator, who registers users into their assigned trial protocol.
- **User Management**: Automatically removes participants from the system when they reach the end of their trial period.
- **Daily Email Report**: Sends a daily email to the clinical trial manager with the status of participants’ task completions without revealing personal details.
- **Multiple Protocols**: Supports different clinical trial protocols (e.g., `v1` or `safety`). Each protocol has specific configurations, including unique daily tasks and varying trial durations.

### User Features:
- **Daily Task Logging**: Participants can track and mark the completion of their daily tasks directly within the app.
- **Daily Reminders**: Users receive WhatsApp reminders in the evening to prompt task completion. Reminders are sent only to those who haven't completed their daily tasks.

## How to Use 📝
### For Administrators:
1. **Access the App**: Use the demo link to log in as an administrator.
2. **Register New Participants**:
   - Enter participant details, select the clinical trial protocol, and submit.
3. **Advanced User Management**: The system will automatically remove participants based on the trial duration specified in their protocol.
4. **Receive Daily Reports**: An email is sent at the end of each day to the clinical trial manager, detailing task completion statuses of participants.

### For Participants:
1. **Log In**: Access your dashboard using your user ID and phone number.
2. **Daily Task Completion**: Track and complete your daily tasks through the app.
3. **Receive Reminders**: Get notified via WhatsApp if you haven’t completed your daily tasks.

## License 📜
All rights reserved.
This software is proprietary and confidential. Unauthorized copying or use of this software, via any medium, is strictly prohibited. Proprietary and confidential.

## Contact 📧
For questions or feedback, please reach out to the project maintainer at [this address](mailto:yeela8g@gmail.com).
