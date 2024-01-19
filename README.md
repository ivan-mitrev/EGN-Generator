# EGN Generator

This program generates a list of EGNs (Unique Civil Registration Number) using Node.js and multi-threading. The generated EGNs are then saved to a file. The generation process is split into multiple threads to improve efficiency.

## Installation

Before running the program, make sure you have Node.js >= v18 installed on your machine. 

## Usage

To execute the program and generate EGNs, use the following command:

`node index.js`

## Program Overview

The program utilizes Node.js worker_threads module to spawn multiple threads for parallel processing. Here's a brief overview of the program components:

generateEGNs.js: Module responsible for generating EGNs based on specified start and end years.

createProgressBar(progress): Function to create an ASCII progress bar for visualizing the generation progress.

isMainThread: Check if the current script is the main thread.

Worker, parentPort, workerData: Components of the worker_threads module used for multi-threading.

startYear, endYear: Define the range of years for EGN generation.

numThreads: Number of threads to be spawned for parallel processing.

## Execution

The main thread coordinates the generation process by spawning multiple worker threads. Each worker thread is responsible for generating EGNs within a specific year range. Progress updates and completion messages are displayed in the console.

## Notes

The generated EGNs are saved to "ValidEGNs.txt" in the current working directory.

The progress bar provides a visual representation of the generation progress for each thread.

The number of threads (numThreads) can be adjusted based on system capabilities.

Feel free to customize the <span style="color:red">start and end years<span>, the number of threads, and other parameters based on your specific requirements.