const ArticleModel = require('../../database/article');
const CategoryModel = require('../../database/category');


exports.index = async (req, res) => {
    const articles = await ArticleModel.findAll({ raw: true, order:[
        [ 'createdAt', 'DESC']
    ],
    limit: 4 //Para mostrar apenas os ultimos 4 artigos na page renderizada
});

    //Para utilizar a homenavbar em index.ejs
    const categories = await CategoryModel.findAll({ raw: true, order: [
        ['createdAt', 'DESC']
    ]})

    res.render('index', { articles, categories });
}