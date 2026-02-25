const findFirstOverlap = (slotsA, slotsB) => {
  for (let a of slotsA) {
    for (let b of slotsB) {
      const start = new Date(Math.max(a.startTime, b.startTime));
      const end = new Date(Math.min(a.endTime, b.endTime));

      if (start < end) {
        return { start, end };
      }
    }
  }
  return null;
};

module.exports = findFirstOverlap;
