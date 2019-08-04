module.exports = comments => {
  return comments.reduce(
    (acc, post) => {
      const date = new Date().valueOf();
      const hours = Math.abs(date - post.createdAt) / 36e5;
      if (hours < 24) {
        acc.commentsPerDay++;
      } else if (hours < 168) {
        acc.commentsPerWeek++;
      } else if (hours < 730) {
        acc.commentsPerMonth++;
      }
      return acc;
    },
    {
      commentsPerDay: 0,
      commentsPerWeek: 0,
      commentsPerMonth: 0
    }
  );
};
