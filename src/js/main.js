const show =(content)=>{
    const divBox = document.getElementById("divBox");
    divBox.innerHTML = `Hello, ${content}`;
};

export { show };