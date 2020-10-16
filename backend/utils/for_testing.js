/* eslint-disable indent */

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const array1 = new Array(blogs.length)
    array1.fill(0)
    blogs.forEach((post, index) => array1[index] = post.likes )
    return blogs[array1.indexOf(Math.max(...array1))] // array icin destructure lazim math max array almiyo!!
}

const mostBlogs  = (blogses) => {
    const array1 = new Array(blogses.length)
    array1.fill(0)
    blogses.forEach((post, index) => array1[index] = post.blogs )
    return blogses[array1.indexOf(Math.max(...array1))]

}
module.exports = { dummy, totalLikes, mostBlogs }