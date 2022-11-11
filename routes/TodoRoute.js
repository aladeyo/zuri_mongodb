const router = require("express").Router();
const Todo = require("../model/Todo");

router.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find({})
    if (!tasks) {
      return res.json({ status: "No Todo tasks found." })
    }
    res.json({ tasks })
  } catch (e) {
    res.status(500).send("An error occured while retrieving Tasks...")
  }
})

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      throw new Error("A title is required.")
    }
    if (!description) {
      throw new Error('A description is required')
    }
    const newTask = new Todo({
      title,
      description
    })
    await newTask.save()
    res.status(201).json({ status: "Todo task saved successfully", Todo: newTask })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.put('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'description']

  const isValid = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValid) {
    return res.status(400).send('Invalid updates')
  }

  try {
    const task = await Todo.findOne({ _id: req.params.id })
    if (!task) {
      throw new Error('Todo task not found, try another search...')
    }

    updates.forEach((update) => {
      return task[update] = req.body[update]
    })
    await task.save()
    res.json({ status: 'Update successful', Todo: task })

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const task = await Todo.findOneAndDelete({ _id: req.params.id })

    if (!task) {
      return res.status(404).json({ status: "Todo task not found." })
    }
    const { title } = task
    res.json({ status: 'Todo task removed successfully!', title })
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router;