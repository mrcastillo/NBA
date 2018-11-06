module.exports = {
    development: {
        client: 'mysql',
        connection: {
            database: 'nbatest',
            user: 'nbadeveloper',
            password: '846043ant;'
        },
        pool: {
            min: 2,
            max: 10
        }
    },
    production: {
        client: 'mysql',
        connection: {
            database: 'nbatest',
            user: 'nbadeveloper',
            password: '846043ant;'
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};