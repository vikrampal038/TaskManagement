const { sendEmail } = require("../utils/sendEmail");

const sendTaskAssignedEmail = async (employee, task) => {
  const subject = "New Task Assigned";

  const message = `
Hello ${employee.name},

You have been assigned a new task.

Task Title: ${task.title}

Please login to the system to check details.

Regards
Company Management System
`;

  await sendEmail(employee.email, subject, message);
};

const sendTaskCompletedEmail = async (adminEmail, task) => {
  const subject = "Task Completed";

  const message = `
Task "${task.title}" has been completed.

Please review it in the dashboard.
`;

  await sendEmail(adminEmail, subject, message);
};

module.exports = {
  sendTaskAssignedEmail,
  sendTaskCompletedEmail,
};
