<script lang="ts">
  export let content = "Welcome to the home page!";

  function downloadFile() {
    const link = document.createElement('a');
    link.href = '/manual67.pdf';
    // link.download = 'filename.ext';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<h2>Home</h2>
<h1 class="text-3xl font-bold underline">Hello world!</h1>
<p>{content}</p>
<img src="/images/flowchart.webp" alt="Description of flowchart" />
<button on:click={downloadFile}>Download File</button>
