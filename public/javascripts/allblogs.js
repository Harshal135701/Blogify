async function searchBlogs() {
  const value = document.getElementById("search").value;

  const res = await fetch(`/filterdblogs?search=${value}`);
  const data = await res.json();

  console.log(data); // render this in UI
}