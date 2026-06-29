(() => {
  const input = document.querySelector("#guide-search-input");
  const output = document.querySelector("#guide-search-results");
  const dataNode = document.querySelector("#guide-docs-data");
  if (!input || !output || !dataNode) return;

  let documents = [];
  try {
    documents = JSON.parse(dataNode.textContent || "[]");
  } catch {
    documents = [];
  }

  const render = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      output.innerHTML = "";
      return;
    }
    const results = documents
      .filter((doc) => `${doc.title} ${doc.description} ${doc.category || ""}`.toLowerCase().includes(query))
      .slice(0, 8);

    output.innerHTML = results.length
      ? results
          .map(
            (doc) =>
              `<a href="${doc.link}"><span>${doc.category || "가이드"}</span><strong>${doc.title}</strong><small>${doc.description || ""}</small></a>`,
          )
          .join("")
      : '<p class="live-search-empty">검색 결과가 없어요. 다른 키워드로 다시 검색해 주세요.</p>';
  };

  input.addEventListener("input", render);
})();
