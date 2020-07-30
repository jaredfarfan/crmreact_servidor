const { gql } = require("apollo-server");

//schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    image_url: String
    city: String
    is_active: Int
    createdAt: String!
    updatedAt: String!
    departamento_id: Departamento
  }
  type Review {
    id: ID!
    title: String!
    description: String!
    user: User!
    product: Producto!
    isActive: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Token {
    token: String
  }
  type Producto {
    id: ID!
    name: String!
    description: String!
    price: Float!
    isActive: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Departamento {
    id: ID
    name: String
    user_at: String
    created_at: String
    updated_at: String
    razon_social_id: ID
  }
  type Divisa {
    id: ID!
    name: String
    nomenclatura: String
    user_at: String
    created_at: String
    updated_at: String
  }
  type Cliente {
    id: ID!
    name: String
    image_url: String
    city: String
    contacto_principal: String
    tel_contacto_principal: String
    contacto_secundario: String
    tel_contacto_secundario: String
    is_active: Int!
    user_at: String
  }
  type RazonSocial {
    id: ID!
    nombre: String
    rfc: String
    direccion: String
    cp: String
    telefono_uno: String
    telefono_dos: String
    user_at: String
  }
  type Proyecto {
    id: ID!
    name: String
    descripcion: String
    monto_proyecto: Float
    cliente_id: Int
    divisa_id: Int
    razon_social_id: Int
    is_active: Int!
    porcentaje_avance: Int
    url_archivo_proyecto: String
    estatus: String
    user_at: String
  }
  #inputs
  input UsuarioInput {
    id: ID
    name: String
    email: String
    city: String
    image_url: String
    is_active: Int
    contrasenia: String!
    user_at: String
    departamento_id: ID
  }

  input AutenticarInput {
    email: String!
    contrasenia: String!
  }
  input ProductoInput {
    nombre: String!
    existencia: Int!
    precio: Float!
  }

  input DepartamentoInput {
    name: String
    user_at: String
    razon_social_id: ID
  }
  input DivisaInput {
    name: String
    nomenclatura: String
    user_at: String
  }
  input ClienteInput {
    name: String
    image_url: String
    city: String
    contacto_principal: String
    tel_contacto_principal: String
    contacto_secundario: String
    tel_contacto_secundario: String
    is_active: Int!
    user_at: String
  }
  input RazonSocialInput {
    nombre: String
    rfc: String
    direccion: String
    cp: String
    telefono_uno: String
    telefono_dos: String
    user_at: String
  }
  input ProyectoInput {
    name: String
    descripcion: String
    monto_proyecto: Float
    cliente_id: ID
    divisa_id: ID
    razon_social_id: ID
    is_active: Int
    porcentaje_avance: Int
    url_archivo_proyecto: String
    estatus: String
    user_at: String
    usuario: [UserInput]
  }
  input UserInput {
    id: ID
  }
  #enum
  enum EstadoProyecto {
    PENDIENTE
    COMPLETADO
    CANCELADO
  }

  type Query {
    #Usuarios
    #obtenerUsuario(token: String!): User
    obtenerUsuario: User
    obtenerUsuarios: [User]
    users: [User]

    #reviews
    reviews: [Review]

    #Departamentos
    departamentos: [Departamento]

    #Divisa
    divisas: [Divisa]

    #Clientes
    clientes: [Cliente]

    #Razones sociales
    razonessociales: [RazonSocial]

    #Proyectos
    proyectos: [Proyecto]

    #Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto

    #Clientes
    obtenerClientes: [Cliente]
    obtenerClientesVendedor: [Cliente]
    obtenerCliente(id: ID!): Cliente

    #Busquedas Avanzadas
    buscarProducto(texto: String!): [Producto]
  }
  type Mutation {
    #Usuarios
    autenticarUsuario(input: AutenticarInput): Token
    addUser(input: UsuarioInput): User

    #departamentos
    addDepartamento(input: DepartamentoInput): Departamento
    updateDepartamento(id: ID, input: DepartamentoInput): Departamento
    deleteDepartamento(id: ID): String

    #divisas
    addDivisa(input: DivisaInput): Divisa
    updateDivisa(id: ID, input: DivisaInput): Divisa
    deleteDivisa(id: ID): String

    #clientes
    addCliente(input: ClienteInput): Cliente
    updateCliente(id: ID, input: ClienteInput): Cliente
    deleteCliente(id: ID): String

    #razon social
    addRazonSocial(input: RazonSocialInput): RazonSocial
    updateRazonSocial(id: ID, input: RazonSocialInput): RazonSocial
    deleteRazonSocial(id: ID): String

    #Proyecto
    addProyecto(input: ProyectoInput): Proyecto
    updateProyecto(id: ID, input: ProyectoInput): Proyecto
    deleteProyecto(id: ID): String

    #Productos
    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
    eliminarProducto(id: ID!): String

    # Clientes
    nuevoCliente(input: ClienteInput): Cliente
    actualizarCliente(id: ID!, input: ClienteInput): Cliente
    eliminarCliente(id: ID!): String
  }
`;

module.exports = typeDefs;
