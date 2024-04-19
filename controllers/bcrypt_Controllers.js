const bcrypt = require('bcryptjs');

const bcrypt_example = async (req, res) => {

    try {
        const salt = bcrypt.genSaltSync(+process.env.GENSALT)
        const hash = bcrypt.hashSync("hassan", salt);
        return res.json({ salt, hash });
    } catch (error) {
        return res.status(422).send({ error: "Error in creating a new user" });
    }




    // bcrypt.genSalt(parseInt(process.env.GENSALT)).then((salt) => {
    //     bcrypt.hash("Hassan", salt).then((hash) => {
    //         return res.json({  salt,  hash });
    //     }).catch((error) => {
    //         console.log("Error in hashing the password");
    //         return res.status(422).send({ error: "Error in creating a new user" });
    //     })
    // }).catch((err) => res.status(422).send({ error: "Error in creating a new user" }))



    // try {
    //     const salt = await bcrypt.genSalt(Number(process.env.GENSALT));
    //     const hash = await bcrypt.hash("password", salt);
    //     return res.json({ salt, hash });
    // } catch (error) {
    //     return res.status(422).send({ error: "Error in creating a new user" });
    // }


    // try {
    //     const comparePassword = await bcrypt.compare('password',
    //         "$2a$10$L8hSVwkhj005mUFl6bM7y.WM5Bx2xkeYeOy6iEQl3R8Iu1ndrGABG");
    //     if (!comparePassword) {
    //         res.json({ message: 'Invalid Password', comparePassword });
    //     } else {
    //         return res.json({ message: 'Valid Password', comparePassword, });
    //     }
    // } catch (error) {
    //     return res.status(404).json({ error });

    // }

};

const bcrypt_sign = async (req, res) => {
    const body = req.body;
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.GENSALT));
        const password_hash = await bcrypt.hash(body.password, salt);
        body.password = password_hash
        return res.status(200).json(body);
    } catch (error) {
        return res.status(404).json(error);
    }

};

const bcrypt_login = (req, res) => {
    const body = req.body
    bcrypt.compare(body.password,
        "$2a$10$ShKaLscCSvF9rcdasyrL5uhnFZEV7m5eYEnUiEazd3w18kfRbxsaG")
        .then((result) => res.json(result))
        .catch((error) => res.json(error))
};


module.exports = { bcrypt_example, bcrypt_login, bcrypt_sign };