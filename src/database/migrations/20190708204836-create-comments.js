module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Comments', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			text: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			postId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Comments');
	},
};
