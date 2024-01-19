const fs = require('fs')
const path = require('path')
const blogs = require('./blogs')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const generateBlog = async (blog,index) => {

  const randomFileName = `example${getRandomInt(1, 11)}.jpeg`

  let image;
  try {
    const filePath = path.join(path.resolve(__dirname, 'images'), randomFileName)

    image = await fs.promises.readFile(filePath)
  } catch (e) {
    console.log("error image buffer", e)
  }
  const imageBlob = new Blob([image], {type: 'image/jpeg'});

  const formData = new FormData()
  formData.set('title', blog.title)
  formData.set('content', blog.content)
  formData.set('slug', blog.slug)
  formData.append('image', imageBlob, randomFileName)

  fetch('http://localhost:5020/blogs', {
    method: 'POST',
    body: formData
  }).then(res => res.json()).then((res) => {
    console.log(`response from create blog ${index + 1}=====>>>>>`, res)
  })

}

blogs.forEach((blog,index) => {

  generateBlog(blog,index)

})


