const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model.");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/", asyncHandler(requireToken), asyncHandler(createToDos));
  router.get("/", asyncHandler(requireToken), asyncHandler(getToDos));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getToDoById));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(updateToDo));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteToDos));
  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteToDoById)
  );
}

async function createToDos(req, res, next) {
  const todo = await ToDo.create({
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone,
    isFavourite: req.body.isFavourite,
    priority: req.body.priority,
    userId: req.userId,
  });

  res.status(200).json(todo);
}

async function getToDos(req, res, next) {
  const todos = await ToDo.findAll({ where: { userId: req.userId } });

  res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: { id: req.params.id, userId: req.userId },
  });

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }

  res.status(200).json({ todo });
}

async function updateToDo(req, res, next) {
  const todo = await ToDo.findOne({
    where: { id: req.params.id, userId: req.userId },
  });

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }
  await todo.update({
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone,
    isFavourite: req.body.isFavourite,
    priority: req.body.priority,
  });

  res.status(200).json({ message: "OK" });
}

async function deleteToDos(req, res, next) {
  await ToDo.destroy({ where: { userId: req.userId } });

  res.status(200).json({ message: "OK" });
}

async function deleteToDoById(req, res, next) {
  await ToDo.destroy({
    where: { userId: req.userId, id: req.params.id },
  });

  res.status(200).json({ message: "OK" });
}

initRoutes();

module.exports = router;
