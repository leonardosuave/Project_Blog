const validator = require('validator')
const UserModel = require('../../database/login')
const bcryptjs = require('bcryptjs')

class Login {
    constructor(body) {
        this.email = body.email,
        this.name = body.name,
        this.lastName = body.lastName,
        this.password = body.password
        this.errors = [],
        this.user = null
    }

    async register() {
        this.validRegister();
        if(this.errors.length > 0) return;

        await this.userExist()
        if(this.errors.length > 0) return;

        //Tratamento da senha
        const salt = bcryptjs.genSaltSync(10);
        this.password = bcryptjs.hashSync(this.password, salt);

        await UserModel.create({
            email: this.email,
            password: this.password,
            name: this.name,
            lastName: this.lastName
            
        });
    }

    validRegister() {
        if(!validator.isEmail(this.email)) this.errors.push('E-mail inválido.');

        if(!this.name) this.errors.push('Nome não pode estar em branco.');
        if(!this.lastName) this.errors.push('Sobrenome não pode estar em branco.');

        if(this.name.length < 3) this.errors.push('Nome deve ter acima de 3 letras.');
        if(this.lastName.length < 3) this.errors.push('Sobrenome deve ter acima de 3 letras.');

        if(this.password.length < 5 || this.password.length > 12) this.errors.push('Senha inválida. A senha deve ter entre 5 e 12 caracteres.');
    };

    async userExist() {
        const checkUser = await UserModel.findOne({
            where: {
                email: this.email
            }
        })

        if(checkUser) this.errors.push('E-mail já registrado.')
    }

    async login() {
        this.validLogin()
        if(this.errors.length > 0) return

        this.user = await UserModel.findOne({
            where: {
                email: this.email
            }
        })

        if(!this.user) {
            this.errors.push('Usuário não existe.')
            return;
        };

        if(!bcryptjs.compareSync(this.password, this.user.password)) {
            this.errors.push('Senha inválida.')
            this.user = null
            return;
        }
    }

    validLogin() {
        if(!validator.isEmail(this.email)) this.errors.push('E-mail inválido');

        if(this.password.length < 5 || this.password.length > 12) this.errors.push('Senha inválida. A senha deve ter entre 5 e 12 caracteres.')
    }

}

module.exports = Login