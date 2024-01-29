const sortBy = require('lodash').sortBy

const resolvers = {
    Query: {
        allBusinesses: (obj, args, context, info) => {
          return context.db.businesses

        },

        businessBySearchTerm: (obj, args, context, info) => {
          const order = args.orderBy

          const data = context.db.businesses.filter((b) => {
            return b["name"].indexOf(args.search) !== -1
          })

          if (order === "name_asc"){
            return sortBy(data, "name")
          }
          if (order === "name_desc"){
            return sortBy(data, "name").reverse()
          }
      
        },

        userById: (obj, args, context, info) => {
            return context.db.users.find((user) => {
              return user.userId === args.id
            })
        }
    },

    Business : {
        reviews : (obj, args, context, info) => {

          return obj.reviewIds.map((v) => {
            return context.db.reviews.find((review) => {
              return review.reviewId === v
            })
          })
           
        },

        avgStars: (obj, args, context, info) => {
           const avg_stars = obj.reviewIds.map((v) => {
            return context.db.reviews.find((review) => {
              return review.reviewId === v
            })
           })

           return(
            avg_stars.reduce((acc, total) => {
              return acc + total.stars
            }, 0) / avg_stars.length
           )
        }
    },

    Review : {
        user : (obj, args, context, info) => {
            return context.db.users.find((user) => {
              return user.userId == obj.userId
            })
        },

        business: (obj, args, context, info) => {
          return context.db.businesses.find((user) => {
            return user.businessId == obj.businessId
          })
        }
    },

    User: {
        reviews: (obj, args, context, info) => {
           return obj.reviewIds.map((v) => {
            return context.db.reviews.find((review) =>{
              return review.reviewId == v
            })
           })
        }
    }


}


module.exports = resolvers