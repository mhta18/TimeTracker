async function register(req, res) {
    try {
        const { username, password } = req.body;

        const existingUser =
            await findUserByUsername(username);

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }

        const user =
            await createUser(username, password);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user =
            await getUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
        };

        res.json({
            message: "Login successful",
            user: req.session.user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
}

function logout(req, res) {
    req.session.destroy(() => {
        res.json({
            message: "Logged out",
        });
    });
}