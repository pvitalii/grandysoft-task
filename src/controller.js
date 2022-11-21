const db = require('./database/models/index');
const sortFriends = require('./sorting-friends');

async function getUsersFromDb() {
    const users = await db.User.findAll({
        include: [
            {
                model: db.Following,
                attributes: ['following'],
                include: [
                    {
                        model: db.User,
                        attributes: ['first_name'],
                    },
                ],
            },
        ],
    });

    return users;
}

class Controller {
    async getAllUsers(req, res, next) {
        const users = await getUsersFromDb().catch(next);

        if (!users) {
            return -1;
        }

        return res.status(200).json(users);
    }

    async getFriendsOfUserByOrder(req, res, next) {
        const { userId } = req.params;

        try {
            const user = await db.User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: db.Following,
                        attributes: ['following'],
                    },
                ],
            });

            const sharedFollowings = await db.Following.findAll({
                where: {
                    user_id: user.Followings.map(object => object.following),
                    following: userId,
                },
            });

            const friends = await db.User.findAll({
                where: {
                    id: sharedFollowings.map(object => object.user_id),
                },
            });

            sortFriends(friends, req.query);
            return res.status(200).json(friends);
        } catch (e) {
            next(e);
            return -1;
        }
    }

    async getMaxFollowingUsers(req, res, next) {
        const users = await getUsersFromDb().catch(next);

        if (!users) {
            return -1;
        }

        users.sort((a, b) => b.Followings.length - a.Followings.length);
        return res.status(200).json(users.slice(0, 4));
    }

    async getNotFollowingUsers(req, res, next) {
        const users = await getUsersFromDb().catch(next);

        if (!users) {
            return -1;
        }

        const notFollowingUsers = users.filter(user => user.Followings.length === 0);
        return res.status(200).json(notFollowingUsers);
    }
}

module.exports = Controller;
