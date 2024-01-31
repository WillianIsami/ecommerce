const generateImages = (containerId: string, arr: string[]) => {
  const container = document.getElementById(containerId);

  if (container) {
    arr.forEach((imageUrl, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = `Image ${index + 1}`;
      imgElement.className = "img-products"
      container.appendChild(imgElement);
    });
  }
}

const url = 'http://localhost:5000/products';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    generateImages("img-container", data.image);
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
