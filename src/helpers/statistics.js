module.exports = posts => {
  return posts.reduce(
    (acc, post) => {
      const date = new Date().valueOf();
      const hours = Math.abs(date - post.createdAt) / 36e5;
      if (hours < 24) {
        acc.postsPerDay++;
      } else if (hours < 168) {
        acc.postsPerWeek++;
      } else if (hours < 730) {
        acc.postsPerMonth++;
      }
      return acc;
    },
    {
      postsPerDay: 0,
      postsPerWeek: 0,
      postsPerMonth: 0
    }
  );
};
