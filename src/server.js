const { httpServer } = require('./http')
require('./websocket')

httpServer.listen(3333, () => console.info('[INFO] Server is running...'))
