const axios = require('axios')

export class global_functions {

    async executeMethod(metodo, rota, data = [], content_type = 'application/json') {
        try {
            return await axios({
                method: metodo,
                url: `http://127.0.0.1:3333${rota}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': content_type
                },
                data: data
            })
        } catch (err) {
            window.location.href = '/#/secure/user'
        }
    }
  
}

