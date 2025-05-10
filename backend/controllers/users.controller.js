const Users = require('../models/users.model');
const userCtlr = {};

// Obtener todos los usuarios
userCtlr.getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// Crear un nuevo usuario
userCtlr.createUsers = async (req, res) => {
    try {
        const newUser = new Users(req.body);
        await newUser.save();
        res.json({ status: 'Usuario creado' });
    } catch (error) {
        console.error('Error al crear usuario:', error); // Muestra el error completo en la consola
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

// Obtener un usuario por ID
userCtlr.getUnicoUsuario = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

// Actualizar un usuario
userCtlr.updateUser = async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ status: 'Usuario actualizado', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

// Eliminar un usuario
userCtlr.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ status: 'Usuario eliminado', user: deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

// Exportar el controlador
module.exports = userCtlr;