async function createClass(){
    const form = document.querySelector("form")
    const formData = new FormData(form);  // phải dùng để giữ định dạng form dât cho multer
    const res = await $.ajax({
        type: "Post",
        url: "/class",
        data: formData,
        processData: false,
        contentType: false,
    });
    
    let div = `
    <img src = '${res.newClass.thumbnail}'>
    <div>${res.newClass.className}</div>
    `;
    $('.classList').html(div)
} 
// dùng fileFilter để dùng chỉ up file ảnh
