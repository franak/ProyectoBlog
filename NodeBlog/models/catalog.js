const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 
Implementar:
http://plugins.mongoosejs.io/plugins/autopopulate
http://plugins.mongoosejs.io/plugins/lean-virtuals
 */
let entradasSchema = new Schema(
    {
        activo: {
            type: Boolean,
            default: true
        },
        status: String,
        titulo: {
            type: String,
            required: [true, 'No puede faltar el título']
        },
        contenido: String,
        foto: {
            type: String,
            default: 'assets/img/entradas/3.jpg'
        },
        tipo: String,
        url: String,
        fecha_creacion: Date,
        fecha_modificacion: { type: Date, default: Date.now() },
        categorias: [{ type: Schema.Types.ObjectId, ref: 'Categoria' }]
    },
    {//Modifica la salida del objeto para quitar propiedades "secretas":
        toObject: {
            transform: function (doc, ret) {
                ret.resumen = ret.contenido.substring(0, 250);
                delete ret.activo;
            },
            virtuals: true
        },
        toJSON: {
            transform: function (doc, ret, options) {
                delete ret.activo;
                ret.resumen = ret.contenido.substring(0, 250);
                ret._links = {
                    describedBy: {
                        href: '/$catalog/Entradas'
                    }
                };
            },
            virtuals: true
        }
    });
entradasSchema.post('find', async function (docs) {
    for (let doc of docs) {
        if (doc.isPublic) {
            await doc.populate('categorias').execPopulate();
        }
    }
});
//eventos:  
entradasSchema.virtual('get_titulo_url').get(function () {
    return this.titulo.split(' ').join('-');
})
entradasSchema.virtual('get_resumen').get(function () {
    return this.contenido.substring(0, 250);
})


// http://localhost:3000/rest/$catalog/Categorias
let categoriasSchema = new Schema(
    {
        activo: Boolean,
        status: String,
        titulo: {
            type: String,
            required: [true, 'No puede faltar el título']
        },
        tituloUrl: String,
        descripcion: String,
        url: String,
        fecha_creacion: Date,
        fecha_modificacion: { type: Date, default: Date.now() },
        claves: [],
        entradas: [{ type: Schema.Types.ObjectId, ref: 'Entrada' }],
        // ,productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
    }, {
        toObject: {
            transform: function (doc, ret) {
                delete ret.activo;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                delete ret.activo;
            }
        }
    });

let usuariosSchema = new Schema({
    nombre: String,
    apellidos: String,
    username: String,
    password: String,
    email: String,
    activo: Boolean,
    Entradas: [{ type: Schema.Types.ObjectId, ref: 'Entrada' }]
},
    {
        toObject: {
            transform: function (doc, ret) {
                delete ret.password;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
            }
        }
    });
//ojo, nombre en singular


module.exports = {
    Usuarios: mongoose.model('Usuarios', usuariosSchema),
    Entradas: mongoose.model('Entradas', entradasSchema),
    Categorias: mongoose.model('Categorias', categoriasSchema)
};