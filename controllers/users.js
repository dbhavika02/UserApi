import { v4 as uuidv4 } from "uuid";
let users = []

export const getUsers = (req, res) => {
    console.log(users)
    res.send(users)
}

export const createUser = (req, res) => {
    const user = req.body

    users.push({ ...user, id: uuidv4() })
    res.send(`User with the username ${user.name} has been added`)
}

export const getUserId = (req, res) => {
    const { id } = req.params

    const foundUser = users.find((user) => user.id === id)
    res.send(foundUser)
}

export const deleteUser = (req, res) => {
    const { id } = req.params
    // filter function delete except the id given to it 
    users = users.filter((user) => user.id !== id)
    res.send(`User with the id: ${id} is deleted from the database,`)
}

export const updateUser = (req, res) => {
    const { id } = req.params
    const { name, email, age } = req.body

    const user = users.find((user) => user.id == id)

    if (name) user.name = name
    if (email) user.email = email
    if (age) user.age = age

    res.send(`user with id ${id} has been updated`)

}