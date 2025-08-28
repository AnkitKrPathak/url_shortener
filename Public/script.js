const result = document.getElementById("result");
const copyBtn = document.querySelector("#copy");
const resetBtn = document.querySelector("#reset");

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const customAlias = document.getElementById("customAlias").value;

    try {
        const response = await fetch("https://url-shortener-m6ja.onrender.com/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl, customAlias })
        });

        const data = await response.json();
        if(response.status !== 200) {
            result.innerHTML = `<span style="color:red;">${data.error}</span>`;
            return;
        }
        result.innerHTML = `<p style="color:blue;">${data.shortUrl}</p>`;
        copyBtn.classList.remove("invisible");
        copyBtn.classList.add("visible");

    } catch (err) {
        result.innerHTML = `<span style="color:red;">${err}</span>`;
    }
}

result.addEventListener("click", async (e) => {
    e.preventDefault();
    const shortCode = result.innerText.split("/").pop();
    console.log(shortCode);

    try {
        const response = await fetch(`https://url-shortener-m6ja.onrender.com/api/${shortCode}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        const data = await response.json();
        if(response.status !== 200) {
            result.innerHTML = `<span style="color:red;">${data.error}</span>`;
            return;
        }
        window.location.href = data.longUrl;
        
    } catch (err) {
        result.innerHTML = `<span style="color:red;">${err}</span>`;
    }
});

copyBtn.addEventListener("click", () => {
    const shortUrl = result.innerText;
    navigator.clipboard.writeText(shortUrl).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy: " + err);
    });
});

resetBtn.addEventListener("click", () => {
    window.location.reload();
});