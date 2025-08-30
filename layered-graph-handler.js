//import "./dist/layered-graph.js";
import "https://togostanza.github.io/metastanza-devel/layered-graph.js";

const originalUrl = "./sample_variants.vcf.gz.json";
const stanza = document.getElementById("filtered-graph");
const dropdown = document.getElementById("effectFilter");

async function fetchDataAndFilter(effect) {
  const response = await fetch(originalUrl);
  const json = await response.json();

  if (effect !== "all") {
    const filteredNodes = json.nodes.filter(node => node.effect === effect);
    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = json.links.filter(link =>
      filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target)
    );
    json.nodes = filteredNodes;
    json.links = filteredLinks;
  }

  const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
  const blobUrl = URL.createObjectURL(blob);
  stanza.setAttribute("data-url", blobUrl);
}

dropdown.addEventListener("change", () => {
  fetchDataAndFilter(dropdown.value);
});

// Initial load
fetchDataAndFilter("all");