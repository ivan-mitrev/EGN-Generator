const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const generateEGNs = require("./generateEGNs");

// Function to create an ASCII progress bar
function createProgressBar(progress) {
  const progressBarLength = 20;
  const progressFill = Math.round(progress * progressBarLength);
  const progressBar = "[" + "█".repeat(progressFill) + " ".repeat(progressBarLength - progressFill) + "]";
  return progressBar;
}

if (isMainThread) {
  const numThreads = 16;
  const startYear = 1900;
  const endYear = 1915;

  const yearsPerThread = Math.ceil((endYear - startYear + 1) / numThreads);
  let activeThreads = numThreads;

  for (let i = 0; i < numThreads; i++) {
    const threadStartYear = startYear + i * yearsPerThread;
    const threadEndYear = Math.min(startYear + (i + 1) * yearsPerThread - 1, endYear);
    const worker = new Worker(__filename, { workerData: { startYear: threadStartYear, endYear: threadEndYear } });

    worker.on("message", () => {
      activeThreads--;
      const progress = (numThreads - activeThreads) / numThreads;
      const progressBar = createProgressBar(progress);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Generating EGNs [${i + 1}/${numThreads}] ${progressBar}`);
      if (activeThreads === 0) {
        console.log("\nAll EGNs were successfully saved.");
      }
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  }
} else {
  const generateEGNsInWorker = async (startYear, endYear) => {
    console.log(`Generating EGNs between ${startYear} and ${endYear}`);
    let egnArray = await generateEGNs(startYear, endYear);
    fs.appendFileSync("ValidEGNs.txt", egnArray.join("\n") + "\n");
    console.log(`Generating EGNs between ${startYear} and ${endYear} end`);
    parentPort.postMessage({ done: true });
  };

  generateEGNsInWorker(workerData.startYear, workerData.endYear);
}
