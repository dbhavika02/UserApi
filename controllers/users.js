import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const users = JSON.parse(
    fs.readFileSync('./user.json')
)

export const getUsers = (req, res) => {
    res.json(users)
}

export const createUser = (req, res) => {
    const user = req.body

    const newUser = {
        ...user,
        id: uuidv4()
    }

    users.push(newUser)

    fs.writeFileSync(
        './user.json',
        JSON.stringify(users, null, 2)
    )

    res.status(201).json(newUser)
}

export const getUserId = (req, res) => {
    const { id } = req.params

    const foundUser = users.find(
        (user) => user.id === id
    )

    res.json(foundUser)
}

export const deleteUser = (req, res) => {
    const { id } = req.params

    const filteredUsers = users.filter(
        (user) => user.id !== id
    )

    fs.writeFileSync(
        './user.json',
        JSON.stringify(filteredUsers, null, 2)
    )

    res.send(`User with id ${id} deleted`)
}

export const updateUser = (req, res) => {
    const { id } = req.params
    const { name, email, age } = req.body

    const user = users.find(
        (user) => user.id === id
    )

    if (!user) {
        return res.status(404).send('User not found')
    }

    if (name) user.name = name
    if (email) user.email = email
    if (age) user.age = age

    fs.writeFileSync(
        './user.json',
        JSON.stringify(users, null, 2)
    )

    res.send(`User with id ${id} updated`)
}