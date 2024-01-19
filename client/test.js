fetch('http://localhost:5020/blogs', {
  method: 'DELETE'
}).then((res) => res.json()).then(res => {
// fetch('http://localhost:5020/blogs/artful-walls-elevating-your-space-with-wall-decor').then((res)=>res.json()).then(res=>{
  console.log("res", res)
})