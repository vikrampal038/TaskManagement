const Task = require("../models/Task");

const createTaskService = async (data) => {

  const task = await Task.create(data);

  return task;

};

const getTasksService = async (query) => {

  const tasks = await Task.find(query);

  return tasks;

};

module.exports = {
  createTaskService,
  getTasksService
};