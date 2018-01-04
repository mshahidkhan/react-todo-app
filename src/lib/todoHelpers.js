
export const addTodo = (list, item) => [...list, item]

export const generatedId = () => Math.floor(Math.random()*100000)

export const findById = (id, list) => list.find(item => item.id === id ) 

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete })