import {Linking} from 'react-native';

const phone = '917796419792';
const email = 'pritam7796419792@gmail.com';

// Common help message
const helpMessage =
  'Hello Tiffin Walla, I need help. I am a mess/tiffin owner using the Tiffin Walla Admin app.';

// Bug report message
const bugReportMessage =
  'Hello Tiffin Walla, I want to report a bug in the Tiffin Walla Admin app. Please assist me.';

// Generic WhatsApp sender
const openWhatsApp = (message = helpMessage) => {
  Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
};

// Generic phone call
const makePhoneCall = () => {
  Linking.openURL(`tel:+${phone}`);
};

// Generic email sender
const sendEmail = (message = helpMessage, subject = 'Tiffin Walla Help') => {
  Linking.openURL(
    `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`,
  );
};

// Specific for bug reporting
const reportBugOnWhatsApp = () => openWhatsApp(bugReportMessage);
const reportBugOnEmail = () =>
  sendEmail(bugReportMessage, 'Tiffin Walla Bug Report');

export {
  openWhatsApp,
  makePhoneCall,
  sendEmail,
  reportBugOnWhatsApp,
  reportBugOnEmail,
};
