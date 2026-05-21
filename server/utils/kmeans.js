export function kmeans(data, k = 3, iterations = 10) {
  if (data.length === 0) return [];

  const dim = data[0].length;

  // random centroids
  let centroids = data.slice(0, k);

  let clusters = new Array(data.length).fill(0);

  for (let iter = 0; iter < iterations; iter++) {
    // assign clusters
    for (let i = 0; i < data.length; i++) {
      let bestDist = Infinity;
      let bestCluster = 0;

      for (let c = 0; c < k; c++) {
        let dist = 0;
        for (let d = 0; d < dim; d++) {
          dist += Math.pow(data[i][d] - centroids[c][d], 2);
        }

        if (dist < bestDist) {
          bestDist = dist;
          bestCluster = c;
        }
      }

      clusters[i] = bestCluster;
    }

    // update centroids
    let newCentroids = Array.from({ length: k }, () =>
      new Array(dim).fill(0)
    );
    let counts = new Array(k).fill(0);

    for (let i = 0; i < data.length; i++) {
      const cluster = clusters[i];
      counts[cluster]++;

      for (let d = 0; d < dim; d++) {
        newCentroids[cluster][d] += data[i][d];
      }
    }

    for (let c = 0; c < k; c++) {
      if (counts[c] === 0) continue;
      for (let d = 0; d < dim; d++) {
        newCentroids[c][d] /= counts[c];
      }
    }

    centroids = newCentroids;
  }

  return clusters;
}