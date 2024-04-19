const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const jwt_sign = (req, res) => {
    const { username, password } = req.body;

    try {
        bcrypt.hash(password, +process.env.GENSALT, (err, hash) => {
            const token = jwt.sign({ username, hash }, process.env.JWT_SCRT, { expiresIn: "100m" });
            return res.status(200).json({ token, hash, err });
        });

    } catch (error) {
        return res.status(500).json({ error });

    }
};



const jwt_verify = (req, res) => {
    const body = req.body;
    const { token, password, hash } = body;

    try {
        const compare = bcrypt.compareSync(password, hash);
        console.log(compare)
        if (compare) {
            const verify = jwt.verify(token, process.env.JWT_SCRT);
            return res.status(200).json({ verify, compare });
        } else {
            return res.status(400).json({ password: "password is incorrect!", compare });
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
};



const jwt_decode = (req, res) => {
    const body = req.body;
    const { token, password, hash } = body;
    const decode = jwt.decode(token);

    return res.json({ decode });
}




module.exports = { jwt_sign, jwt_verify, jwt_decode };