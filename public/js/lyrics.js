const getLyrics = document.querySelector("#getLyrics");

getLyrics.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { title, artist } = event.target;
  const response = await fetch(`/api/text/${artist.value}/${title.value}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    document.getElementById("lyrics").innerText = data.lyrics;
  } else alert(data.message);
});
