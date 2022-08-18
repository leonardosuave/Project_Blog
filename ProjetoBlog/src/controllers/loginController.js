const Login = require('../models/loginModels')

exports.index = (req, res) => {
    res.render('admin/users/loginRegister')
};

exports.register = async (req, res) => {
    try{
        const login = new Login(req.body)
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            return res.redirect('/admin/users/login')
        }

        req.flash('success', 'Registro realizado com sucesso.')
        res.redirect('/admin/users/login')

    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};

exports.login = async (req, res) => {
    try {
        const login  = new Login(req.body)
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            return res.redirect('/admin/users/login')
        }

        req.session.user = login.user
        req.flash('success', 'Login realizado com sucesso.')
        res.redirect('/')

    } catch(e) {
        console.log(e)
        res.render('404')
    }
    
}

exports.logout = (req, res) => {
    req.session.user = undefined
    req.flash('success','Sessão encerrada com sucesso.')
    return res.redirect('/admin/users/login')
}