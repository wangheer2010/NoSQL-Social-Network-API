const { Thought, User } = require("../models");

const thoughtController = {
	getAllThoughts(req, res) {
		Thought.find({})
			.select("-__v")
			.sort({ _id: -1 })
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id})
			.select("-__v")
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	addThought({ body }, res) {
		User.findOne({ _id: body.userId }).then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({
					message: "No User found with this ID!",
				});
				return;
			}
			Thought.create(body)
				.then((dbThoughtData) => {
					User.findOneAndUpdate(
						{ _id: body.userId },
						{ $push: { thoughts: dbThoughtData._id } },
						{ new: true }
					).then((dbUserData) => {});
					res.json(dbThoughtData);
				})
				.catch((err) => {
					console.log(err);
					res.sendStatus(400);
				});
		});
	},

	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: "No Thought found with this ID!",
					});
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},

	//create reactions
    addReaction({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $push: {
                    reactions: body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(updatedThought => {
                if (!updatedThought) {
                    res.status(404).json({
                        message: 'No reaction found with this id!'
                    });
                    return;
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    // Delete a reaction
    removeReaction({
        params
    }, res) {
        Thought.findOneAndUpdate({
                    _id: params.thoughtId
                },
                //allows to remove the reaction by id
                {
                    $pull: {
                        reactions: {
                            reactionId: params.reactionId
                        }
                    }
                }, {
                    new: true
                }
            )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({
                        message: 'No reaction found with this id.'
                    });
                    return;
                }
                res.json(thought)
            })
            .catch(err => res.json(err));
    },
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: "No Thought found with this ID!",
					});
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;