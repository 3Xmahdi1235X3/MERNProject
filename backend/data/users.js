const bcrypt= require('bcrypt') ;
const users = [
    {
        name: 'John Doe',
        email: 'admin@email.com',
        password:bcrypt.hashSync("test",10) , 
        isAdmin : true 
    },
    {
        name: 'John Doee',
        email: 'john@email.com',
        password:bcrypt.hashSync("test",10) , 
        isAdmin : false 
    },
    {
        name: 'Johneee Doe',
        email: 'doeeee@email.com',
        password:bcrypt.hashSync("test",10) , 
        isAdmin : false 
    },
]
module.exports = users