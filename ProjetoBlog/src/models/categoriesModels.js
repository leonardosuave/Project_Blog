const CategoryModel = require('../../database/category')
const ArticleModel = require('../../database/article')
const slugify = require('slugify');

class Category {
    constructor(body) {
        this.title = body.title,
        this.errors = [];
    }

    async createCategory() {
        this.valid();
        if(this.errors.length > 0) return;

        await this.categoryExist()
        if(this.errors.length > 0) return;

        await CategoryModel.create({
            title: this.title,
            slug: slugify(this.title)
        })

    }

    valid() {
        if(this.title === 'undefined') return this.errors.push('Titulo de categoria inválido.')
        if(this.title.length <= 1) return this.errors.push('Titulo da categoria deve ter pelo menos dois caracteres.')
        return;
    }

    async categoryExist() {
        const categoryExist = await CategoryModel.findOne({
            where: { title: this.title}
        })
        if(categoryExist) return this.errors.push('Essa categoria já existe');
        return;
    }

    //static porque não precisa de dados da class Category
    static async delete(id) {
        if(typeof id !== 'string') return;

        await ArticleModel.destroy({
            where: {
                categoryId: id
            }
        })

        const category = await CategoryModel.destroy({
            where: {
                id: id
            }
        })
        return category
    }

    static async load(id) {
        if(typeof id !== 'string') return;
        if(isNaN(id)) return;

        const categoryEdit = await CategoryModel.findByPk(id) //findByPk its same finOne, but is simple
        return categoryEdit;
    }

    async edit(id) {
        if(typeof id !== 'string') return;
        
        await CategoryModel.update({title: this.title, slug: slugify(this.title)}, {
            where: {
                id: id
            }
        })
    }

    static async slug(slug) {
        const category = await CategoryModel.findOne({
            where: {
                slug: slug
            },
            include: [{model: ArticleModel}]
        })
        return category;
    }
}

module.exports = Category