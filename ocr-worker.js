// Reads handwriting on the phone itself. Images are passed in from the page and never uploaded.
// The model files are downloaded once from Hugging Face and then kept in the browser cache.
import { pipeline, env, RawImage } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;   // always use the cached download
env.useBrowserCache = true;
// One thread: GitHub Pages cannot enable multi-threading, and phones (iPhone especially) are more stable this way
if (env.backends && env.backends.onnx && env.backends.onnx.wasm) env.backends.onnx.wasm.numThreads = 1;

const MODEL = 'Xenova/trocr-small-handwritten';
let reader = null;

function getReader() {
  if (!reader) {
    reader = pipeline('image-to-text', MODEL, {
      dtype: 'q8',               // compressed model, about 60 MB
      device: 'wasm',
      progress_callback: (p) => self.postMessage({ type: 'progress', p }),
    }).catch((e) => { reader = null; throw e; });
  }
  return reader;
}

self.onmessage = async (e) => {
  const { lines } = e.data;
  try {
    const read = await getReader();
    self.postMessage({ type: 'ready' });
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const img = await RawImage.fromBlob(lines[i]);
      const res = await read(img, { max_new_tokens: 64 });
      out.push(((res && res[0] && res[0].generated_text) || '').trim());
      self.postMessage({ type: 'line', i, n: lines.length, partial: out.join('\n') });
    }
    self.postMessage({ type: 'done', text: out.filter(Boolean).join('\n') });
  } catch (err) {
    self.postMessage({ type: 'error', message: String((err && err.message) || err) });
  }
};
