const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const preview = document.getElementById('preview');

function updatePreview() {
  const html = htmlCode.value;
  const css = `<style>${cssCode.value}</style>`;
  const js = `<script>${jsCode.value}<\/script>`;
  preview.srcdoc = `${html}${css}${js}`;
  saveCodeToLocal();
}

htmlCode.addEventListener('input', updatePreview);
cssCode.addEventListener('input', updatePreview);
jsCode.addEventListener('input', updatePreview);

function saveCodeToLocal() {
  localStorage.setItem("htmlCode", htmlCode.value);
  localStorage.setItem("cssCode", cssCode.value);
  localStorage.setItem("jsCode", jsCode.value);
}

function loadCodeFromLocal() {
  htmlCode.value = localStorage.getItem("htmlCode") || "";
  cssCode.value = localStorage.getItem("cssCode") || "";
  jsCode.value = localStorage.getItem("jsCode") || "";
  updatePreview();
}

function downloadCode() {
  const html = htmlCode.value;
  const css = `<style>${cssCode.value}</style>`;
  const js = `<script>${jsCode.value}<\/script>`;
  const finalCode = `${html}${css}${js}`;

  const blob = new Blob([finalCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_code.html";
  a.click();
  URL.revokeObjectURL(url);
}

function clearCode() {
  if (confirm("Are you sure you want to clear all code?")) {
    htmlCode.value = "";
    cssCode.value = "";
    jsCode.value = "";
    updatePreview();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

window.onload = () => {
  loadTheme();
  loadCodeFromLocal();
};
