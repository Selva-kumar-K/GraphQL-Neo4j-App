const resolvers = {
    Query: {
        allBusinesses: (obj, args, context, info) => {

            return context.db.businesses

        },

        businessBySearchTerm: (obj, args, context, info) => {
            const compare = (a, b) => {
                const [orderField, order] = args.orderBy.split("_");
                const left = a[orderField],
                  right = b[orderField];
        
                if (left < right) {
                  return order === "asc" ? -1 : 1;
                } else if (left > right) {
                  return order === "desc" ? -1 : 1;
                } else {
                  return 0;
                }
              };
              return context.db.businesses
                .filter((v) => {
                  return v["name"].indexOf(args.search) !== -1;
                })
                .slice(args.offset, args.first)
                .sort(compare);

        },

        userById: (obj, args, context, info) => {
            return context.db.users.map((user) => user.userId === args.id)
        }
    },

    Business : {
        reviews : (obj, args, context, info) => {
            return obj.reviewIds.map((v) => {
                return context.db.reviews.find((review) => {
                  return review.reviewId === v;
                });
              });
        },

        avgStars: (obj, args, context, info) => {
            const reviews = obj.reviewIds.map((v) => {
                return context.db.reviews.find((review) => {
                  return review.reviewId === v;
                })})
            return (
                reviews.reduce((acc, review) => {
                      return acc + review.stars;
                    }, 0) / reviews.length
            );
        }
    },

    Review : {
        user : (obj, args, context, info) => {
            return context.db.users.find((user) => {
                return user.userId === obj.userId;
              });
        },

        business: (obj, args, context, info) => {

        }
    },

    User: {
        reviews: (obj, args, context, info) => {
            return obj.reviewIds.map((v) => {
                return context.db.reviews.find((review) => {
                  return review.reviewId === v;
                });
              });
        }
    }


}


module.exports = resolvers