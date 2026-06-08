const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('.'))

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '1234') {
    res.json({ success: true, message: 'Login สำเร็จ!' })
  } else {
    res.status(401).json({ success: false, message: 'Username หรือ Password ไม่ถูกต้อง' })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))
