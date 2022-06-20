const router = require('express').Router();

const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts);

router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/<thoughtId>/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/<thoughtId>/reactions/<reactionId>
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;