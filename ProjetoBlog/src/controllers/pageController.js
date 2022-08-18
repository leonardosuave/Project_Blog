const ArticleModel = require('../../database/article');
const CategoryModel = require('../../database/category');

exports.index = async (req, res) => {

    let offset = 0
    let quant = 4 //Qt de artigos por pagina

    if(isNaN(req.params.num) || req.params.num >= 1) {
        offset = (parseInt(req.params.num) -1) * quant;
    }

    const articlePage = await ArticleModel.findAndCountAll({
        limit: quant,
        offset: offset
    })

    let next;
    if(offset + 4 >= articlePage.count) {
        next = false;
    } else {
        next = true;
    };

    let result = {
        page: parseInt(req.params.num), //Para saber qual pag está.
        next: next,
        articlePage: articlePage
    }


    //Caso seja direcionado uma pagina negativa será redirecionado para a primeira pagina e sera realizado os demais processo deste controller
    if((parseInt(req.params.num) < 1)) {
        res.redirect('/article/page/1')
    };
    
    //Caso seja direcionado a uma página maior que a quantidade existente será direcionado para a ultima página.
    let countArticles = result.articlePage.count
    let countPage = countArticles / quant
    let maxPage = Math.ceil(countPage)

    if((parseInt(req.params.num) > maxPage)) {
        res.redirect(`/article/page/${maxPage}`)
    }

    
    //Enviar as categories pq o render page trabalha com homenavbar que possui categories 
    const categories = await CategoryModel.findAll()

    res.render('admin/articles/page', {result, categories});
};

exports. artToCategory = async (req, res) => {
    let offset = 0
    let quant = 4 //Qt de artigos por pagina

    if(isNaN(req.params.num) || req.params.num >= 1) {
        offset = (parseInt(req.params.num) -1) * quant;
    }

    const articlePage = await ArticleModel.findAndCountAll({
        where: {
            categoryId: req.params.category
        },
        limit: quant,
        offset: offset
    })

    //Se for acessado os artigos de uma categoria que ainda não possui artigos registrados. -> Redireciona com uma msg de aviso. 
    if(articlePage.count == 0) {
       req.flash('errors', 'Essa categoria ainda não possui artigos cadastrados.') 
       return res.redirect('/admin/categories')
    }
    

    let next;
    if(offset + quant >= articlePage.count) {
        next = false;
    } else {
        next = true;
    };

    let result = {
        page: parseInt(req.params.num), //Para passar para número e saber qual pag está.
        next: next, //Se terá proxima página
        articlePage: articlePage //Os artigos importados
    }

    //Caso seja direcionado uma pagina negativa será redirecionado para a primeira pagina e sera realizado os demais processo deste controller
    if((parseInt(req.params.num) < 1)) {
        res.redirect(`/articles/${req.params.category}/page/1`)
    };
    
    //Caso seja direcionado a uma página maior que a quantidade existente será direcionado para a ultima página.
    let countArticles = result.articlePage.count
    let countPage = countArticles / quant
    let maxPage = Math.ceil(countPage)

    if((parseInt(req.params.num) > maxPage)) {
        res.redirect(`/articles/${req.params.category}/page/${maxPage}`)
    }

    
    //Envia a category dos artigos importados para aplicar na rota dinâmica das proximas páginas -> será utilizado na rota o category.id 
    const category = await CategoryModel.findByPk(req.params.category)
    
    res.render('admin/articles/articlesToCategory', {result, category});
}