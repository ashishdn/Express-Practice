import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json()); // Body porar jonno - (Middleware)


let users = [
    {id: 1, name: "Rahim", age: 24},
    {id: 2, name: "karim", age: 23},
    {id: 3, name: "johir", age: 35}
];



app.get("/users", (req, res)=>{
  const { minAge } = req.query;
  if(minAge){
    return res.json(users.filter((u) => u.age >= Number(minAge)));
  }
  res.json(users)
})

// 📖 READ: একজন user
app.get("/users/:id", (req, res)=>{
    const id = req.params.id;
    const user = users.find((u) => u.id === Number(id));
    if(!user){
        res.status(404).json({error: "User akhono paoya jayni"})
    };
    res.json(user);
})


// ➕ CREATE: নতুন user
app.post("/users", (req, res)=>{
    const {name, age} = req.body;
    if(!name || !age){
        return res.status(400).json({error: "name ar age duitai dite hobe"})
    }
    const newUser = {id: Date.now(), name, age};
    users.push(newUser);
    res.status(201).json(newUser);
})

/*
async function createUser(name, age) {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age: Number(age) })
  });

  const data = await res.json();
  return data;
}
*/


// ✏️ UPDATE: user এর কিছু তথ্য বদলানো
app.patch("/users/:id", (req, res) =>{
    const id = req.params.id;
    const user = users.find((u) => u.id === Number(id));
    if(!user){
        return res.status(404).json({ error: "User পাওয়া যায়নি"})
    };
    Object.assign(user, req.body); // যা পাঠানো হয়েছে শুধু সেটুকু বদলাবে
    res.json();
})

/*
async function updateUser(id, updatedData) {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });

  const data = await res.json();
  return data;
}
*/


// ❌ DELETE: user মুছে ফেলা
app.delete("/users/:id", (req, res) =>{
    const id = Number(req.params.id);
    const exists = users.some((u) => u.id === id);
    if (!exists) {
    return res.status(404).json({ error: "User পাওয়া যায়নি" });
  }
  users = users.filter(u => u.id !== id);
  res.json({message : "User delete kora hoyece"})
})

app.listen(PORT, ()=>{
      console.log(`Server Cholche : http://localhost:${PORT}`);
})