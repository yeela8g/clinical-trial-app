const { Experimenter } = require("./model.js");
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const customEnv = require("custom-env");
const twilio = require('twilio');


// customEnv.env(process.env.NODE_ENV, "./config");
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


// Configure Nodemailer to use Gmai
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email, // Your email
    pass: process.env.emailPassword, // Your email password or app password
  },
});

// Function to send report email to the clinical trial manager
const sendEmailReport = async (users) => {
  // Generate the email content
  const emailContent = users
    .map(
      (user) =>
        `User ${user.userID} : ${
          user.completedTasks ? 'completed' : 'not completed'
        }`
    )
    .join('\n');

  // Send the email
  await transporter.sendMail({
    to:  `${ process.env.email }`, // Recipient address
    subject: 'Daily Tasks Completion Report', // Subject line
    text: `Daily Report of Tasks Completion:\n\n${emailContent}`, // Plain text body
  });

  console.log('Email report sent successfully');
};

const resetCompletedTasks = async () => {
  try {
    const users = await Experimenter.find({});
    const today = new Date(); // UTC time

    const usersToKeep = [];
    const usersToRemove = [];

    users.forEach(user => {
      const startDate = new Date(user.startDate);
      const timeDiff = today - startDate;
      const daysInTrial = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (daysInTrial < 56) {
        usersToKeep.push(user);
      } else {
        usersToRemove.push(user);
      }
    });

    await sendEmailReport(usersToKeep);

    await Experimenter.deleteMany({
      _id: { $in: usersToRemove.map(user => user._id) }
    });

    console.log(`Removed ${usersToRemove.length} users who exceeded 8 weeks from the database.`);
    await Experimenter.updateMany({}, { $set: { completedTasks: false } });
  } catch (error) {
    console.error('Error resetting completedTasks or sending email:', error);
  }
};

cron.schedule("39 12 * * *", resetCompletedTasks);


const formatPhoneNumberToE164 = (phoneNumber) => {
  // Assuming all phone numbers are Israeli numbers starting with 0
  if (phoneNumber.startsWith("0")) {
    // Remove the leading zero and prepend the country code +972
    return `+972${phoneNumber.slice(1)}`;
  }
  return phoneNumber; // Return as is if already in E.164 format
};

const sendWhatsAppReminder = async (user) => {
  const formattedPhoneNumber = formatPhoneNumberToE164(user.phoneNumber);
  try {
    await client.messages.create({
      contentSid: 'HX847968bdf552e3bd1d54e58eccf0803b',
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhoneNumber}`
    });
    console.log(`WhatsApp reminder sent to ${formattedPhoneNumber}`);
  } catch (error) {
    console.error(`Failed to send reminder to ${formattedPhoneNumber}:`, error);
  }
};


// Define the function for sending WhatsApp reminders
const sendWhatsAppReminders = async () => {
  try {
    const users = await Experimenter.find({ completedTasks: false });
    for (const user of users) {
      await sendWhatsAppReminder(user);
    }
    console.log(`Reminders sent to users who haven't completed tasks`);
  } catch (error) {
    console.error("Error sending WhatsApp reminders:", error);
  }
};

cron.schedule("12 12 * * *", sendWhatsAppReminders);


const s_login_user = async (userID, phoneNumber) => {
  if (userID === "admin" && phoneNumber === "admin123") {
    return { userID, phoneNumber, isAdmin: true, status: 200 };
  }

  let user = await Experimenter.findOne({ userID, phoneNumber });
  if (user) {
    const today = new Date();
    const startDate = new Date(user.startDate);

    // If current date is before startDate, deny login
    if (localToday < startDate) {
      return {
        status: 203,
        message: "You cannot log in before your start date.",
      };
    }
    user = user.toObject(); //change to mutable object
    user["isAdmin"] = false;
    user["status"] = 200;
    return user;
  } else return { status: 204, message: "no user was found" };
};

const s_register_user = async (userID, phoneNumber, startDate) => {
  const phoneNumberRegex =
    /^[+]?([0-9]{1,3})?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  //validate valid phone nember and real id number
  if (
    isNaN(userID) ||
    isNaN(phoneNumber) ||
    isNaN(Number(userID)) ||
    !phoneNumberRegex.test(phoneNumber)
  ) {
    return { status: 204 };
  }

  //validate user is not exist already
  const existingUser = await Experimenter.findOne({ userID });
  if (existingUser) {
    return { status: 203 };
  }

  const st_date = new Date(startDate);
  const newUser = new Experimenter({ userID, phoneNumber, startDate: st_date });
  await newUser.save();
  return { status: 200 };
};


const s_isSurvey = async (userID) => {
  const user = await Experimenter.findOne({ userID });
  const today = new Date();
  const start = new Date(user.startDate);

  const dayDiff = Math.floor((today - start) / (1000 * 60 * 60 * 24));

  const needsSurvey = dayDiff % 7 === 0 && dayDiff !== 0; // Every 7 days, starting on day 8
  return { isSurvey: needsSurvey };
};

const s_update_complete_tasks = async (userID) => {
  const user = await Experimenter.updateOne(
    { userID },
    { $set: { completedTasks: true } }
  );
  return { status: 200 };
};

const s_is_complete_tasks = async (userID) => {
  const user = await Experimenter.findOne({ userID });
  console.log(user);
  console.log(user.completedTasks);
  return { completedTasks: user.completedTasks, status: 200 };
};

module.exports = {
  s_login_user,
  s_register_user,
  s_isSurvey,
  s_update_complete_tasks,
  s_is_complete_tasks,
};
