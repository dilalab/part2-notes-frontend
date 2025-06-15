const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 3015
app.listen(PORT)
console.log(`Server running on port ${PORT}`)