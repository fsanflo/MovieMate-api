
const bcrypt = require("bcryptjs")

const encrypt = async (contrasenha: string) => {
    return await bcrypt.hash(contrasenha, 10);
}

const compare = async (contrasenha: string, hash: string) => {
    return await bcrypt.compare(contrasenha, hash)
}

module.exports = { encrypt, compare }