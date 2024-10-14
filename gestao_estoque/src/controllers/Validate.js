const Joi = require('@hapi/joi')

module.exports = {


    registerValidate: (data)=>{
        const schema = Joi.object({
            funcao_usuario: Joi.string().valid('operador', 'gestor', 'admin').default('operador'),
            nome_usuario: Joi.string().min(3).required(), // Mínimo de 3 caracteres
            email_usuario: Joi.string().email().required(), // Valida se é um email
            senha_usuario: Joi.string().min(8).required(), // Mínimo de 8 caracteres
            status_usuario: Joi.boolean().default(true), // Booleano com valor padrão
        })

        return schema.validate(data)
    },

    loginValidate: (data)=>{
        const schema = Joi.object({
            email_usuario: Joi.string().email().required(), // Valida se é um email
            senha_usuario: Joi.string().min(8).required(), // Mínimo de 8 caracteres
        })

        return schema.validate(data)
    }

}